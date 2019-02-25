import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { uglify } from "rollup-plugin-uglify";

export default {
    input: 'src/main.js',
    output: {
        file: 'lib/date-utils.min.js',
        format: 'umd',
        name: 'dateUtils',
        sourcemap: true,
    },
    plugins: [
        resolve({
            jsnext: true,  // 该属性是指定将Node包转换为ES2015模块
            // main 和 browser 属性将使插件决定将那些文件应用到bundle中
            main: true,  // Default: true 
            browser: true // Default: false
        }),
        commonjs(),
        babel(babelrc()),
        replace({
            ENV: JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        uglify()
    ]
}