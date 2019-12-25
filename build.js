'use strict'

const shell = require('shelljs');
const chalk = require('chalk');

const PACKAGE = `date-utils`;
const NPM_DIR = `dist`;
const OUT_DIR = `${NPM_DIR}/package`;

shell.echo('start building...');

shell.rm('-Rf', `${NPM_DIR}/*`);
shell.mkdir('-p', `./${OUT_DIR}`);

shell.cp('-Rf', ['src/', '*.ts', '*.json', '*.lock'], `${OUT_DIR}`);