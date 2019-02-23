import babel from 'rollup-plugin-babel';
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
        babel({
            exclude: 'node_modules/**'  // 排除node_module下的所有文件
        }),
        uglify()
    ]
}