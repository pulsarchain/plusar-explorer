const OSS = require('ali-oss');
const chalk = require('chalk');

class AliOSSPlugin {
  constructor(options) {
    this.options = { retry: 3, prefix: '', ...options };
    const { accessKeyId, accessKeySecret, region, bucket } = options;
    this.client = new OSS({ accessKeyId, accessKeySecret, region, bucket });
  }
  async apply(compiler) {
    compiler.hooks.afterEmit.tapAsync('AliOSSPlugin', (compilation, callback) => {
      const files = Object.keys(compilation.assets);
      if (
        compiler.options.mode !== 'production' ||
        compiler.options.name === 'server' ||
        files.length === 0
      ) {
        return callback();
      }
      const upload = (file, times) => {
        const key = `${this.options.prefix}/_next/${file}`;
        const filePath = `${compiler.options.output.path}/${file}`;
        return this.client.put(key, filePath).then(
          () => {
            console.log(chalk.green(`✔ [ALIYUNOSSPLUGIN SUCCESS]：${key}`));
            const next = files.shift();
            if (next) {
              return upload(next, this.options.retry);
            }
          },
          e => {
            if (times === 0) {
              console.log(
                chalk.magenta(`
              OSS UPLOAD ERROR：status:${e.status},code:${e.code}, message: ${e.message}
              File Path: ${filePath}
            `)
              );
              return callback(e);
            } else {
              console.log(chalk.yellow(`[ALIYUNOSSPLUGIN RETRY]：${times} ${key}`));
              return upload(file, --times);
            }
          }
        );
      };
      upload(files.shift(), this.options.retry)
        .then(() => {
          console.log(chalk.green('[ALIYUNOSSPLUGIN FINISHED]： All Completed'));
          callback();
        })
        .catch(e => {
          console.log(
            chalk.red(
              `[ALIYUNOSSPLUGIN FAILED]：status:${e.status},code:${e.code}, message: ${e.message}`
            )
          );
          return callback(e);
        });
    });
  }
}

module.exports = AliOSSPlugin;
