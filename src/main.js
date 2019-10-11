import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import '../theme/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import db from './modules/database'

Vue.config.productionTip = false

Vue.use(ElementUI, {
  size: 'small',
  zIndex: 3000
})

Vue.use(require('vue-moment'))

async function main() {
  await db.initDB(['note', 'notebook'])
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
}

main()
