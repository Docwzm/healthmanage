import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import { ROLES } from '@/utils/enum'
import { getRolesInfo } from '@/utils/roles'
import { authCheck } from '../api/login'
Vue.use(Router);

const whiteRoutes = ['login', 'forget']//路由白名单

let staticRoutes = [
  {
    path: '/login',
    component: () => import('@/view/login'),
    name: 'login'
  },
  {
    path: '/forget',
    component: () => import('@/view/login/forget'),
    name: 'forget'
  },
  {
    path: '/404',
    component: () => import('@/view/error-page/404'),
    hidden: true
  },
  {
    path: '/',
    name: 'home',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    component: () => import('@/view/dashboard'),
    name: 'dashboard'
  }
]
//授权路由汇总
let syncRoutes = [
  {
    path: '/organs',
    meta: {
      key: 'organs',
      roles: ['organManager'],
      title: '机构管理',
      keepAlive: true,
      menu: {
        icon: () => import('@/assets/img/sider/organization.svg')
      },
    },
    component: () => import('@/view/layout'),
    children: [
      {
        path: '',
        name: 'organs',
        meta: {
          key: 'organs'
        },
        component: () => import('@/view/organs'),
      },
      {
        path: 'edit',
        name: 'organsEdit',
        meta: {
          key: 'organsEdit'
        },
        component: () => import('@/view/organs/edit'),
      }
    ]
  },
  {
    path: '/teams',
    meta: {
      key: 'teams',
      roles: ['organManager', 'teamManager'],
      title: '团队管理',
      parentBreadCrumb: 'organs',
      keepAlive: true,
      menu: {
        icon: () => import('@/assets/img/sider/organization.svg')
      }
    },
    component: () => import('@/view/layout'),
    children: [
      {
        path: '',
        name: 'teams',
        meta: {
          key: 'teams'
        },
        component: () => import('@/view/teams'),
      },
      {
        path: 'edit',
        name: 'teamsEdit',
        meta: {
          key: 'teamsEdit'
        },
        component: () => import('@/view/teams/edit'),
      }
    ]
  },
  {
    path: '/doctors',
    meta: {
      key: 'doctors',
      title: '医生管理',
      roles: ['organManager', 'teamManager', 'doctorManager'],
      parentBreadCrumb: 'teams',
      keepAlive: true,
      menu: {
        icon: () => import('@/assets/img/sider/organization.svg')
      }
    },
    component: () => import('@/view/layout'),
    children: [
      {
        path: '',
        name: 'doctors',
        meta: {
          key: 'doctors'
        },
        component: () => import('@/view/doctors'),
      },
      {
        path: 'edit',
        name: 'doctorsEdit',
        meta: {
          key: 'doctorsEdit'
        },
        component: () => import('@/view/doctors/edit'),
      }
    ]
  },
  {
    path: '/patients',
    meta: {
      key: 'patients',
      title: '患者管理',
      roles: ['organManager', 'teamManager', 'doctorManager', 'doctor'],
      parentBreadCrumb: 'doctors',
      keepAlive: true,
      menu: {
        icon: () => import('@/assets/img/sider/organization.svg')
      }
    },
    component: () => import('@/view/layout'),
    children: [
      {
        path: '',
        name: 'patients',
        meta: {
          key: 'patients'
        },
        component: () => import('@/view/patients'),
      },
      {
        path: 'edit',
        name: 'patientsEdit',
        meta: {
          key: 'patientsEdit'
        },
        component: () => import('@/view/patients/edit'),
      }
    ]
  },
  {
    path: '/setting',
    component: () => import('@/view/layout'),
    meta: {
      key: 'setting',
      title: '设置',
      menu: {
        icon: () => import('@/assets/img/sider/organization.svg')
      }
    },
    children: [
      {
        path: 'organization',
        name: 'organization',
        component: () => import('@/view/organization'),
        meta: {
          key: 'organization',
          title: '人员架构',
          keepAlive: true,
          menu: {
            icon: () => import('@/assets/img/sider/organization.svg')
          }
        }
      }
    ]
  },
  { path: '*', redirect: '/404' }
]

let router = new Router({
  routes: staticRoutes,
});

//过滤授权的路由
const filterRoutes = () => {
  let { role } = getRolesInfo()
  syncRoutes = syncRoutes.filter(item => {
    if (item.meta && item.meta.roles) {
      if (item.meta.roles.indexOf(role) < 0) {
        return false;
      }
    }
    return true
  })
  return syncRoutes
}


router.beforeEach((to, from, next) => {
  document.documentElement.scrollLeft = 0;

  if (whiteRoutes.indexOf(to.name) < 0) {
    //检查用户是否登录
    let user = localStorage.getItem('lifesense_medical_user')
    if (user) {
      try {
        user = JSON.parse(user)
        store.commit('SET_USER', user);

        let menu = store.state.menu
        if (!menu) {
          let accessRoutes = filterRoutes()
          router.addRoutes(accessRoutes)
          store.commit('SET_ROUTES', staticRoutes.concat(accessRoutes))
          store.commit('SET_MENU', {
            routes: staticRoutes.concat(accessRoutes),
            menu: [
              {
                key: 'organs'
              },
              {
                key: 'setting',
                children: [
                  {
                    key: 'organization'
                  }
                ]
              }
            ]
          })

          next({ ...to, replace: true })
        } else {
          next()
        }
      } catch (e) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        });
      }
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next()
  }

});


export default router
