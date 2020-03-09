import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import { ROLES } from '@/utils/enum'
import { getRolesInfo } from '@/utils/roles'
import { authCheck } from '../api/login'
// import {syncRouterMap,constantRouterMap} from './routes'
Vue.use(Router);

const whiteRoutes = ['login', 'forget']//路由白名单

const constantRouterMap = [
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
  // {
  //     path: '/dashboard',
  //     component: () => import('@/view/dashboard'),
  //     name: 'dashboard'
  // }
]

let syncRouterMap = [
  {
    path: '/dashboard',
    component: () => import('@/view/dashboard'),
    name: 'dashboard',
    meta: {
      key: ['rpm_org_dashboard', 'rpm_depart_dashboard', 'rpm_doctor_dashboard'],
      title: 'dashboard',
      keepAlive: true,
      menu: {
        icon: () => import('@/assets/img/sider/organization.svg')
      }
    }
  },
  {
    path: '/organs',
    meta: {
      key: 'rpm_org_manage',
      roles: ['organManager'],
      title: '机构管理',
      keepAlive: true,
      menu: {
        icon: () => import('@/assets/img/sider/organization.svg')
      }
    },
    component: () => import('@/view/layout'),
    children: [
      {
        path: '',
        name: 'rpm_org_manage',
        meta: {
          key: 'rpm_org_manage'
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
      key: 'rpm_depart_manage',
      roles: ['organManager', 'teamManager'],
      title: '团队管理',
      parentBreadCrumb: 'rpm_org_manage',
      keepAlive: true,
      menu: {
        icon: () => import('@/assets/img/sider/organization.svg')
      }
    },
    component: () => import('@/view/layout'),
    children: [
      {
        path: '',
        name: 'rpm_depart_manage',
        meta: {
          key: 'rpm_depart_manage'
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
      key: 'rpm_doctor_manage',
      title: '医生管理',
      roles: ['organManager', 'teamManager', 'doctorManager'],
      parentBreadCrumb: 'rpm_depart_manage',
      keepAlive: true,
      menu: {
        icon: () => import('@/assets/img/sider/organization.svg')
      }
    },
    component: () => import('@/view/layout'),
    children: [
      {
        path: '',
        name: 'rpm_doctor_manage',
        meta: {
          key: 'rpm_doctor_manage'
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
      key: 'rpm_patient_manage',
      title: '患者管理',
      roles: ['organManager', 'teamManager', 'doctorManager', 'doctor'],
      parentBreadCrumb: 'rpm_doctor_manage',
      keepAlive: true,
      menu: {
        icon: () => import('@/assets/img/sider/organization.svg')
      }
    },
    component: () => import('@/view/layout'),
    children: [
      {
        path: '',
        name: 'rpm_patient_manage',
        meta: {
          key: 'rpm_patient_manage'
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
    path: '/abnormal-patients',
    meta: {
      key: 'sign_data_manage',
      title: '体征异常管理',
      roles: ['organManager', 'teamManager', 'doctorManager', 'doctor'],
      keepAlive: true,
      menu: {
        icon: () => import('@/assets/img/sider/organization.svg')
      }
    },
    component: () => import('@/view/layout'),
    children: [
      {
        path: '',
        name: 'sign_data_manage',
        meta: {
          key: 'sign_data_manage'
        },
        component: () => import('@/view/patients/abnormal'),
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
        path: '/device',
        name: 'device',
        component: () => import('@/view/device'),
        meta: {
          key: 'device',
          title: '设备管理',
          keepAlive: true,
          menu: {
            icon: () => import('@/assets/img/sider/organization.svg')
          }
        }
      },
      {
        path: '/device/edit',
        name: 'deviceEdit',
        component: () => import('@/view/device/edit'),
        meta: {
          key: 'deviceEdit',
          title: '设备编辑',
          keepAlive: true
        }
      },
      {
        path: 'organization',
        name: 'organization',
        component: () => import('@/view/organization'),
        meta: {
          roles: ['organManager', 'teamManager', 'doctorManager'],
          key: 'organization',
          title: '人员架构',
          keepAlive: true,
          menu: {
            icon: () => import('@/assets/img/sider/organization.svg')
          }
        }
      },
      {
        path: 'updatePassword',
        name: 'updatePassword',
        redirect: '/forget',
        component: () => import('@/view/login/forget'),
        meta: {
          key: 'updatePassword',
          title: '修改密码',
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
  routes: constantRouterMap,
});

//过滤授权的路由
const filterRoutes = () => {
  let { role } = getRolesInfo()
  const func = (routes) => {
    return routes.filter(item => {
      if (item.meta && item.meta.roles) {
        if (item.meta.roles.indexOf(role) < 0) {
          return false;
        }
      }
      if (item.children && item.children.length != 0) {
        item.children = func(item.children)
      }
      return true
    })
  }
  syncRouterMap = func(syncRouterMap)
  return syncRouterMap
}


router.beforeEach((to, from, next) => {
  document.documentElement.scrollLeft = 0;

  if (whiteRoutes.indexOf(to.name) < 0) {
    //检查用户是否登录
    let user = localStorage.getItem('lifesense_medical_token')
    if (user) {
      try {
        user = JSON.parse(user)
        store.commit('SET_USER', user);

        let menu = store.state.menu
        if (!menu) {
          let accessRoutes = filterRoutes()
          router.addRoutes(accessRoutes)
          store.commit('SET_ROUTES', constantRouterMap.concat(accessRoutes))
          store.commit('SET_MENU', {
            routes: constantRouterMap.concat(accessRoutes),
            menu: [
              {
                key: 'rpm_org_dashboard'
              },
              {
                key: 'rpm_org_manage'
              },
              {
                key: 'setting',
                children: [
                  {
                    key:'device'
                  },
                  {
                    key: 'organization'
                  },
                  {
                    key: 'updatePassword'
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
