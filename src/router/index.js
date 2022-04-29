import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'
import Error404 from '@/views/Error404'
import AdminHome from '@/views/AdminHome'
import Register from '@/views/Register'
import Inquiry from '../userviews/Inquiry'
import Trade from '../userviews/Trade'
import Upload from '../userviews/Upload'
import LogManagement from '../adminviews/LogManagement'
import TodoList from '../adminviews/TodoList'
import TradeList from "@/adminviews/TradeList";
import List from "@/userviews/List"
import Login from "@/views/Login";

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { // 加一个自定义obj
      requireAuth: true // 这个参数 true 代表需要登录才能进入A
    }
  },
  {
    path: '/admin',
    name: 'AdminHome',
    component: AdminHome,
    children: [
      {
        path: '/admin/TodoList', //审核模块
        component: TodoList,
        meta: {
          requireAuth: true,
          identity: 1
        },
      },
      {
        path: '/admin/LogManagement', //查看已审核的信息
        component: LogManagement,
        meta: {
          requireAuth: true,
          identity: 1
        },
      },
      {
        path: '/admin/TradeLIst', //查看已审核的信息
        component: TradeList,
        meta: {
          requireAuth: true,
          identity: 1
        },
      }
      // ,
      // {
      //   path: '/admin/UserManagement',
      //   component: UserManagement,
      //   meta: {
      //     requireAuth: true,
      //     identity: 1
      //   },
      // },
      // {
      //   path: '/admin/UploadCsv',
      //   component: UploadCsv,
      //   meta: {
      //     requireAuth: true,
      //     identity: 1
      //   },
      // }
    ],
    meta: {
      requireAuth: true,
      identity: 1
    },
    beforeEnter: (to, from, next) => {
      if (to.meta.identity !== store.state.identity) {
        alert('用户身份不匹配!')
        next({ path: '/' })
      } else {
        next()
      }
    }
  },
  {
    path: '/admin/TodoList',
    name: 'TodoList',
    component: TodoList,
    meta: {
      requireAuth: true,
      identity: 0
    },
    beforeEnter: (to, from, next) => {
      if (to.meta.identity !== store.state.identity) {
        alert('用户身份不匹配!')
        next({ path: '/' })
      } else {
        next()
      }
    }
  },
  {
    path: '/admin/LogManagement',
    name: 'LogManagement',
    component: LogManagement,
    meta: {
      requireAuth: true,
      identity: 0
    },
    beforeEnter: (to, from, next) => {
      if (to.meta.identity !== store.state.identity) {
        alert('用户身份不匹配!')
        next({ path: '/' })
      } else {
        next()
      }
    }
  },
  {
    path: '/admin/TradeList',
    name: 'UploadCsv',
    component: TradeList,
    meta: {
      requireAuth: true,
      identity: 0
    },
    beforeEnter: (to, from, next) => {
      if (to.meta.identity !== store.state.identity) {
        alert('用户身份不匹配!')
        next({ path: '/' })
      } else {
        next()
      }
    }
  },
  {
    path: '/user',
    name: 'UserHome',
    component: () => import(/* webpackChunkName: "user" */ '../views/UserHome.vue'),
    meta: {
      requireAuth: true,
      identity: 0
    },
    children: [
      {
        path: '/user/Upload',
        component: Upload,
        meta: {
          requireAuth: true,
          identity: 0
        },
      },
      {
        path: '/user/Inquiry',
        component: Inquiry,
        meta: {
          requireAuth: true,
          identity: 0
        },
      },
      {
        path: '/user/Trade',
        component: Trade,
        meta: {
          requireAuth: true,
          identity: 0
        },
      },
      {
        path: '/user/List',
        component: List,
        meta: {
          requireAuth: true,
          identity: 0
        },
      }
    ],
    beforeEnter: (to, from, next) => {
      if (to.meta.identity !== store.state.identity) {
        alert('用户身份不匹配!')
        next({ path: '/' })
      } else {
        next()
      }
    }
  },
  {
    path: '/user/Upload',
    name: 'Upload',
    component: Upload,
    meta: {
      requireAuth: true,
      identity: 0
    },
    beforeEnter: (to, from, next) => {
      if (to.meta.identity !== store.state.identity) {
        alert('用户身份不匹配!')
        next({ path: '/' })
      } else {
        next()
      }
    }
  },
  {
    path: '/user/Inquiry',
    name: 'Inquiry',
    component: Inquiry,
    meta: {
      requireAuth: true,
      identity: 0
    },
    beforeEnter: (to, from, next) => {
      if (to.meta.identity !== store.state.identity) {
        alert('用户身份不匹配!')
        next({ path: '/' })
      } else {
        next()
      }
    }
  },
  {
    path: '/user/Trade',
    name: 'Trade',
    component: Trade,
    meta: {
      requireAuth: true,
      identity: 0
    },
    beforeEnter: (to, from, next) => {
      if (to.meta.identity !== store.state.identity) {
        alert('用户身份不匹配!')
        next({ path: '/' })
      } else {
        next()
      }
    }
  },
  {
    path: '/user/List',
    name: 'List',
    component: List,
    meta: {
      requireAuth: true,
      identity: 0
    },
    beforeEnter: (to, from, next) => {
      if (to.meta.identity !== store.state.identity) {
        alert('用户身份不匹配!')
        next({ path: '/' })
      } else {
        next()
      }
    }
  },

  // // /*Doctor*/
  //
  // //User
  // {
  //   path: '/user',
  //   name: 'UserHome',
  //   component: UserHome,
  //   children: [
  //     {
  //       path: '/user/DoctorAppointment',
  //       name: 'DoctorAppointment',
  //       component: DoctorAppointment,
  //       meta: {
  //         requireAuth: true,
  //         identity: 0
  //       }
  //     },
  //     {
  //       path: '/user/DoctorData',
  //       name: 'DoctorData',
  //       component: DoctorData,
  //       meta: {
  //         requireAuth: true,
  //         identity: 0
  //       }
  //     },
  //     {
  //       path: '/user/index',
  //       name: 'Index',
  //       component: MyPatient,
  //       meta: {
  //         requireAuth: true,
  //         identity: 0
  //       }
  //     },
  //   ],
  //   meta: {
  //     requireAuth: true,
  //     identity: 0
  //   },
  //   beforeEnter: (to, from, next) => {
  //     if (to.meta.identity !== store.state.identity) {
  //       alert('用户身份不匹配!')
  //       console.log('???')
  //       next({ path: '/' })
  //     } else {
  //       next()
  //     }
  //   }
  // },
  // {
  //   path: '/user/DoctorAppointment',
  //   name: 'DoctorAppointment',
  //   component: DoctorAppointment,
  //   meta: {
  //     requireAuth: true,
  //     identity: 3
  //   },
  //   beforeEnter: (to, from, next) => {
  //     if (to.meta.identity !== store.state.identity) {
  //       alert('用户身份不匹配!')
  //       console.log('???')
  //       next({ path: '/' })
  //     } else {
  //       next()
  //     }
  //   }
  // },
  // {
  //   path: '/user/DoctorData',
  //   name: 'DoctorData',
  //   component: DoctorData,
  //   meta: {
  //     requireAuth: true,
  //     identity: 0
  //   },
  //   beforeEnter: (to, from, next) => {
  //     if (to.meta.identity !== store.state.identity) {
  //       alert('用户身份不匹配!')
  //       console.log('???')
  //       next({ path: '/' })
  //     } else {
  //       next()
  //     }
  //   }
  // },
  // {
  //   path: '/user/MyPatient',
  //   name: 'MyPatient',
  //   component: MyPatient,
  //   meta: {
  //     requireAuth: true,
  //     identity: 0
  //   },
  //   beforeEnter: (to, from, next) => {
  //     if (to.meta.identity !== store.state.identity) {
  //       alert('用户身份不匹配!')
  //       console.log('???')
  //       next({ path: '/' })
  //     } else {
  //       next()
  //     }
  //   }
  // },
  {
    path: '/',
    name: 'login',
    component: Login,
    meta: {
      keepAlive: true,
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      keepAlive: true,
    }
  },
  // {
  //   path: '/chart',
  //   name: 'chart',
  //   component: Chart
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },

  {
    path: '/*',
    name: 'Error404',
    component: Error404
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.isLogin) {
      next()
    } else {
      next({ path: '/' })
    }
  } else {
    next()
  }
})
export default router
