<template>
	<div class="fill" :style="'height:'+searchVal+'px'">
		<div class="in-topCard horizontalView">
			<div class="item verticalView">
				<div class="hint">我的应用</div>
				<div class="count">{{count.appCount}}</div>
			</div>
			<div class="item verticalView">
				<div class="hint">全部安装包</div>
				<div class="count">{{count.apkCount}}</div>
			</div>
			<div class="item verticalView">
				<div class="hint">可下载链接</div>
				<div class="count">{{count.linkCount}}</div>
			</div>
		</div>
		<div class="in-card">
			<el-form :inline="true" :model="qform" class="demo-form-inline">
				<el-form-item>
					<el-input v-model="qform.keyword" placeholder="应用名模糊搜索" />
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="queryData()">查询</el-button>
				</el-form-item>
				<el-form-item style="position: absolute;right: 0px;">
					<el-button type="success" @click="$router.push({
						name: 'releaseApp'})">发布应用</el-button>
				</el-form-item>
			</el-form>
			<el-table :data="tableData" border style="width: 100%" @cell-click="tabClick">
				<el-table-column prop="appName" label="应用名">
					<template #default="scope">
						<div class="tabHover">
							<span>{{ scope.row.appName }}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="vname" label="最新版本" width="180" />
				<el-table-column prop="fileSize" label="最新安装包大小" width="180" />
				<el-table-column prop="creationTime" label="最新上传时间" />
			</el-table>
			<div class="horizontalView h50">
				<el-pagination class="center" @current-change="handleCurrentChange" small background
					layout="prev, pager, next" :total="totalCount" />
			</div>

		</div>

	</div>
</template>

<script>
	import {
		GetStatisticsCount
	} from "../utils/api.js"
	import {
		SearchUserAllApp,
		SearchCompanyAllApp
	} from "../utils/api.js"
	export default {
		data() {
			return {
				tabPosition: '我的应用',
				count: {},
				tableData: [],
				qform: {
					keyword: '',
					page: 1,
					length: 10
				},
				totalCount: 0
			};
		},
		props: {
			searchVal: Number
		},
		created() {
			this.getCount();
			this.queryData();
		},
		methods: {
			queryData() {
				var role = localStorage.getItem('role');
				var me = this;
				if (role == 'admin') { //管理员

					SearchCompanyAllApp(me.qform).then((response) => {
						me.totalCount = response.page.totalCount
						me.tableData = response.page.list;

					}).catch((error) => {
						// me.$message.error('网络出错');
						console.log(error);
					})
				} else {

					SearchUserAllApp(me.qform).then((response) => {
						me.totalCount = response.page.totalCount
						me.tableData = response.page.list;

					}).catch((error) => {
						// me.$message.error('网络出错');
						console.log(error);
					})
				}
			},
			getCount() {
				var me = this;
				GetStatisticsCount().then((response) => {
					if (response.code == 200) {
						me.count.appCount = response.appCount;
						me.count.apkCount = response.apkCount;
						me.count.linkCount = response.linkCount;
					}

				}).catch((error) => {
					// me.$message.error('网络出错');
					console.log(error);
				})
			},
			tabClick(row, column, cell, event){
				console.log(row.id)
				this.$router.push({
					name: 'apkList',
					params:{
						id:row.id,
						title:row.appName
					},
					query: {
						title: row.appName
					}
				});
			}
		}
	}
</script>

<style>
	@import url("../assets/css/index.css");
</style>
