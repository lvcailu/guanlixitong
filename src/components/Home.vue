<template>
	<el-container>
		<el-header>
			<div>
				<img src="../assets/img1.jpg" alt="" /><span>后台管理系统</span>
			</div>
			<el-button type="info" @click="out">退出 </el-button>
		</el-header>
		<!-- 侧边栏 -->
		<el-container >
			<el-aside :width="flag?'64px':'200px'"
				><el-menu
					background-color="#373d41"
					text-color="#fff"
					active-text-color="yellow"
					unique-opened
					:collapse="flag"
					:collapse-transition="false"
					router
					:default-active="activenum"
				>
					<div class="live" @click="fn">|||</div>
					<el-submenu
						:index="item.id + ''"
						v-for="item in menulist"
						:key="item.id" 
					>
						<template slot="title">
							<i :class="Lo[item.id]"></i>
							<span>{{ item.authName }}</span>
						</template>
				
							<el-menu-item
								:index="''+arr.path"
								v-for="arr in item.children"
								:key="arr.id"
								@click="activenavstara(arr.path)"
								><template slot="title">
									<i class="el-icon-menu"></i>
									<span>{{ arr.authName }}</span>
								</template></el-menu-item
							>
					
					</el-submenu>
				</el-menu></el-aside
			>
			<el-main><router-view></router-view></el-main>
		</el-container>
	</el-container>
</template>

<script>
export default {
	data() {
		return {
			menulist: [],
			flag:false,
			activenum:'',
			Lo: {
				'125': 'iconfont icon-bussiness-man',
				'103': 'iconfont icon-copy',
				'101': 'iconfont icon-history',
				'102': 'iconfont icon-editor',
				'145': 'iconfont icon-integral'
			}
		}
	},
	created() {
		this.getMenuList()
			this.activenum=window.sessionStorage.getItem('activepath')
	},
	methods: {
		fn(){
			this.flag=!this.flag
		},
		out() {
			window.sessionStorage.clear()
			this.$router.push('/login')
		},
		activenavstara(activepath){
		window.sessionStorage.setItem('activepath', activepath)
			this.activenum=activepath
			console.log(activepath);
		},
		async getMenuList() {
			const { data: res } = await this.$http.get('menus')
			if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
			this.menulist = res.data
			console.log(res)
		}
	}
}
</script>

<style>
.el-header {
	padding-left: 0;
	background: #373d41;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.el-header > div {
	display: flex;
	align-items: center;
	color: #fff;
	font-size: 20px;
}
.el-aside {
	background: #373d41;

}
.el-menu{	border-right:0;}
.el-main {
	background: #ccc;
}
.el-container {
	width: 100%;
	height: 100%;
}
img {
	width: 10%;
}
.iconfont{
	margin-right:10px;
}
.live{
	color:#fff;
	text-align: center;
	font-size: 10px;
	background-color: rgb(117, 114, 114);
	cursor:pointer;
}
</style>
