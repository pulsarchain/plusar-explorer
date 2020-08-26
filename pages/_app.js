import App, { Container } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import BasicLayout from "@/layouts/BasicLayout";
import { IntlProvider, addLocaleData, injectIntl } from "react-intl";
import { format, parse } from "url";
import { Provider as LocaleProvider } from "@/next-router/LocaleContext";
import "@/assets/nprogress.css";
import DefaultSeo from "@/components/DefaultSeo";
import Cookies from "js-cookie";
import pathToRegexp from "path-to-regexp";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

if (typeof window !== "undefined" && window.ReactIntlLocaleData) {
  Object.keys(window.ReactIntlLocaleData).forEach(lang => {
    addLocaleData(window.ReactIntlLocaleData[lang]);
  });
}

class TVApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { req } = ctx;
    const { suffix, locale, defaultLocale, messages } = req || window.__NEXT_DATA__.props;
    const initialNow = Date.now();
    const { pathname, asPath } = ctx;
    const { query: parseQuery, pathname: parsePathname } = parse(asPath, true);
    const asPathNotLocale = parsePathname.replace(`/${locale}`, "").replace(`.${suffix}`, "");
    let query = parseQuery;
    const keys = [];
    const regexp = pathToRegexp(pathname.replace(/_/g, ":"), keys);
    const execKeys = regexp.exec(asPathNotLocale);
    if (keys.length && execKeys) {
      const execQuery = {};
      keys.forEach((item, i) => {
        execQuery[item.name] = execKeys[i + 1];
      });
      query = { ...query, ...execQuery };
    }
    const match = pathname.match(/(_)\w+/g);
    const params = {};
    const notFound = pathname === "/_error";
    let path = notFound ? asPathNotLocale : pathname;
    if (match) {
      match.forEach(n => {
        const key = n.replace("_", "");
        params[key] = query[key];
        path = path.replace(n, query[key]);
        delete query[key];
      });
    }
    if (suffix) {
      path = format({
        query: notFound ? {} : query,
        pathname: path === "/" ? path : `${path}${notFound ? "" : `.${suffix}`}`
      });
      path = decodeURIComponent(path);
    }
    const theme = req ? req.cookies.theme : Cookies.get("theme");
    const location = { asPath, path, params, query, pathname };
    if (!req && window.__NEXT_DATA__.props) {
      window.__NEXT_DATA__.props = { ...window.__NEXT_DATA__.props, location, theme };
    }
    let pageProps = {};
    const props = { suffix, locale, defaultLocale, messages, initialNow, location, theme };
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ...ctx, ...props });
    }
    return { pageProps, ...props };
  }
  render() {
    const { Component, pageProps, suffix, locale, defaultLocale, messages, initialNow, location, theme } = this.props;
    const IntlComponent = injectIntl(Component);
    if (!IntlComponent.Layout) {
      IntlComponent.Layout = BasicLayout;
    }
    IntlComponent.Layout = injectIntl(IntlComponent.Layout);
    const props = {
      ...pageProps,
      locale,
      suffix,
      defaultLocale,
      messages,
      initialNow,
      location,
      theme
    };
    return (
      <Container>
        <IntlProvider locale={locale} messages={messages} initialNow={initialNow} defaultLocale={defaultLocale}>
          <>
            <DefaultSeo {...pageProps.seo} />
            <LocaleProvider value={{ locale, defaultLocale, suffix }}>
              <IntlComponent.Layout {...props}>
                <IntlComponent {...props} />
              </IntlComponent.Layout>
            </LocaleProvider>
          </>
        </IntlProvider>
      </Container>
    );
  }
}

export default TVApp;
