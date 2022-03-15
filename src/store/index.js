import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    identity:-1,
  },
  mutations: {
    Login: function (state) {
      state.isLogin = true
    },
    UserLogin:function(state,condition){
      switch (condition){
        case '1':
          //管理员
          state.identity=1
          break
        case '0':
          //用户
          state.identity=0
          break
        default:
          break
      }
      console.log("state:"+state.identity)
    },
    OutLogin:function (state) {
      state.isLogin = false
      state.identity=-1
    }
  },
  actions: {
  },
  modules: {
  }
})
