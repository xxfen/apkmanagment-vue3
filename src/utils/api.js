/** 
 * api接口的统一封装
 */
import axios from './request.js';
import Qs from 'qs';
// const urlApi = 'http://localhost:8090/'; //本地测试
const urlApi=import.meta.env.VITE_APP_API_BASE_URL;
console.log(urlApi)
// 登录
export function UserLogin(query) {
	return axios({
		url: urlApi + 'user/login',
		method: 'post',
		data: query
	})
}

//退出登录
export function LoginOut() {
	return axios({
		url: urlApi + 'user/loginOut',
		method: 'get'
	})
}

///home/statisticsCount
// 首页数量统计
export function GetStatisticsCount() {
	return axios({
		url: urlApi + 'home/statisticsCount',
		method: 'get'
	})
}


//查询用户管理的所有应用程序
export function SearchUserAllApp(query) {
	return axios({
		url: urlApi + 'app/searchUserAllApp',
		method: 'post',
		data: query
	})
}

//查询公司下所有应用程序
export function SearchCompanyAllApp(query) {
	return axios({
		url: urlApi + 'app/searchCompanyAllApp',
		method: 'post',
		data: query
	})
}

//查询公司所有员工
export function SearchAllUser() {
	return axios({
		url: urlApi + 'user/searchAllUser',
		method: 'get'
	})
}

//查询链接列表
export function SearchLinks(query) {
	return axios({
		url: urlApi + 'link/searchLinks',
		method: 'post',
		data: query
	})
}

//添加用户
export function AddUser(data) {
	return axios({
		url: urlApi + 'user/addUser',
		method: 'post',
		data: data
	})
}


//查询安装包列表
export function SearchApk(data) {
	return axios({
		url: urlApi + 'apk/searchApk',
		method: 'post',
		data: data
	})
}
//查询应用及最新安装包
export function SearchAppApk(id) {
	return axios({
		url: urlApi + 'apk/searchAppApkById?id=' + id,
		method: 'get'
	})
}

//检查更新
export function SearchIsNewApk(url) {
	return axios({
		url: /* urlApi + 'apk/'+ */ url,
		method: 'get'
	})
}



//查询某个安装包的链接
export function SearchLinkByApkId(apkId) {
	return axios({
		url: urlApi + 'link/searchLinkByApkId',
		method: 'post',
		data: {
			apkId: apkId
		}
	})
}
//创建链接
export function CreateLink(data) {
	return axios({
		url: urlApi + 'link/createLink',
		method: 'post',
		data: data
	})
}
//index/weborder/gongdanInfoNum
export function gongdanInfoNum(token) {
	return axios({
		url: urlApi + 'index/weborder/gongdanInfoNum',
		method: 'get',
		headers: {
			// 'Content-type': 'application/json;charset=UTF-8',
			'token': token
		}
	})
}
