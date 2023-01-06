var mu = {
	longTitle: '安装包管理控制台',
	littleTitle: '控制台',
	items: [{
			iconName: 'home',
			name: '首页',
			routerName: 'index',
			disabled: false
		},
		{
			iconName: 'collection',
			name: '应用管理',
			submenu: [{
				iconName: 'release',
				name: '发布应用',
				routerName: 'releaseApp',
				disabled: false
			}, {
				iconName: 'applist',
				name: '应用列表',
				routerName: 'appList',
				disabled: false
			}]
		}, {
			iconName: 'linkgl',
			name: '链接管理',
			submenu: [{
				iconName: 'linklist',
				name: '链接列表',
				routerName: 'linkList',
				disabled: false
			}]
		},
		{
			iconName: 'membergl',
			name: '成员管理',
			verify:'admin',//需要验证是否是管理员
			submenu: [{
				iconName: 'memberlist',
				name: '成员列表',
				routerName: 'memberList',
				disabled: false
			}]
		}/* ,
		{
			iconName: 'set',
			name: '设置',
			routerName: 'set',
			disabled: false
		} */

	]
}
export default mu;
