// 用来解析依赖的模块路径
import resolve from 'rollup-plugin-node-resolve'
// 将commonjs模块转成es6模块
import commonjs from 'rollup-plugin-commonjs'

import babel from 'rollup-plugin-babel'

import serve from 'rollup-plugin-serve' //serve服务;
import livereload from 'rollup-plugin-livereload' //热更新;
import { uglify } from 'rollup-plugin-uglify'

const isDevelop = process.env.NODE_ENV === 'development'

let setting = {
	input: 'src/main.js',
	output: {
		file: './dist/bundle.js',
		name: 'startDrag',
		format: 'umd'
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

if (isDevelop) {
	// 开发环境example
	setting.output.file = './example/bundle.js'
	setting.plugins.push(
		serve({
			contentBase: 'example/', //启动文件夹;
			host: 'localhost', //设置服务器;
			port: 8787 //端口号;
		}),
		livereload({
			watch: 'example/' //监听文件夹;
		})
	)
} else {
	// 生产环境
	setting.plugins.push(uglify())
}

export default setting
