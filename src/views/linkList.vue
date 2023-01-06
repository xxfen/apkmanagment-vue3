<template>
	<div class="whiteBg">
		<el-form :inline="true" :model="qform" class="demo-form-inline">
			<el-form-item>
				<el-input v-model="qform.keyword" placeholder="应用名模糊搜索" />
			</el-form-item>
			<!-- <el-form-item label="是否失效">
				<el-switch v-model="qform.disabled" />
			</el-form-item> -->
			<el-form-item>
				<el-button type="primary" @click="getData()">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="appName" label="应用名" min-width="120" />
			<el-table-column prop="vname" label="版本名称" width="120" />
			<el-table-column prop="link" label="链接地址" min-width="240">
				<template #default="scope">
					<div>
						<span>{{url+ scope.row.link }}</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="comment" label="备注" min-width="120" />
			<el-table-column prop="disabled" label="是否失效" width="120">
				<template #default="scope">
					<div>
						<span :style="{color: scope.row.disabled?'red':'green'}">{{ scope.row.disabled?"是":"否" }}</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="deadTime" label="失效时间" width="140">
				<template #default="scope">
					<div>
						{{scope.row.deadTime?scope.row.deadTime:'不限'}}
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="disabledCount" label="限制下载次数" width="120">
				<template #default="scope">
					<div>
						{{scope.row.disabledCount?scope.row.disabledCount:'不限'}}
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="count" label="已下载次数" width="120" />
			<el-table-column prop="creationTime" label="创建时间" width="140" />
		</el-table>
		<div class="horizontalView h50">
			<el-pagination class="center" small background layout="prev, pager, next"
				@current-change="handleCurrentChange" :total="totalCount" />
		</div>
	</div>
</template>

<script>
	import {
		SearchLinks
	} from '../utils/api.js'
	import {
		inject
	} from "vue"
	export default {
		data() {
			return {
				qform: {
					keyword: '',
					disabled: false,
					page: 1,
					length: 10

				},
				tableData: [

					{
						creationTime: '2016-05-03 08:50',
						appName: '设备监控',
						vName: '1.1.1',
						disabled: false,
						link: ''
					}
				],
				url: '',
				totalCount: 0,

			};
		},
		created() {

			this.getData();
		},
		methods: {
			getData() {
				var me = this;
				var global = inject('global');
				me.url = global.$httpUrl
				SearchLinks(me.qform).then((response) => {
					me.totalCount = response.page.totalCount
					me.tableData = response.page.list;
				}).catch((error) => {
					// me.$message.error('网络出错');
					console.log(error);
				})
			},
			handleCurrentChange: function(page) {
				this.qform.page = page;
				this.getData();
			}

		}
	}
</script>

<style>
</style>
