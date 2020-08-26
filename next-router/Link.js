import { Consumer } from "./LocaleContext";
import isString from "lodash/isString";
import NextLink from "next/link";
import NextRouter from "next/router";
import { parse } from "url";
import Cookies from "js-cookie";

const reg = /(_)\w+/g;

function Link({ href, children, ...resetProps }) {
  return (
    <Consumer>
      {props => {
        if (!href) {
          return children;
        }
        const { locale, defaultLocale, suffix } = props || {};
        const as = {};
        let { pathname, query } = isString(href) ? parse(href, true) : href;
        const asQuery = { ...query };
        as.pathname = pathname;
        const match = pathname.match(reg);
        if (match) {
          match.forEach(n => {
            const key = n.replace("_", "");
            as.pathname = as.pathname.replace(n, asQuery[key]);
            delete asQuery[key];
          });
        }
        as.query = asQuery;

        if (suffix) {
          as.pathname = `${as.pathname}${as.pathname === "/" ? "" : `.${suffix}`}`;
        }
        if (locale !== defaultLocale) {
          as.pathname = `/${locale}${as.pathname}`;
        }
        return (
          <NextLink {...resetProps} href={href} as={as}>
            {children}
          </NextLink>
        );
      }}
    </Consumer>
  );
}

export const switchLocalePath = locale => {
  const { defaultLocale, location } = window.__NEXT_DATA__.props;
  Cookies.set("INTL_REDIRECTED", locale, { expires: 7, path: "/" });
  let { path } = location;
  path = locale !== defaultLocale ? `/${locale}${path}` : path;
  window.location.replace(path);
};

function getRoute(href) {
  const { locale, defaultLocale, suffix } = window.__NEXT_DATA__.props || {};
  const as = {};
  let { pathname, query } = isString(href) ? parse(href, true) : href;
  const asQuery = { ...query };
  as.pathname = pathname;
  const match = pathname.match(reg);
  if (match) {
    match.forEach(n => {
      const key = n.replace("_", "");
      as.pathname = as.pathname.replace(n, asQuery[key]);
      delete asQuery[key];
    });
  }
  as.query = asQuery;
  if (suffix) {
    as.pathname = `${as.pathname}${as.pathname === "/" ? "" : `.${suffix}`}`;
  }
  if (locale !== defaultLocale) {
    as.pathname = `/${locale}${as.pathname}`;
  }
  return { href, as };
}

class Router {
  push(opts) {
    const { href, as } = getRoute(opts);
    NextRouter.push(href, as);
  }
  replace(opts) {
    const { href, as } = getRoute(opts);
    NextRouter.replace(href, as);
  }
}

export const router = new Router();
export default Link;
