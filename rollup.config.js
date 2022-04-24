import resolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';
import commonjs from 'rollup-plugin-commonjs'

import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';

export default {
  plugins: [
    babel(babelrc({
      addExternalHelpersPlugin: false,
			exclude: /node_modules/,
			runtimeHelpers: false
    })),
    commonjs(),
    resolve(),
    // resolve({
    //   jsnext: true,
    //   main: true,
    //   browser: true
    // }),
    sourcemaps(),
  ],
  onwarn: () => { return },
  output: {
      format: 'umd',
      name: 'dateUtils',
      sourcemap: true,
      // exports: 'named',
      amd: { id: 'date-utils' }
  }
}
