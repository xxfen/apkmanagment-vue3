// import Vue from 'vue'   //引入Vue
import {
	createRouter,
	createWebHashHistory
} from 'vue-router' //引入vue-router
// Vue.use(Router)  //Vue全局使用Router

import home from '../views/home.vue'
import login from '../views/login.vue'
import index from '../views/index.vue'
import releaseApp from '../views/releaseApp.vue'
import updateNewApp from '../views/updateNewApp.vue'
import appList from '../views/appList.vue'
import set from '../views/set.vue'
import linkList from '../views/linkList.vue'
import memberList from '../views/memberList.vue'
import apkList from '../views/apkList.vue'

const routes = [{
		path: '',
		redirect: "home"
	}, {
		path: '/',
		redirect: "home"
	},
	{
		path: '/login',
		name: 'login',
		component: login,
		meta: {
			title: '安装包管理控制台-登录'
		}
	},
	{
		path: '/home',
		name: 'home',
		component: home,
		/* 子路由 */
		children: [{
				path: '/',
				redirect: "index"
			}, {
				path: '',
				redirect: "index"
			}, {
				path: '/index',
				name: 'index',
				component: index,
				meta: {
					title: '首页',
					isTab: true
				}
			},
			{
				path: '/releaseApp',
				name: 'releaseApp',
				component: releaseApp,
				meta: {
					title: '发布应用',
					isTab: true
				}
			},
			{
				path: '/updateNewApp/:id',
				name: 'updateNewApp',
				component: updateNewApp,
				meta: {
					title: '上传新版本',
					isTab: true
				}
				
			},
			{
				path: '/memberList',
				name: 'memberList',
				component: memberList,
				meta: {
					title: '成员列表',
					isTab: true
				}
			}, {
				path: '/appList',
				name: 'appList',
				component: appList,
				meta: {
					title: '应用列表',
					isTab: true
				}
			},
			{
				path: '/linkList',
				name: 'linkList',
				component: linkList,
				meta: {
					title: '链接列表',
					isTab: true
				}
			},
			{
				path: '/set',
				name: 'set',
				component: set,
				meta: {
					title: '设置',
					isTab: true
				}
			}, {
				path: '/apkList/:id',
				name: 'apkList',
				component: apkList,
				meta: {
					title: '安装包列表',
					isTab: true
				}
			}

		]
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
})
// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
	if (to.path === '/login') {
		next();
	} else {
		let token = localStorage.getItem('Authorization');

		if (token === null || token === '') {
			next('/login');
		} else if (to.path.includes('/apkList')) { //安装包列表
			if (to.query.title)
				to.meta.title = to.query.title + '-安装包详情列表' //动态设置标题
			next();
		}else if(to.path.includes('/updateNewApp')){//上传新版本
			if (to.query.title)
				to.meta.title = to.query.title + '-上传新版本' //动态设置标题
			next();
		} else {
			next();
		}
	}
});
export default router;
