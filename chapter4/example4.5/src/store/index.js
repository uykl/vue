import { createStore } from 'vuex'
import moduleA from './modules/a'
import moduleB from './modules/b'

export default createStore({
  modules: {
    a: moduleA,
    b: moduleB
  },
  state: { count: 1 },
  getters: { 
    countGlobal: (state) => state.count * 2
  },
  mutations: {
    increase(state) {
      state.count ++;
    },
    multiply(state, payload) {
      state.count *= payload.count;
    }
  },
  actions: {
    asyncIncrease({commit}) {
      commit('increase')
    },
    asyncMultiply({commit}, payload) {
      commit('multiply', payload)
    }
  }
})
