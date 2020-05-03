import Vue from 'vue'
import Vuex from 'vuex'
import realtors from '../store/realtors'
import realtor from '../realtor/realtor'
import newRealtor from '../realtor/newRealtor'
import listRealtors from '../realtor/listRealtors'
import shared from './shared'
import Home from '../Home'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    realtors, realtor, newRealtor, shared, Home, listRealtors
  }
})
