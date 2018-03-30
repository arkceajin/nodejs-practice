// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VueMaterial from 'vue-material'
import VeeValidate from 'vee-validate'
import VueSocketio from 'vue-socket.io'
import 'vue-material/dist/vue-material.min.css'
import constants from '../bin/constants'
import jwtDecode from 'jwt-decode'

VueMaterial.scrollBar = true
Vue.use(VueMaterial)
Vue.use(VueResource)
Vue.use(VeeValidate)
Vue.use(VueSocketio, window.location.hostname + ':' + constants.SERVER_PORT)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    const token = sessionStorage.getItem(constants.USER_TOKEN)
    if (token !== 'null' && token !== null) {
      Vue.http.headers.common['Authorization'] = 'Bearer ' + token
      next()
    } else {
      router.push({path: '/', query: { showLogin: true }})
    }
  } else {
    next()
  }
})

Vue.prototype.getCurrentUser = function () {
  var token = sessionStorage.getItem(constants.USER_TOKEN)
  return token !== null ? jwtDecode(token) : null
}
Vue.prototype.setCurrentUser = function (token) {
  if (token == null) {
    sessionStorage.removeItem(constants.USER_TOKEN)
  } else {
    sessionStorage.setItem(constants.USER_TOKEN, token)
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
