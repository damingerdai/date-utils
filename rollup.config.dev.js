import babel from 'rollup-plugin-babel';

export default {
    input: 'src/main.js',
    output: {
        file: 'lib/date-utils.js',
        format: 'umd',
        name: 'dateUtils'
    },
    plugins: [
        babel({
            exclude: 'node_modules/**'  // 排除node_module下的所有文件
        }),
    ]
}