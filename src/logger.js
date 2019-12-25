"use strict";
exports.__esModule = true;
var debug_1 = require("debug");
exports.logger = debug_1["default"]('dateUtils:logger');
// 如果是正式环境的话，不输出日志信息
if (process.env.NODE_ENV !== 'production') {
    // Enable the logger.
    exports.logger.enabled = true;
    console.log('Logging is enabled!');
}
else {
    exports.logger.enabled = false;
}
