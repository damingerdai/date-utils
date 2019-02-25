const shell = require('shelljs');

shell.rm(`-Rf`, `lib/**`);
shell.echo('已经清除lib目录');
if (shell.exec('set NODE_ENV=production && rollup --config rollup.config.dev.js').code !== 0 ){
    shell.echo('Error: 开发环境打包失败');
    shell.exit(1);
} else {
    shell.echo('开发环境打包成功');
}
if (shell.exec('set NODE_ENV=development && rollup --config rollup.config.prod.js').code !== 0 ){
    shell.echo('Error: 生产环境打包失败');
    shell.exit(1);
} else {
    shell.echo('生产环境打包成功');
}
