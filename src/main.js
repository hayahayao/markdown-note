import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import '../theme/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import Storage from './plugins/storage'

Vue.config.productionTip = false

Vue.use(ElementUI, {
  size: 'small',
  zIndex: 3000
})

Vue.use(Storage)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
