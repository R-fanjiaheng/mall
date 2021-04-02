import Vue from 'vue'
import App from './App.vue'
import router from "./router";

Vue.config.productionTip = false

// 在 Vue 原型上挂载一个实例方法
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
