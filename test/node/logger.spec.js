const logger = require('../../src/logger').logger;

process.env.NODE_ENV = 'test';
logger("test");
process.env.NODE_ENV = 'production';
logger("test");