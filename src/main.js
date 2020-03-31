import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.styl'
import './plugins/element.js'
import api from './api' // 导入api接口
Vue.prototype.$api = api
// 暂时不能删除，侧边栏菜单还未封装axios
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
