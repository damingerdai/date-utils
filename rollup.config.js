import resolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';
import commonjs from 'rollup-plugin-commonjs'

import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';

export default {
  plugins: [commonjs(), resolve(), sourcemaps(), babel(babelrc()),],
  onwarn: () => { return },
  output: {
      format: 'umd',
      name: 'dateUtils',
      sourcemap: true,
      exports: 'named',
      amd: { id: 'date-utils' }
  }
}
