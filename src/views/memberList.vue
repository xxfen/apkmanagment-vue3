<template>
	<div style="background-color: white;">

		<div class="horizontalView" style="align-items: unset;">
			<div style="width: 50%;">
				<el-form :inline="true" :model="qform" class="demo-form-inline">
					<el-form-item>
						<el-input v-model="qform.keyword" placeholder="姓名" />
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getUser()">查询</el-button>
					</el-form-item>
				</el-form>
				<el-table :data="tableData" border style="width: 100%">

					<el-table-column prop="userName" label="姓名" width="180" />

					<el-table-column prop="creationTime" label="创建时间" />
				</el-table>
			</div>
			<div style="width: 50%;margin-left: 60px;">
				<div class="horizontalView">
					<div style="height: 21px;width: 5px;background-color: #767676;margin-right: 2px;"></div>
					<div class="bTitle1">
						添加成员
					</div>
				</div>

				<el-form :model="addForm" label-width="68px" label-position="left" ref="formRef"
					style="max-width: 360px;margin-top: 20px;">
					<el-form-item label="用户名" prop="userName" :rules="[
					        { required: true, message: '请输入用户名' }
					      ]">
						<el-input v-model="addForm.userName" placeholder="请输入用户名" />
					</el-form-item>
					<el-form-item label="密码" prop="userPassword" :rules="[
					        { required: true, message: '请输入密码' }
					      ]">
						<el-input v-model="addForm.userPassword" type="password" placeholder="请输入密码" />
					</el-form-item>
					<el-form-item label="手机号" prop="phone" :rules="[
					        { required: true, message: '请输入手机号' },
							  { type: 'number', message: '手机号必须是数字' }
					      ]">
						<el-input v-model.number="addForm.phone" type="text" placeholder="请输入手机号" />
					</el-form-item>
					<el-form-item>
						<el-button type="primary" :loading="false" size="large" style="min-width: 160px;"
							@click="addUser(formRef)">添加</el-button>
					</el-form-item>
				</el-form>

			</div>
		</div>

	</div>
</template>

<script>
	import {
		SearchAllUser,
		AddUser
	} from '../utils/api.js'
	import {
		ElMessage
	} from 'element-plus'
	export default {
		data() {
			return {
				addForm: {
					userName: '',
					userPassword: '',
					phone: ''
				},
				qform: {
					keyword: ''
				},
				tableData: [{
					"id": 2,
					"userName": "xxfen",
					"creationTime": "2022-06-29 16:00"
				}]
			};
		},
		
		created() {
			this.getUser();
		},
		methods: {
			getUser() {
				var me = this;
				SearchAllUser().then((response) => {
					me.tableData = response.list;
				}).catch((error) => {
					// me.$message.error('网络出错');
					console.log(error);
				})
			},
			addUser() {
				var me = this;
				AddUser(me.addForm).then((response) => {
					if (response.code == 200) {
						ElMessage({
							message: '添加成功!',
							type: 'success',
						})
						me.addForm = {
							userName: '',
							userPassword: '',
							phone: ''
						}
						me.getUser();
					}

				}).catch((error) => {
					// me.$message.error('网络出错');
					console.log(error);
				})
			}
		}

	}
</script>

<style>
</style>
