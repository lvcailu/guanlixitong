<template>
	<div>
		<el-card>
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/wecome' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>活动管理</el-breadcrumb-item>
				<el-breadcrumb-item>活动列表</el-breadcrumb-item>
			</el-breadcrumb>
			<el-row :gutter="20">
				<el-col :span="6">
					<el-input
						placeholder="请输入内容"
						v-model="queryInfo.query"
						clearable
						@clear="getUserList()"
					>
						<el-button
							slot="append"
							icon="el-icon-search"
							@click="getUserList()"
						></el-button> </el-input
				></el-col>
				<el-col :span="6"
					><el-button type="primary" @click="dialogVisible = true"
						>添加用户</el-button
					></el-col
				>
			</el-row>
			<!-- 表格 -->
			<el-table :data="userlist" border stripe>
				<el-table-column type="index"> </el-table-column>
				<el-table-column prop="username" label="用户名"> </el-table-column>
				<el-table-column prop="email" label="邮箱"> </el-table-column>
				<el-table-column prop="create_time" label="电话"></el-table-column>
				<el-table-column prop="role_name" label="角色"></el-table-column>
				<el-table-column label="操作">
					<template v-slot="scope">
						<!-- scope相当于一行的数据， scope.row相当于当前行的数据对象, -->
						<el-switch
							v-model="scope.row.mg_state"
							@change="userState(scope.row)"
						>
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column label="状态" width="180px">
					<template v-slot="scope">
						<el-button
							type="primary"
							icon="el-icon-edit"
							size="mini"
							@click="xiugai(scope.row.id)"
						></el-button>
						<el-button
							type="success"
							icon="el-icon-delete"
							size="mini"
							@click="remove(scope.row.id)"
						></el-button>
						<el-tooltip
							class="item"
							effect="dark"
							content="分配角色"
							placement="top"
							:enterable="false"
						>
							<el-button
								type="info"
								icon="el-icon-share"
								size="mini"
							></el-button>
						</el-tooltip>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="queryInfo.pagenum"
				:page-sizes="[1, 2, 5, 10]"
				:page-size="queryInfo.pagesize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
			>
			</el-pagination>
		</el-card>
		<!-- 对话框 -->
		<el-dialog
			title="添加用户"
			:visible.sync="dialogVisible"
			width="40%"
			@close="tabclose"
		>
			<el-form
				:model="ruleForm"
				:rules="rules"
				ref="ruleForm"
				label-width="100px"
			>
				<el-form-item label="用户名" prop="username">
					<el-input v-model="ruleForm.username"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="ruleForm.password"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="ruleForm.email"></el-input>
				</el-form-item>
				<el-form-item label="手机" prop="mobile">
					<el-input v-model="ruleForm.mobile"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addUser">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 修改对话框 -->
		<el-dialog
			title="修改用户"
			:visible.sync="dialogVisible1"
			width="30%"
			@close="tabclose1"
		>
			<el-form
				:model="data1"
				:rules="rules"
				ref="ruleForm1"
				label-width="100px"
			>
				<el-form-item label="用户名">
					<el-input v-model="data1.username" disabled></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="data1.email"></el-input>
				</el-form-item>
				<el-form-item label="手机" prop="mobile">
					<el-input v-model="data1.mobile"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible1 = false">取 消</el-button>
				<el-button type="primary" @click="xiugai1">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		var checkemail = (rule, value, callback) => {
			var reg = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/
			if (reg.test(value)) {
				return callback()
			}
			callback(new Error('请输入正确的邮箱'))
		}
		var checkemobile = (rule, value, callback) => {
			var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
			if (myreg.test(value)) {
				return callback()
			}
			callback(new Error('请输入正确的手机号'))
		}
		return {
			// 查询到的数据
			data1: {},
			rules1: {},
			ruleForm: {
				username: '',
				password: '',
				email: '',
				mobile: ''
			},
			rules: {
				username: [
					{ required: true, message: '请输入用户名', trigger: 'blur' },
					{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
				],
				email: [
					{ required: true, message: '请输入邮件', trigger: 'blur' },
					{ validator: checkemail, trigger: 'blur' }
				],
				mobile: [
					{ required: true, message: '请输入手机号', trigger: 'blur' },
					{ validator: checkemobile, trigger: 'blur' }
				]
			},
			dialogVisible: false,
			dialogVisible1: false,
			queryInfo: {
				query: '',
				pagenum: 1,
				pagesize: 2
			},
			userlist: [],
			total: 0
		}
	},
	created() {
		this.getUserList()
	},
	methods: {
		async remove(id) {
			console.log(id)
			const res = await this.$confirm(
				'此操作将永久删除该文件, 是否继续?',
				'提示',
				{
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}
			)
				.then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					})
					this.$http.delete('users/' + id)
					this.getUserList()
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
			console.log(res)
		},
		async userState(info) {
			const { data: res } = await this.$http.put(
				`users/${info.id}/state/${info.mg_state}`
			)
			if (res.meta.status !== 200) {
				info.mg_state = !info.mg_state
				return this.$message.error('激活失败！')
			}
			this.$message.success('激活成功')
		},
		async getUserList() {
			const { data: res } = await this.$http.get('users', {
				params: this.queryInfo
			})
			if (res.meta.status !== 200) {
				return this.$message.error('获取用户列表失败！')
			}
			this.userlist = res.data.users
			this.total = res.data.total
			console.log(res)
		},
		handleSizeChange(newsize) {
			this.queryInfo.pagesize = newsize
			this.getUserList()
		},
		tabclose() {
			this.$refs.ruleForm.resetFields()
			console.log(1)
		},
		tabclose1() {
			this.$refs.ruleForm1.resetFields()
			console.log(1)
		},
		handleCurrentChange(newpage) {
			this.queryInfo.pagenum = newpage
			this.getUserList()
		},
		async xiugai(id) {
			console.log(id)
			const { data: res } = await this.$http.get('users/' + id)
			if (res.meta.status !== 200) {
				this.$message.error('查询用户添加失败！')
			}
			this.data1 = res.data
			this.dialogVisible1 = true
			console.log(res.data)
		},
		xiugai1() {
			this.$refs.ruleForm1.validate(async val => {
				if (!val) return
				const { data: res } = await this.$http.put('users/' + this.data1.id, {
					email: this.data1.email,
					modile: this.data1.modile
				})
				if (res.meta.status !== 200) {
					this.$message.error('更新用户添加失败！')
				}
				this.dialogVisible1 = false
				this.getUserList()
				this.$message.success('更新用户成功')
			})
		},
		addUser() {
			this.$refs.ruleForm.validate(async val => {
				if (!val) return
				const { data: res } = await this.$http.post('users', this.ruleForm)
				if (res.meta.status !== 201) {
					this.$message.error('用户添加失败！')
				}
				this.$message.success('用户添加成功！')
				this.dialogVisible = false
				this.getUserList()
			})
		}
	}
}
</script>

<style scoped></style>
