<template>
	<div style="background-color: white;">
		<div class="horizontalView" style="align-items: unset;">
			<div style="width: 35%;">
				<div style="font-size: 18px;font-weight: bold;color: #767676;">
					{{data.appName}}
				</div>

				<div style="font-size: 15px;font-weight: bold;color: #767676;margin-top: 20px;">包名：{{data.appPackage}}
				</div>
				<div style="font-size: 15px;font-weight: bold;color: #767676;margin-top: 10px;">最新版本：{{data.vname}}
				</div>
				<div style="font-size: 15px;font-weight: bold;color: #767676;margin-top: 10px;">
					最新上传时间：{{data.creationTime}}
				</div>
				<div style="font-size: 16px;font-weight: bold;color: #767676;margin-top: 20px;">
					检查更新接口,Get请求,需传参：vCode=#{版本号} 。点击复制。
				</div>
				<div
					style="font-size: 15px;font-weight: bold;color: #767676;margin-top: 5px;white-space:normal; word-break:break-all;overflow:hidden;">
					<el-link type="primary" @click="copylink(data.url?url+'?vCode=#{}':'')">
						{{data.url?url+'?vCode=#{}':''}}
					</el-link>
					<div class="horizontalView" style="margin-top: 10px;">
						试一试，输入本地应用版本号：
						<el-input v-model="vCode" type="number" style="width: 120px;margin: 0px 10px;" />
						<el-button type="primary" @click="queryIsNewApk()">检查更新</el-button>
					</div>

					返参：
					<div style="background-color: aliceblue;padding: 10px 5px;min-height: 100px;border-radius: 5px;margin-top: 5px;display: block;
overflow-x: auto;">
						<!-- white-space:normal; word-break:break-all;overflow:hidden;"> -->
						<pre v-if="jsonData">{{jsonData}}</pre>
						<pre v-else>null</pre>
					</div>
					<div class="">
						参数说明：url：下载链接需拼接 #{公共域名地址}+url+#{"?name='${用户名称}'"}
					</div>
				</div>
			</div>
			<div style="width: 65%;">
				<el-form :inline="true" :model="qform" class="demo-form-inline">
					<el-form-item>
						<el-input v-model="qform.keyword" placeholder="应用名模糊搜索" />
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="queryData()">查询</el-button>
					</el-form-item>
					<el-form-item style="position: absolute;right: 0px;">
						<el-button type="success" @click="createNewApk()">上传新版本</el-button>
					</el-form-item>
				</el-form>
				<el-table :data="tableData" border style="width: 100%">
					<el-table-column prop="appName" label="应用名" />
					<el-table-column prop="vname" label="版本名" width="100" />
					<el-table-column prop="vcode" label="版本号" width="100" />
					<el-table-column prop="fileSize" label="安装包大小" width="100" />
					<el-table-column prop="forcedUpdating" label="强制更新" width="100">
						<template #default="scope">
							<div>
								<span>{{ scope.row.forcedUpdating?"是":"否" }}</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="content" label="更新描述" />
					<el-table-column prop="creationTime" label="上传时间" />
					<el-table-column label="操作" width="132">
						<template #default="scope">
							<div class="horizontalView">
								<el-button type="primary" size="small" @click="share(scope.row.id)">分享</el-button>
								<el-button type="danger" size="small">删除</el-button>
							</div>

						</template>
					</el-table-column>
				</el-table>
				<div class="horizontalView h50">
					<el-pagination class="center" small background layout="prev, pager, next" :total="totalCount" />
				</div>
			</div>
		</div>
		<el-dialog v-model="dialogTableVisible" title="链接列表">
			<el-table :data="gridLinkData">
				<el-table-column property="link" label="链接">
					<template #default="scope">
						<el-link>
							{{baseUrl+scope.row.link}}
						</el-link>
					</template>
				</el-table-column>
				<el-table-column property="deadTime" label="失效时间" width="180">
					<template #default="scope">
						<div>
							{{scope.row.deadTime?scope.row.deadTime:'不限'}}
						</div>
					</template>
				</el-table-column>
				<el-table-column property="disabledCount" label="限制下载次数" width="180">
					<template #default="scope">
						<div>
							{{scope.row.disabledCount?scope.row.disabledCount:'不限'}}
						</div>
					</template>
				</el-table-column>
				<el-table-column property="count" label="已下载次数" width="180" />
			</el-table>
			<div class="h100 horizontalView h50 mt10">
				<el-button class="center" type="primary" @click="showCreateLink()">创建新链接</el-button>
			</div>

		</el-dialog>
		<el-dialog v-model="dialogFormVisible" title="创建链接">
			<el-form :model="createLinkForm">
				<el-form-item label="失效时间" :label-width="formLabelWidth">
					<el-date-picker v-model="createLinkForm.deadTime" type="datetime" placeholder="选择失效日期时间" />
				</el-form-item>
				<el-form-item label="限制下载次数" :label-width="formLabelWidth">
					<el-input-number v-model="createLinkForm.disabledCount" :min="0" :max="10" @change="handleChange" />
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @current-change="handleCurrentChange" @click="createLink(contextApkId)">创建
					</el-button>
				</span>
			</template>
		</el-dialog>

	</div>
</template>

<script>
	import {
		SearchApk,
		SearchAppApk,
		SearchIsNewApk,
		SearchLinkByApkId,
		CreateLink
	} from "../utils/api.js"
	import {
		ElMessage
	} from 'element-plus'
	import {
		defineComponent,
		getCurrentInstance,
		onMounted,
		inject
	} from "vue";

	export default {
		data() {
			return {
				vCode: 0,
				tableData: [{
					"appPackage": "com.ocion.yichuan724.test",
					"forcedUpdating": false,
					"vName": "1.1.1",
					"creationTime": "2022-07-11T16:44:16.000+0000",
					"apkPath": "宜春人社网络安全可视化平台_1657529056069_1.1.1.apk",
					"fileSize": "8 MB",
					"appName": "宜春人社网络安全可视化平台",
					"id": 3,
					"vCode": 3,
					"userId": 2,
					"content": "xxxxxxxxxxxxxxxxxxxxgggggggggggggggggggggg"
				}],
				qform: {
					keyword: '',
					page: 1,
					length: 10
				},
				data: {},
				url: '',
				jsonData: {

				},
				gridLinkData: [],
				dialogTableVisible: false,
				contextApkId: 0,
				dialogFormVisible: false,
				createLinkForm: {},
				baseUrl: '',
				totalCount: 0,
				haveUpdate:false

			};
		},
		setup() {

		},
		created() {
			this.queryData();
			this.queryAppApk();
			// this.queryIsNewApk();
		},
		methods: {
			queryIsNewApk() {
				var me = this;
				//decodeURIComponent
				// console.log(encodeURIComponent(me.data.url))
				SearchIsNewApk((me.url) + "?vCode=" + me.vCode).then((response) => {
					me.jsonData = response.data

				}).catch((error) => {
					// me.$message.error('网络出错');
					console.log(error);
				})
			},
			handleCurrentChange: function(page) {
				this.qform.page = page;
				this.queryData();
			},

			//
			queryAppApk() {
				var role = localStorage.getItem('role');
				var me = this;
				var global = inject('global');
				SearchAppApk(this.$route.params.id).then((response) => {
					me.data = response.data;
                  me.haveUpdate=  response.update
					me.url = import.meta.env.VITE_APP_API_BASE_URL + me.data.url
					me.baseUrl = import.meta.env.VITE_APP_API_BASE_URL
					console.log(me.url)

				}).catch((error) => {
					// me.$message.error('网络出错');
					console.log(error);
				})

			},
			queryData() {
				var role = localStorage.getItem('role');
				var me = this;
				me.qform.id = me.$route.params.id
				SearchApk(me.qform).then((response) => {
					me.totalCount = response.page.totalCount
					me.tableData = response.page.list;

				}).catch((error) => {
					// me.$message.error('网络出错');
					console.log(error);
				})

			},
			copylink(data) {
				let oInput = document.createElement("input");
				oInput.value = data;
				document.body.appendChild(oInput);
				oInput.select();
				document.execCommand("Copy");
				this.$message({
					message: "复制成功",
					type: "success"
				});
				oInput.remove();
			},
			share(id) {
				this.contextApkId = id;
				console.log(id)
				this.queryLink(id)
			},
			queryLink(id) {
				var me = this;
				SearchLinkByApkId(id).then((response) => {
					if (response.list) {
						me.gridLinkData = response.list;
						me.dialogTableVisible = true;
					}

				}).catch((error) => {
					// me.$message.error('网络出错');
					console.log(error);
				})
			},
			showCreateLink() {
				var me = this;
				me.dialogTableVisible = false;
				me.dialogFormVisible = true;
			},
			createLink(id) {
				var me = this;
				me.createLinkForm.apkId = id
				CreateLink(me.createLinkForm).then((response) => {
					me.dialogFormVisible = false;
					ElMessage({
						message: '创建成功!',
						type: 'success',
					})
					me.share(id)

				}).catch((error) => {

					console.log(error);
				})
			},
			handleChange(currentValue, oldValue) {

			},
			createNewApk() {
				var me = this
				if(!me.haveUpdate){
					ElMessage({
						message: '您没有操作权限!',
						type: 'warning',
					})
					return 
				}
				console.log(me.data.apkId)
				this.$router.push({
					name: 'updateNewApp',
					params: {
						id: me.data.apkId,
						title: me.data.appName
					},
					query: {
						title: me.data.appName
					}
				});
			}

		},
		mounted() {

		}


	}
</script>

<style>

</style>

