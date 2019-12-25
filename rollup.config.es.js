import sourcemaps from 'rollup-plugin-sourcemaps';
import license from 'rollup-plugin-license';
import commonjs from 'rollup-plugin-commonjs'

const path = require('path');

export default {
    output: {
        format: 'es',
        sourcemap: true
    },
    plugins: [
        commonjs(),
        sourcemaps(),
        license({
            sourcemap: true,
            banner: {
                file: path.join(__dirname, 'license-banner.txt'),
                encoding: 'utf-8',
            }
        })
    ],
    onwarn: () => { return }
}
