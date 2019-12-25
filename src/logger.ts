import debug from 'debug';

export const logger = debug('dateUtils:logger');


// 如果是正式环境的话，不输出日志信息
if (process.env.NODE_ENV !== 'production') {
    // Enable the logger.
    logger.enabled = true;
    console.log('Logging is enabled!');
} else {
    logger.enabled = false;
}
