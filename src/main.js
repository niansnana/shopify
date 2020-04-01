import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.styl'
import './plugins/element.js'
import api from './api' // 导入api接口
Vue.prototype.$api = api

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
