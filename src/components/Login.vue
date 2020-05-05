<template>
	<div class="login">
		<div class="login_box">
			<div class="login_son">
				<img src="../assets/logo.png" alt />
			</div>
			<div>
				<el-form
					ref="from1"
					label-width="0"
					class="login_form"
					:model="form"
					:rules="rules"
				>
					<!-- 用户名 -->
					<el-form-item prop="username">
						<el-input
							prefix-icon="iconfont icon-tubiao211"
							v-model="form.username"
						></el-input>
					</el-form-item>
					<!-- 密码 -->
					<el-form-item prop="password">
						<el-input
							prefix-icon="iconfont icon-mima"
							v-model="form.password"
							type="password"
						></el-input>
					</el-form-item>
					<!-- 按钮 -->
					<el-form-item class="btns">
						<el-button type="primary" @click="login">登录</el-button>
						<el-button type="success" @click="from1">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			form: {
				username: 'admin',
				password: '123456'
			},
			rules: {
				name: [
					{ required: true, message: '请输入用户名', trigger: 'blur' },
					{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
				]
			}
		}
	},
	methods: {
		// 表单重置
		from1() {
			console.log(this)
			this.$refs.from1.resetFields()
		},
		// 表单验证
		login() {
			this.$refs.from1.validate(async valueid => {
				if (!valueid) return
				const { data: res } = await this.$http.post('login', this.form)
				if (res.meta.status == 200) {
					this.$message.success('登录成功')
					window.sessionStorage.setItem('token', res.data.token)
					this.$router.push('/home')
				} else {
					this.$message.error('登录失败')
				}
			})
		}
	}
}
</script>

<style scoped>
.login {
	background: #2b4b6b;
	width: 100%;
	height: 100%;
}
.login_box {
	width: 450px;
	height: 300px;
	background-color: #fff;
	border-radius: 3px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.login_son {
	width: 130px;
	height: 130px;
	box-shadow: #000;
	padding: 10px;
	border-radius: 50%;
	position: absolute;
	left: 50%;
	background: #fff;
	transform: translate(-50%, -50%);
	border: 1px solid #eee;
}
.login_son > img {
	width: 100%;
	height: 100%;
	border-radius: 50%;
	background: honeydew;
}
.btns {
	display: flex;
	justify-content: flex-end;
}
.login_form {
	position: absolute;
	bottom: 0;
	padding: 0 20px;
	width: 100%;
	box-sizing: border-box;
}
</style>
