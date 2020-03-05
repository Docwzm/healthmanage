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
    path: '/dashboard',
    component: () => import('@/view/dashboard'),
    name: 'dashboard'
  },
  // {
  //   path: '/setting',
  //   component: () => import('@/view/dashboard'),
  //   name: 'setting',
  //   meta:{
  //     title:'设置',
  //     menu:{
  //       icon:() => import('@/statics/img/sider/organization.svg')
  //     }
  //   },
  //   children:[
  //     {
  //       path: '/test',
  //       component: () => import('@/view/dashboard'),
  //       name: 'test',
  //       meta:{
  //         title:'test',
  //         menu:{
  //           icon:() => import('@/statics/img/sider/organization.svg')
  //         }
  //       }
  //     }
  //   ]
  // }
]
//授权路由汇总
let syncRoutes = [
  {
    path: '/',
    name: 'home',
    redirect: '/dashboard'
  },
  {
    path: '/organs',
    name: 'organs',
    meta: {
      roles: ['organManager'],
      title: '机构管理',
      keepAlive: true,
      menu: {
        icon: () => import('@/statics/img/sider/organization.svg')
      },
    },
    component: () => import('@/view/layout'),
    children: [
      {
        path: '',
        name: 'organs',
        component: () => import('@/view/organs'),
      },
      {
        path: 'edit',
        name: 'organsEdit',
        component: () => import('@/view/organs/edit'),
      }
    ]
  },
  {
    path: '/teams',
    name: 'teams',
    meta: {
      roles: ['organManager', 'teamManager'],
      title: '团队管理',
      parentBreadCrumb: 'organs',
      keepAlive: true,
      menu: {
        icon: () => import('@/statics/img/sider/organization.svg')
      }
    },
    component: () => import('@/view/layout'),
    children: [
      {
        path: '',
        name: 'teams',
        component: () => import('@/view/teams'),
      },
      {
        path: 'edit',
        name: 'teamsEdit',
        component: () => import('@/view/teams/edit'),
      }
    ]
  },
  {
    path: '/doctors',
    name: 'doctors',
    meta: {
      title: '医生管理',
      roles: ['organManager', 'teamManager', 'doctorManager'],
      parentBreadCrumb: 'teams',
      keepAlive: true,
      menu: {
        icon: () => import('@/statics/img/sider/organization.svg')
      }
    },
    component: () => import('@/view/layout'),
    children: [
      {
        path: '',
        name: 'doctors',
        component: () => import('@/view/doctors'),
      },
      {
        path: 'edit',
        name: 'doctorsEdit',
        component: () => import('@/view/doctors/edit'),
      }
    ]
  },
  {
    path: '/patients',
    name: 'patients',
    meta: {
      title: '患者管理',
      roles: ['organManager', 'teamManager', 'doctorManager', 'doctor'],
      parentBreadCrumb: 'doctors',
      keepAlive: true,
      menu: {
        icon: () => import('@/statics/img/sider/organization.svg')
      }
    },
    component: () => import('@/view/layout'),
    children: [
      {
        path: '',
        name: 'patients',
        component: () => import('@/view/patients'),
      },
      {
        path: 'edit',
        name: 'patientsEdit',
        component: () => import('@/view/patients/edit'),
      }
    ]
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('@/view/layout'),
    meta: {
      title: '设置',
      menu: {
        icon: () => import('@/statics/img/sider/organization.svg')
      }
    },
    children: [
      {
        path: '/organization',
        name: 'organization',
        component: () => import('@/view/organization'),
        meta: {
          title: '人员架构',
          keepAlive: true,
          menu: {
            icon: () => import('@/statics/img/sider/organization.svg')
          }
        }
      }
    ]
  }

]

let router = new Router({
  routes: staticRoutes.concat(syncRoutes),
});

//过滤授权的路由
const filterRoutes = () => {
  console.log('......../')
  let { role } = getRolesInfo()
  console.log(role)
  syncRoutes = syncRoutes.filter(item => {
    if (item.meta && item.meta.roles) {
      if (item.meta.roles.indexOf(role) < 0) {
        return false;
      }
    }
    return true
  })
  console.log('syncRoutes', syncRoutes)
  return syncRoutes
}


router.beforeEach((to, from, next) => {
  document.documentElement.scrollLeft = 0;

  if (whiteRoutes.indexOf(to.name) < 0) {
    //检查用户是否登录
    let user = localStorage.getItem('lifesense_medical_user')
    if (user) {
      console.log('........../user', user)
      try {
        user = JSON.parse(user)
        store.commit('SET_USER', user);

        let syncRoutes = store.state.syncRoutes
        console.log(syncRoutes)
        if (!syncRoutes) {
          let accessRoutes = filterRoutes()
          console.log(accessRoutes)
          router.addRoutes(accessRoutes)
          store.commit('SET_SYNCROUTES', accessRoutes);
        }

        let syncMenu = store.state.menu
        if (!syncMenu) {
          store.commit('SET_MENU', [
            {
              key: 'organs'
            },
            {
              key:'setting',
              children:[
                {
                  key:'organization'
                }
              ]
            }
          ])
        }
        next();
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
