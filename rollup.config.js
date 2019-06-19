import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import {plugins} from './node_modules/mapbox-gl/build/rollup_plugins';
import flowRemoveTypes from '@mapbox/flow-remove-types';

export default [{
    input: 'src/mapboxgl-crl.js',
    output: [{
      file: 'dist/mapboxgl-crl.js',
      format: 'cjs'
    },{
      file: 'demo/mapboxgl-crl.js',
      format: 'iife',
      name: 'Custom'
    }],
    plugins: [ 
        flow(),
        resolve({
          browser: true,
          preferBuiltins: false
      }),
      commonjs({
          // global keyword handling causes Webpack compatibility issues, so we disabled it:
          // https://github.com/mapbox/mapbox-gl-js/pull/6956
          ignoreGlobal: true
      })
    ]
  }]

  export function flow() {
    return {
        name: 'flow-remove-types',
        transform: (code) => ({
            code: flowRemoveTypes(code).toString(),
            map: null
        })
    };
}