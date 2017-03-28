// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import io from 'socket.io-client'
import store from './store'

new Vue({
  el: '#app',
  data: {
    store
  },
  router,
  template: '<App/>',
  components: { App }
})