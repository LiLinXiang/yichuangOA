<template>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px"
			 class="demo-ruleForm login-container">
		<h3 class="title">系统登录</h3>
		<el-form-item prop="account">
			<el-input type="text" v-model="ruleForm.account" auto-complete="off"
					  placeholder="账号"></el-input>
		</el-form-item>
		<el-form-item prop="checkPass">
			<el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"
					  placeholder="密码"></el-input>
		</el-form-item>
		<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
		<el-form-item style="width:100%;">
			<el-button type="primary" style="width:100%;" @click="loginSubmit"
					   :loading="logining">登录
			</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	import * as api from '../api/api';
	//import {Button} from 'element-ui';

	export default {
		data() {
			return {
				logining: false,
				ruleForm: {
					account: 'lincoln',
					checkPass: '123'
				},
				rules: {
					account: [
						{required: true, message: '请输入账号', trigger: 'blur'},
						//{ validator: validaePass }
					],
					checkPass: [
						{required: true, message: '请输入密码', trigger: 'blur'},
						//{ validator: validaePass2 }
					]
				},
				checked: true
			};
		},
		methods: {
			loginSubmit() {
				this.$refs.ruleForm.validate((valid) => {
					let _this = this;
					if (valid) {
						_this.logining = true;
						let loginParams = {
							name: this.ruleForm.account,
							password: this.ruleForm.checkPass
						};
						api.login(loginParams, function (data, msg) {
							_this.logining = false;
							_this.$router.push('/index');
						}, function (msg) {
							_this.logining = false;
							_this.$message.error(msg);
						});

					} else {
						_this.$message.error('请输入正确的内容!');
						return false;
					}
				});
			}
		},
		components:{
			//Button
		}
	}
</script>

<style lang="scss" scoped>
	.login-container {
		/*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
		-webkit-border-radius: 5px;
		border-radius: 5px;
		-moz-border-radius: 5px;
		background-clip: padding-box;
		margin: 180px auto;
		width: 350px;
		padding: 35px 35px 15px 35px;
		background: #fff;
		border: 1px solid #eaeaea;
		box-shadow: 0 0 25px #cac6c6;
		.title {
			margin: 0 auto 40px auto;
			text-align: center;
			color: #505458;
		}
		.remember {
			margin: 0 0 35px 0;
		}
	}
</style>