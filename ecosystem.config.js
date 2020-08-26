module.exports = {
  name: "pulsar-explorer-web",
  script: "./server/index.js",
  // exec_mode: 'cluster',
  // instances: 2,
  env: {
    PORT: 2333,
    NODE_ENV: "production"
  },
  log_date_format: "YYYY-MM-DD HH:mm:ss Z"
};
