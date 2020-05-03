import Vue from 'vue'
import App from './App'
import router from './router/routes'
import Vuetify from 'vuetify'
import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'
import Vuex from 'vuex'
import store from './store'
import VueRouter from 'vue-router'
import * as fb from 'firebase/app'
import Paginate from 'vuejs-paginate'

Vue.use(Vuetify)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.component('Paginate', Paginate)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vuetify,
  store,
  components: { App },
  template: '<App/>',
  created: function () {
    fb.initializeApp({
      apiKey: 'AIzaSyDQI9_j-aZLw87s8nTMTkbYQmYfhbchDYA',
      authDomain: 'ajax-d8ec3.firebaseapp.com',
      databaseURL: 'https://ajax-d8ec3.firebaseio.com',
      projectId: 'ajax-d8ec3',
      storageBucket: 'ajax-d8ec3.appspot.com',
      messagingSenderId: '466038646340',
      appId: '1:466038646340:web:c83cff18b424d05f9f7e11'
    })
    this.$store.dispatch('fetchRealtor')
  }
})
