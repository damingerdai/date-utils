'use strict'

const shell = require('shelljs');
const chalk = require('chalk');

const PACKAGE = `date-utils`;
const NPM_DIR = `dist`;
const ESM2015_DIR = `${NPM_DIR}/esm2015`;
const ESM5_DIR = `${NPM_DIR}/esm5`;
const FESM2015_DIR = `${NPM_DIR}/fesm2015`;
const FESM5_DIR = `${NPM_DIR}/fesm5`;
const BUNDLES_DIR = `${NPM_DIR}/bundles`;
const OUT_DIR = `${NPM_DIR}/package`;
const OUT_DIR_ESM5 = `${NPM_DIR}/package/esm5`;

shell.echo('start building...');

shell.rm('-Rf', `${NPM_DIR}/*`);
shell.mkdir('-p', `./${ESM2015_DIR}`);
shell.mkdir('-p', `./${ESM5_DIR}`);
shell.mkdir('-p', `./${FESM2015_DIR}`);
shell.mkdir('-p', `./${FESM5_DIR}`);
shell.mkdir('-p', `./${BUNDLES_DIR}`);
shell.mkdir('-p', `./${OUT_DIR}`);

shell.cp('-Rf', ['src/', '*.ts', '*.json', '*.lock'], `${OUT_DIR}`);

// tsc
shell.echo(`Start TypeScript compilation`);
if (shell.exec(`npx tsc -p ${OUT_DIR}/tsconfig.json`).code !== 0) {
    shell.exec(chalk.red(`Error: TypeScript compilation failed`));
    shell.exit(1);
}

shell.echo(chalk.green(`TypeScript compilation completed`));

shell.echo(`Copy ES2015 for package`);
shell.cp(`-Rf`, [`${NPM_DIR}/src/`, `${NPM_DIR}/*.js`, `${NPM_DIR}/*.js.map`], `${ESM2015_DIR}`);

/* BUNDLING PACKAGE */
shell.echo(`Start bundling`);
shell.echo(`Rollup package`);
if (shell.exec(`npx rollup -c rollup.config.es.js -i ${NPM_DIR}/${PACKAGE}.js -o ${FESM2015_DIR}/${PACKAGE}.js`).code !== 0) {
    shell.echo(chalk.red(`Error: Rollup package failed`));
    shell.exit(1);
}

shell.echo(`Produce ESM5/FESM5 versions`);
shell.exec(`npx tsc -p ${OUT_DIR}/tsconfig.json --target es5 -d false --outDir ${OUT_DIR_ESM5} --sourceMap`);
shell.cp(`-Rf`, [`${OUT_DIR_ESM5}/src/`, `${OUT_DIR_ESM5}/*.js`, `${OUT_DIR_ESM5}/*.js.map`], `${ESM5_DIR}`);
if (shell.exec(`npx rollup -c rollup.config.es.js -i ${OUT_DIR_ESM5}/${PACKAGE}.js -o ${FESM5_DIR}/${PACKAGE}.js`).code !== 0) {
    shell.echo(chalk.red(`Error: FESM5 version failed`));
    shell.exit(1);
}

shell.echo(`Run Rollup conversion on package`);
if (shell.exec(`npx rollup -c rollup.config.js -i ${FESM5_DIR}/${PACKAGE}.js -o ${BUNDLES_DIR}/${PACKAGE}.umd.js`).code !== 0) {
    shell.echo(chalk.red(`Error: Rollup conversion failed`));
    shell.exit(1);
}

shell.echo(`Minifying`);
shell.cd(`${BUNDLES_DIR}`);
if (shell.exec(`npx uglifyjs ${PACKAGE}.umd.js -c --comments -o ${PACKAGE}.umd.min.js --source-map "includeSources=true,content='${PACKAGE}.umd.js.map',filename='${PACKAGE}.umd.min.js.map'"`).code !== 0) {
    shell.echo(chalk.red(`Error: Minifying failed`));
    shell.exit(1);
}
shell.cd(`..`);
shell.cd(`..`);

shell.echo(chalk.green(`Bundling completed`));

shell.rm(`-Rf`, `${NPM_DIR}/package`);
shell.rm(`-Rf`, `${NPM_DIR}/*.js`);
shell.rm(`-Rf`, `${NPM_DIR}/*.js.map`);
shell.rm(`-Rf`, `${NPM_DIR}/src/**/*.js`);
shell.rm(`-Rf`, `${NPM_DIR}/src/**/*.js.map`);
shell.rm(`-Rf`, `${ESM2015_DIR}/src/**/*.d.ts`);

shell.cp(`-Rf`, [`package.json`, `LICENSE`, `README.md`], `${NPM_DIR}`);

shell.sed('-i', `"private": true,`, `"private": false,`, `./${NPM_DIR}/package.json`);

shell.echo(chalk.green(`End building`));

