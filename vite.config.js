import {
	defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import {
	createSvgIconsPlugin
} from 'vite-plugin-svg-icons'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
	define: {
		'process.env': {
			// const urlApi = 'http://localhost:8090/'; //本地测试
			//const urlApi='http://43.142.31.147:8090/';//process.env.VUE_APP_API_BASE_URL
			'VUE_APP_API_BASE_URL': 'http://43.142.31.147:8090/',
			'VUE_APP_NAME': '安卓安装包管理后台'
		}
	},
	plugins: [
		vue(),
		createSvgIconsPlugin({
			// 指定需要缓存的图标文件夹
			iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
			// 指定symbolId格式
			symbolId: '[name]',
		})
	],
	base: './',
	//  生产环境
	build: {
		//指定输出路径
		// assetsDir: "./",
		// 指定输出文件路径
		// outDir: "dist",
		// 代码压缩配置
		terserOptions: {
			// 生产环境移除console
			compress: {
				drop_console: true,
				drop_debugger: true,
			}
		}
	}
})
