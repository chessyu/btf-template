import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    skinCareData:{}
  },
  getters:{
    getSkinCareData(state,getters){
      return state.skinCareData;
    }
  },
  mutations: {
    setSkinCareData(state, info){
      state.skinCareData = info
    }
  },
  actions: {
    setSkinCareData(context,data){
      context.commit('setSkinCareData',data)
    }
  },

  modules: {
  }
})
