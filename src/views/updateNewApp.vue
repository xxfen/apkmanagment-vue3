<template>
	<div class="whiteBg">
		<div class="mTitle1">上传安装包*：</div>
		<!-- action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" -->
		<el-upload ref="uploadRef" drag :action="url" :on-change="handleChange" :on-success="handleAvatarSuccess"
			:on-error="handleAvatarError" :limit="1" :auto-upload="false" multiple :data="uploadContents"
			:headers="header" name="apk" accept=".apk">
			<SvgIcon name="uploadFiled" class="icon-svg" />

			<div class="el-upload__text">
				拖放文件到这里上传 或 <em>点击上传</em>
			</div>
			<template #tip>
				<div class="el-upload__tip">
					<!-- apk格式文件 -->
				</div>
			</template>
		</el-upload>
		<div class="mTitle1">是否强制更新：</div>
		<el-switch v-model="uploadContents.forcedUpdating" />
		<div class="mTitle1">应用描述*：</div>
		<el-input v-model="uploadContents.content" placeholder="请输入更新内容,如:
1.修改xxx内容;
2.添加了xxx内容;" :autosize="{ minRows: 6 }" type="textarea" />

		<div class="w100 subButtonDiv">
			<el-button class="center" type="primary" :loading="false" size="large" @click="submitData()">上传</el-button>
		</div>

	</div>

</template>


<script lang="ts" setup>
	import {
		// getCurrentInstance,
		onMounted,
		ref
	} from "vue";

	import type {
		UploadInstance
	} from 'element-plus'
	import {
		ElMessage,
		ElMessageBox
	} from 'element-plus'
	import {
		inject
	} from 'vue';
	import {
		useRoute
	} from 'vue-router';
	// 获取全局对象`
	const url = import.meta.env.VITE_APP_API_BASE_URL + 'apk/uploadingNewApp';
	const forcedUpdating = ref(false)
	const content = ref('');
	const Route = useRoute(); //获取到值
	const uploadContents = ref({
		forcedUpdating: forcedUpdating,
		content: content,
		appId: Route.params.id
	});
	const uploadRef = ref < UploadInstance > ()
	const header = {
		satoken: localStorage.getItem('Authorization')
	}

	/* let currentInstance = ''
	onMounted(() => {
		currentInstance = getCurrentInstance()
	}) */

	const submitData = () => {
		if (!content.value) {
			ElMessage.error('请填写应用描述！')
			return
		}

		console.log(uploadContents)
		uploadRef.value!.submit()

	}

	const handleAvatarSuccess = (
		response,
		uploadFile
	) => {
		if (response.code != 200) {
			if (response.code == 300) {
				ElMessageBox.alert(response.msg, '提示', {
					// if you want to disable its autofocus
					// autofocus: false,
					type: 'warning',
					confirmButtonText: '确定',
					callback: (action: Action) => {

					},
				})
			} else {
				ElMessage.error('上传出错！')
			}

			return
		}
		console.log(response.code)
		ElMessage({
			message: '发布成功!',
			type: 'success',
		})
	}
	const handleAvatarError = (error, uploadFile) => {
		console.log(error)
		ElMessage.error('服务器出错!')
	}
</script>

<style>
	.subButtonDiv {
		/* margin: 20px 0px; */
		margin: 40px 0px;
	}

	.subButtonDiv .el-button {
		min-width: 160px;
	}
</style>
