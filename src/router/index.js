import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '@/views/Login'
import store from '../store'
import Chart from '@/views/Chart'
import Error404 from '@/views/Error404'
import AdminHome from '@/views/AdminHome'
import UserManagement from '@/adminviews/UserManagement'
import Register from '@/views/Register'
import MyDoctor from '../patientviews/MyDoctor'
import MyCase from '../patientviews/MyCase'
import MyData from '../patientviews/MyData'
import DoctorData from '../doctorviews/DoctorData'
import DoctorHome from '../views/DoctorHome'
import MyPatient from '../doctorviews/MyPatient'
import UploadCsv from '../adminviews/UploadCsv'
import MyAppointment from '../patientviews/MyAppointment'
import DoctorAppointment from '../doctorviews/DoctorAppointment'
import LogManagement from '../adminviews/LogManagement'
import TodoList from '../adminviews/TodoList'

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
        path: '/admin/TodoList',
        component: TodoList,
        meta: {
          requireAuth: true,
          identity: 1
        },
      },
      {
        path: '/admin/LogManagement',
        component: LogManagement,
        meta: {
          requireAuth: true,
          identity: 1
        },
      },
      {
        path: '/admin/UserManagement',
        component: UserManagement,
        meta: {
          requireAuth: true,
          identity: 1
        },
      },
      {
        path: '/admin/UploadCsv',
        component: UploadCsv,
        meta: {
          requireAuth: true,
          identity: 1
        },
      }
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
    path: '/admin/UploadCsv',
    name: 'UploadCsv',
    component: UploadCsv,
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
    path: '/admin/UserManagement',
    name: 'UserManagement',
    component: UserManagement,
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
    path: '/patient',
    name: 'PatientHome',
    component: () => import(/* webpackChunkName: "patient" */ '../views/PatientHome.vue'),
    meta: {
      requireAuth: true,
      identity: 2
    },
    children: [
      {
        path: '/patient/MyDoctor',
        component: MyDoctor,
        meta: {
          requireAuth: true,
          identity: 2
        },
      },
      {
        path: '/patient/MyCase',
        component: MyCase,
        meta: {
          requireAuth: true,
          identity: 2
        },
      },
      {
        path: '/patient/MyData',
        component: MyData,
        meta: {
          requireAuth: true,
          identity: 2
        },
      },
      {
        path: '/patient/MyAppointment',
        component: MyAppointment,
        meta: {
          requireAuth: true,
          identity: 2
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
    path: '/patient/MyAppointment',
    name: 'MyAppointment',
    component: MyAppointment,
    meta: {
      requireAuth: true,
      identity: 2
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
    path: '/patient/MyDoctor',
    name: 'MyDoctor',
    component: MyDoctor,
    meta: {
      requireAuth: true,
      identity: 2
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
    path: '/patient/MyCase',
    name: 'MyCase',
    component: MyCase,
    meta: {
      requireAuth: true,
      identity: 2
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
    path: '/patient/MyData',
    name: 'MyData',
    component: MyData,
    meta: {
      requireAuth: true,
      identity: 2
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
    name: 'DoctorHome',
    component: DoctorHome,
    children: [
      {
        path: '/doctor/DoctorAppointment',
        name: 'DoctorAppointment',
        component: DoctorAppointment,
        meta: {
          requireAuth: true,
          identity: 3
        }
      },
      {
        path: '/doctor/DoctorData',
        name: 'DoctorData',
        component: DoctorData,
        meta: {
          requireAuth: true,
          identity: 3
        }
      },
      {
        path: '/user/index',
        name: 'Index',
        component: MyPatient,
        meta: {
          requireAuth: true,
          identity: 3
        }
      },
    ],
    meta: {
      requireAuth: true,
      identity: 3
    },
    beforeEnter: (to, from, next) => {
      if (to.meta.identity !== store.state.identity) {
        alert('用户身份不匹配!')
        console.log('???')
        next({ path: '/' })
      } else {
        next()
      }
    }
  },
  {
    path: '/doctor/DoctorAppointment',
    name: 'DoctorAppointment',
    component: DoctorAppointment,
    meta: {
      requireAuth: true,
      identity: 3
    },
    beforeEnter: (to, from, next) => {
      if (to.meta.identity !== store.state.identity) {
        alert('用户身份不匹配!')
        console.log('???')
        next({ path: '/' })
      } else {
        next()
      }
    }
  },
  {
    path: '/doctor/DoctorData',
    name: 'DoctorData',
    component: DoctorData,
    meta: {
      requireAuth: true,
      identity: 3
    },
    beforeEnter: (to, from, next) => {
      if (to.meta.identity !== store.state.identity) {
        alert('用户身份不匹配!')
        console.log('???')
        next({ path: '/' })
      } else {
        next()
      }
    }
  },
  {
    path: '/doctor/MyPatient',
    name: 'MyPatient',
    component: MyPatient,
    meta: {
      requireAuth: true,
      identity: 3
    },
    beforeEnter: (to, from, next) => {
      if (to.meta.identity !== store.state.identity) {
        alert('用户身份不匹配!')
        console.log('???')
        next({ path: '/' })
      } else {
        next()
      }
    }
  },
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
  {
    path: '/chart',
    name: 'chart',
    component: Chart
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

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
