const IntlPolyfill = require("intl");
Intl.NumberFormat = IntlPolyfill.NumberFormat;
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;

const fs = require("fs");
const path = require("path");
const glob = require("glob");
const accepts = require("accepts");
const { basename } = require("path");
const getConfig = require("next/config").default;

const cookieKey = "INTL_REDIRECTED";
const PREFIX = "_";
const HOME = "/index";
const defaultLocale = "en-US";

const BLOCKED_PAGES = ["/_document", "/_app", "/_error"];
const isBlockedPage = pathname => BLOCKED_PAGES.indexOf(pathname) !== -1;

const internalPrefixes = [/^\/_next\//, /^\/static\//];

const isInternalUrl = url => {
  for (const prefix of internalPrefixes) {
    if (prefix.test(url)) {
      return true;
    }
  }
  return false;
};

/**
 * 获取文件夹下所有文件
 * @function getAllFiles
 * @param  {string} dir Dir path string.
 * @return {string[]} Array with all file names that are inside the directory.
 */
const getAllFiles = dir =>
  fs.readdirSync(dir).reduce((files, file) => {
    const name = path.join(dir, file);
    const isDirectory = fs.statSync(name).isDirectory();
    return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
  }, []);

const getRouteMaps = (dir, suffix) => {
  const files = getAllFiles(dir);
  const routes = files.map(file => file.replace(dir, "").replace(".js", "")).filter(file => !isBlockedPage(file));
  const routeMap = {};
  routes.forEach(key => {
    const path = key === HOME ? "/" : key.includes(HOME) ? key.replace(HOME, "") : key;
    const routes = [];
    const reg = new RegExp(`(${PREFIX})\\w+`, "gi");
    const match = path.match(reg);
    if (match) {
      let route = path;
      match.forEach(n => {
        const key = n.replace(PREFIX, "");
        // [A-Za-z0-9_]
        route = route.replace(n, `:${key}(\\w+)`);
      });
      routes.push(route);
      if (suffix) {
        routes.unshift(`${route}.${suffix}`);
      }
    } else {
      routes.push(path);
      if (suffix) {
        routes.unshift(`${path === "/" ? HOME : path}.${suffix}`);
      }
    }
    routeMap[path] = routes;
  });
  routeMap["*"] = "*";
  return routeMap;
};

const supportedLanguages = glob.sync("./locales/*.json").map(f => basename(f, ".json"));

function isInternalLocale(pathLocale = "") {
  return supportedLanguages.find(item => pathLocale.includes(item));
}

const localeDataCache = new Map();
const getLocaleDataScript = locale => {
  const lang = locale.split("-")[0];
  if (!localeDataCache.has(lang)) {
    const localeDataFile = require.resolve(`react-intl/locale-data/${lang}`);
    const localeDataScript = fs.readFileSync(localeDataFile, "utf8");
    localeDataCache.set(lang, localeDataScript);
  }
  return localeDataCache.get(lang);
};

const getMessages = locale => {
  return require(path.resolve("./", `locales/${locale}.json`));
};

class Routes {
  constructor({ app, server }) {
    const { publicRuntimeConfig } = getConfig();
    const { routes = {} } = publicRuntimeConfig;
    const { suffix, i18n } = routes;
    const rootDir = `${app.dir}/pages`;
    const maps = getRouteMaps(rootDir, suffix);
    const handle = app.getRequestHandler();
    const locales = supportedLanguages;

    Object.keys(maps).forEach(key => {
      let route = maps[key];
      if (route !== "*" && i18n) {
        locales.forEach(lang => {
          if (defaultLocale !== lang) {
            const i18nRoute = route.map(n => `/${lang}${n}`);
            route = route.concat(i18nRoute);
          }
        });
      }
      server.get(route, (req, res) => {
        if (i18n && !isInternalUrl(req.url) && locales.length) {
          // 获取本地存储的语言
          let intl_redirected = req.cookies[cookieKey];
          intl_redirected = isInternalLocale(intl_redirected) ? intl_redirected : undefined;
          const pathLang = req.path
            .split("/")
            .map(path => isInternalLocale(path))
            .filter(p => p);
          const accept = accepts(req);
          // url 语言
          const pathLocale = pathLang.length ? pathLang[0] : undefined;
          // 浏览器默认语言
          let locale = pathLocale || intl_redirected || accept.language(locales) || defaultLocale;

          // res.send({ pathLocale, locale, defaultLocale, pathLang });

          if (!pathLocale && locale !== defaultLocale) {
            return res.redirect(302, `/${locale}${req.url}`);
          }

          if (pathLocale === defaultLocale) {
            res.cookie(cookieKey, defaultLocale, { path: "/", maxAge: 1000 * 60 * 60 * 24 * 7 });
            return res.redirect(302, `${req.url.replace(`/${locale}`, "")}`);
          }

          res.cookie(cookieKey, locale, { path: "/", maxAge: 1000 * 60 * 60 * 24 * 7 });
          req.defaultLocale = defaultLocale;
          req.suffix = suffix;
          req.locale = locale;
          req.localeDataScript = getLocaleDataScript(locale);
          req.messages = getMessages(locale);
        }
        return route === "*" ? handle(req, res) : app.render(req, res, key, { ...req.params, ...req.query });
      });
    });
  }
}

module.exports = Routes;
