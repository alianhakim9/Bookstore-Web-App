import Vue from 'vue'
import Vuex from 'vuex'
import alert from '../store/alert'
import dialog from '../store/dialog'
import auth from '../store/auth'
import cart from '../store/cart'
import region from '../store/region'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sideBar: false,
    prevUrl: ''
  },
  mutations: {
    setSideBar: (state, value) => {
      state.sideBar = value
    },
    setPrevUrl: (state, value) => {
      state.prevUrl = value
    }
  },
  actions: {
    setSideBar: ({ commit }, value) => {
      commit('setSideBar', value)
    },
    setPrevUrl: ({ commit }, value) => {
      commit('setPrevUrl', value)
    }
  },
  getters: {
    sideBar: state => state.sideBar,
    prevUrl: state => state.prevUrl
  },
  modules: {
    alert,
    dialog,
    auth,
    cart,
    region
  }
})
