const withPlugins = require("next-compose-plugins");
const withCss = require("@zeit/next-css");
const withImages = require("next-images");
const withProgressBar = require("next-progressbar");
const withLessExcludeAntd = require("./next-less.config.js");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const webpack = require("webpack");
const lessToJS = require("less-vars-to-js");
const fs = require("fs");
const path = require("path");

const themeVariables = lessToJS(fs.readFileSync(path.resolve(__dirname, "./assets/antd-custom.less"), "utf8"));

console.log(process.env.BASE_URL);
let baseURL = process.env.BASE_URL || "http://test.api.bosha.com";
let backBaseUrl = process.env.BACK_BASE_URL || "http://testapi.bosha.com";
// const cdn = "//pulsar-explorer.oss-cn-beijing.aliyuncs.com/";
// const prefix = "web";
// const assetPrefix = isDev ? "" : `${cdn}${prefix}`;

module.exports = withPlugins(
  [
    [withImages, {}],
    [withProgressBar, {}],
    [withCss, {}],
    [
      withLessExcludeAntd,
      {
        cssModules: true,
        cssLoaderOptions: {
          importLoaders: 1,
          localIdentName: "[local]__[hash:base64:5]"
        },
        lessLoaderOptions: {
          javascriptEnabled: true,
          modifyVars: themeVariables
        }
      }
    ],
    [
      withBundleAnalyzer,
      {
        analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
        analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
        bundleAnalyzerConfig: {
          server: {
            analyzerMode: "static",
            reportFilename: "../bundles/server.html"
          },
          browser: {
            analyzerMode: "static",
            reportFilename: "../bundles/client.html"
          }
        }
      }
    ]
  ],
  {
    env: {
      baseURL,
      backBaseUrl
    },
    // assetPrefix,
    useFileSystemPublicRoutes: false,
    publicRuntimeConfig: {
      routes: { suffix: "html", i18n: true }
    },
    webpack: (config, options) => {
      const { dev, isServer, buildId, config: { distDir } = {} } = options;
      config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
      if (isServer) {
        const antStyles = /antd\/.*?\/style.*?/;
        const origExternals = [...config.externals];
        config.externals = [
          (context, request, callback) => {
            if (request.match(antStyles)) return callback();
            if (typeof origExternals[0] === "function") {
              origExternals[0](context, request, callback);
            } else {
              callback();
            }
          },
          ...(typeof origExternals[0] === "function" ? [] : origExternals)
        ];

        config.module.rules.unshift({
          test: antStyles,
          use: "null-loader"
        });
      }
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(__dirname, ".")
      };

      // Fixes npm packages that depend on `fs` module
      config.node = {
        fs: "empty"
      };

      // config.plugins.push(
      //   new AliOSSPlugin({
      //     accessKeyId: "LTAIwV2ePzSGqzoX",
      //     accessKeySecret: "BNvTb6zZKNZHaQ1VlSkfi4FXRNge8A",
      //     region: "oss-cn-beijing",
      //     bucket: "pulsar-explorer",
      //     prefix
      //   })
      // );

      return config;
    }
  }
);
