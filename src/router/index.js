import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import WeCome from '../components/WeCome.vue'
import Users from '../components/user/Users.vue'
Vue.use(VueRouter)

const routes = [
	{ path: '/login', component: Login },
	{
		path: '/home',
		component: Home,
		redirect: '/wecome',
		children: [{ path: '/wecome', component: WeCome },{path:'/users',component:Users}]
	},
	{
		path: '/',
		redirect: '/login'
	}
]

const router = new VueRouter({
	routes
})
router.beforeEach((to, from, next) => {
	next()
	const tokenstr = window.sessionStorage.getItem('token')
	if (!tokenstr) return next('/login')
	next()
})
export default router
