<template>
	<div  class="fill" style="background-color: aliceblue;">
		<div class="centerCard center">
			<div class="title">
				登录
			</div>
			<div class="accountInput">
				<el-input v-model="loginModel.userName" placeholder="请输入账号" clearable></el-input>
			</div>

			<div class="passwordInput">
				<!-- :disabled="true" -->
				<el-input v-model="loginModel.userPassword" placeholder="请输入密码" type="password"></el-input>
			</div>
			<div class="submitDiv">
				<el-button @click="login()" size="large" style="width:100%" type="primary">登录</el-button>
			</div>
			<div class="horizontalView loginBtm">
				<div class="zhuce">
					注册
				</div>
				<div class="wangjimm">
					忘记密码?
				</div>
			</div>
			
		</div>
	
	</div>
</template>

<script>
	import {UserLogin} from "../utils/api.js"
	export default {
		data() {
			return {
				loginModel: {
					userName: '',
					userPassword: ''

				},
				loginForm: {
					userName: '',
					userPassword: ''
				}
			}
		},
		methods: {
			login() {
				/* if(!this.getLocation()){
					return;
				} */
				let me = this;
				if (me.loginModel.userName === '' || me.loginModel.userPassword === '') {
					me.$message.error('账号或密码不能为空');
				} else {
					me.loginForm.userName = me.loginModel.userName;
					me.loginForm.userPassword = me.loginModel.userPassword;
					UserLogin(me.loginForm).then((response) => {
						if (response.result) {
							me.$message({
								message: '登陆成功',
								type: 'success'
							});
							localStorage.setItem('Authorization', response.token);
							localStorage.setItem('role',response.role)
							localStorage.setItem('userName',me.loginForm.userName)
							me.$router.replace('/');
						}else{
							me.$message({
								message: '登陆失败',
								type: 'error'
							});
						}

					}).catch((error) => {
						// me.$message.error('网络出错');
						console.log(error);
					})
				}
			}
		}
	}
</script>

<style>
	.centerCard {
		background-color: #FFFFFF;
		width: 600px;
		height: 380px;
		margin: auto;
		border-radius: 5px;
		/* width: 700px;
		height: 460px; */
	}

	.accountInput {
		margin: 30px 50px;
	}

	.passwordInput {
		margin: 30px 50px;
	}

	.submitDiv {
		margin: 30px 50px;
	}
	.title {
		width: 100%;
		height: 68px;
		line-height: 68px;
		text-align: center;
		border-bottom: #eeeeee;
		font-size: 25px;
		color: #4b4b4b;
		font-weight: 520;
		border-bottom-width: 0.5px;
		border-bottom-style: solid;
	}
	.loginBtm{
		margin: 0px 50px;
	}
	.loginBtm .zhuce{
		position: absolute;
		font-size: 20px;
		left: 0px;
		color: #2d8bee;
	}
	
	.loginBtm .zhuce:hover{
		border-bottom: #2d8bee solid 0.5px;
		cursor: pointer;
	}
	
	.loginBtm .wangjimm{
		position: absolute;
		font-size: 20px;
		right: 0px;
		color: #a7a7a7;
	}
	.loginBtm .wangjimm:hover{
		border-bottom: #a7a7a7 solid 0.5px;
		cursor: pointer;
	}
	
</style>
