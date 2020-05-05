import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/glboll.css"
import ElementUI from 'element-ui';
import "./assets/font/iconfont.css"
import axios from 'axios'
//配置请求的根路径
axios.defaults.baseURL="http://127.0.0.1:8888/api/private/v1/"
Vue.prototype.$http = axios
// Vue.prototype.$confirm = MessageBox.confirm
axios.interceptors.request.use(config=>{config.headers.Authorization=window.sessionStorage.getItem('token')
console.log(config);
return config
})
Vue.config.productionTip = false;
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
