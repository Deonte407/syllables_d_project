// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {ClientTable} from 'vue-tables-2'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(ClientTable)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',

  mounted () {
    console.log(this)
  }
})
