// 用来解析依赖的模块路径
import resolve from 'rollup-plugin-node-resolve'
// 将commonjs模块转成es6模块
import commonjs from 'rollup-plugin-commonjs'

import babel from 'rollup-plugin-babel'

export default {
	input: 'src/main.js',
	output: {
		file: './dist/bundle.js',
		format: 'cjs'
	},
	plugins: [
		resolve(),
		commonjs(),
		babel({
			// babelrc: false,
			exclude: 'node_modules/**' // only transpile our source code
		})
	]
}
