const chalk = require("chalk");
const ip = require("ip");
const express = require("express");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3001;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const Router = require("../next-router");

app.prepare().then(() => {
  const server = express();
  server.use(compression());
  server.use(cookieParser());
  new Router({ app, server });
  server.listen(port, err => {
    if (err) throw err;
    console.log(chalk.magenta(`✔ Local: http://localhost:${port}`));
    console.log(chalk.magenta(`✔ Network: http://${ip.address()}:${port}`));
  });
});
