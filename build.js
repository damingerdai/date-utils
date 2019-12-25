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
