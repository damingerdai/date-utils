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
        uglify()
    ]
}