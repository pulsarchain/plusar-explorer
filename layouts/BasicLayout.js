import { Select, Layout, Row, Col, Menu, Icon, Drawer, Input } from "antd";
import Link, { switchLocalePath, router } from "@/next-router/Link";
import classNames from "classnames";
import Cookies from "js-cookie";
import { useState } from "react";
import "@/assets/global.css";
import styles from "@/assets/styles.less";
import footer from "@/assets/footer.less";
import logo from "@/assets/img/bosha.png";
import en from "@/assets/img/en@2x.png";
import cn from "@/assets/img/cn@2x.png";
import { Provider as ThemeProvider } from "@/components/ThemeContext";

const langs = [
  { label: "English", value: "en-US", icon: en },
  { label: "简体中文", value: "zh-CN", icon: cn },
];
const { Option } = Select;
const { Header, Content, Footer } = Layout;

const BasicLayout = ({ children, locale, intl, theme, location }) => {
  const whitepaper = {
    "zh-CN": "/static/download/pulsar.pdf",
    "en-US": "/static/download/pulsar_en.pdf",
  };
  const nav = [
    { path: "/", label: intl.formatMessage({ id: "nav.home" }) },
    { path: "/transactions", label: intl.formatMessage({ id: "nav.transactions" }) },
    { path: "/blocks", label: intl.formatMessage({ id: "nav.node" }) },
    { path: "/wallet", label: intl.formatMessage({ id: "nav.wallet" }) },
    { path: whitepaper[locale], label: intl.formatMessage({ id: "nav.whitpaper" }), external: true },
  ];

  const selectedKeys = nav
    .filter((item) => (item.path === "/" ? location.pathname === item.path : location.pathname.includes(item.path)))
    .map(({ path }) => path);

  const [themeValue, setThemeValue] = useState(theme);
  const [visible, setVisible] = useState(false);
  const isSearch = location.pathname === "/search";
  const q = isSearch ? location.query.q : undefined;
  const isDark = themeValue === "dark";
  const logoIcon = isDark ? logoLight : logo;

  const DrawerTitle = intl.formatMessage({ id: "nav.name" });
  const searchButton = intl.formatMessage({ id: "search.button" });
  const searchPlaceholder = intl.formatMessage({ id: "search.placeholder" });

  const { Search } = Input;

  const handleChange = (locale) => {
    switchLocalePath(locale);
  };

  const handleTheme = () => {
    const theme = isDark ? "light" : "dark";
    setThemeValue(theme);
    Cookies.set("theme", theme);
  };

  const handleVisible = () => {
    setVisible(!visible);
  };

  const handlePush = (path, external = false) => {
    handleVisible();
    if (external) {
      return window.open(path, "_blank");
    } else {
      return router.push(path);
    }
  };

  return (
    <Layout className={classNames(styles.layout, themeValue)}>
      <Header className={styles.header}>
        <div className={styles.content}>
          <Row type="flex" align="middle">
            <Col xs={12} sm={12} md={5} lg={5} xl={5} xxl={4}>
              <Link href="/">
                <a className={styles.logo}>
                  <img src={logoIcon} />
                  <span className="logoText">
                    Pulsar Block Explorer
                    {/* <span className="version">beta</span> */}
                  </span>
                </a>
              </Link>
            </Col>
            <Col xs={12} sm={12} md={19} lg={19} xl={19} xxl={20}>
              <div className={styles.pc}>
                {/* <div className={styles.theme} onClick={handleTheme}>
                  <img src={themeIcon} />
                </div> */}
                <div className={styles.lang}>
                  <Select defaultValue={locale} onChange={handleChange} style={{ width: 100 }}>
                    {langs.map(({ value, label }) => (
                      <Option key={value}>{label}</Option>
                    ))}
                  </Select>
                </div>
                <Menu className={styles.menu} mode="horizontal" selectedKeys={selectedKeys}>
                  {nav.map(({ path, label, external }) => (
                    <Menu.Item key={path}>
                      {external ? (
                        <a href={path} target="_blank">
                          {label}
                        </a>
                      ) : (
                        <Link href={path}>
                          <a>{label}</a>
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </Menu>
              </div>
              <div className={styles.mobile}>
                <div className={"trigger"} onClick={handleVisible}>
                  <Icon type="menu" style={{ color: "#fff" }} />
                </div>
                {/* <div className={styles.theme} onClick={handleTheme}>
                  <img src={themeIcon} />
                </div> */}
                <div className={styles.lang}>
                  <Select
                    defaultValue={locale}
                    onChange={handleChange}
                    dropdownMatchSelectWidth={false}
                    showArrow={false}
                    style={{ width: 40 }}
                    size="small"
                  >
                    {langs.map(({ value, label, icon }) => (
                      <Option key={value}>
                        <img src={icon} alt={value} width="20" style={{ marginRight: 4 }} />
                        {label}
                      </Option>
                    ))}
                  </Select>
                </div>
                <Drawer
                  getContainer={false}
                  width={200}
                  visible={visible}
                  onClose={handleVisible}
                  title={DrawerTitle}
                  className={themeValue}
                  bodyStyle={{ paddingLeft: 8, paddingRight: 8 }}
                >
                  <Menu selectedKeys={selectedKeys}>
                    {nav.map(({ path, label, external = false }) => (
                      <Menu.Item key={path} onClick={() => handlePush(path, external)}>
                        <a>{label}</a>
                      </Menu.Item>
                    ))}
                  </Menu>
                </Drawer>
              </div>
            </Col>
          </Row>
        </div>
      </Header>
      <Content>
        <div className={[styles.content, styles.layoutContent]}>
          <div className="block search">
            <Search
              placeholder={searchPlaceholder}
              enterButton={searchButton}
              size="large"
              defaultValue={q}
              allowClear
              onSearch={(value) => {
                if (value && value !== q) {
                  if (isSearch) {
                    router.replace({ pathname: "/search", query: { q: value } });
                  } else {
                    router.push({ pathname: "/search", query: { q: value } });
                  }
                }
              }}
            />
          </div>
          <ThemeProvider value={themeValue}>{children}</ThemeProvider>
        </div>
      </Content>
      <Footer>
        <div className={classNames(styles.content, footer["footer"])}>
          <Row>
            <Col xl={10} lg={12} className={footer["footer-mt"]}>
              <div className={footer["logo-wrap"]}>
                <img src={logo} width="39px" alt="" />
                Pulsar Block Explorer
              </div>
              <p className={footer["logo-desc"]}>{intl.formatMessage({ id: "footer.desc" })}</p>
            </Col>
            <Col xl={14} lg={12} className={footer["textLink-wrap"]}>
              <Row>
                <Col sm={8} xs={10} className={footer["footer-link"]}>
                  <div>{intl.formatMessage({ id: "about.title" })}</div>
                  <Link href="/about">
                    <a>{intl.formatMessage({ id: "footer.about" })}</a>
                  </Link>
                  <a href="https://github.com/pulsarchain" target="_blank">
                    Pulsar Github
                  </a>
                </Col>
                <Col sm={8} xs={14} className={`${footer["footer-link"]}`}>
                  <div>{intl.formatMessage({ id: "footer.contract" })}</div>
                  <span>{intl.formatMessage({ id: "contract.company" })}</span>
                </Col>

                <Col sm={8} xs={12} className={`${footer["footer-link"]} ${footer["footer-link-ext"]}`}>
                  <div>{intl.formatMessage({ id: "footer.community" })}</div>
                  <Link href="/expand">
                    <a>{intl.formatMessage({ id: "footer.api" })}</a>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <div className={`${styles.content} ${footer["copyright"]}`}>&copy; PULSAR Block Explorer</div>
      </Footer>
    </Layout>
  );
};

export default BasicLayout;
