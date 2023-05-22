import {
	createApp
} from 'vue'
import App from './App.vue'
const app = createApp(App) //创建VUE对象
//导入路由配置
import router from './router'
app.use(router)

import VueWechatTitle from 'vue-wechat-title';
app.use(VueWechatTitle)

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
app.use(ElementPlus, {
	locale: zhCn,
})


//导入Svg图片插件，可以在页面上显示Svg图片
import 'virtual:svg-icons-register'
import SvgIcon from "./components/SvgIcon.vue";
app.component('SvgIcon', SvgIcon)
// app.config.globalProperties.$httpUrl = 'https://www.baidu.com'
// app.config.globalProperties.$urlApi = 'http://localhost:8090/';//本地测试
// const $httpUrl='http://localhost:8090/';
// const $httpUrl=process.env.VUE_APP_API_BASE_URL;
//定义全局的数据变量
// Vue.prototype.$data = {};

// 配置全局变量 页面中使用 inject 接收
// app.provide('global', {
// 	$httpUrl
// })
app.mount('#app')
