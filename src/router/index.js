import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import { authCheck } from '../api/login'

Vue.use(Router);

let statciRoutes = [
  {
    path: '/login',
    component: () => import('@/view/login'),
    name: 'login'
  },
  // {
  //   path: '/forget',
  //   component: () => import('@/view/login/forget'),
  //   name: 'forget'
  // },
  {
    path: '/dashboard',
    component: () => import('@/view/dashboard'),
    name: 'dashboard'
  }
]


let syncRoutes = [
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
      roles: ['organManager', 'teamManager', 'doctorManager', 'patientManager'],
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
    path: '/organization',
    name: 'organization',
    meta: {
      title: '人员架构',
      keepAlive: true,
      menu: {
        icon: () => import('@/statics/img/sider/organization.svg')
      }
    },
    component: () => import('@/view/layout'),
    children: [
      {
        path: '',
        name: 'organization',
        component: () => import('@/view/organization'),
      }
    ]
  },

]

let router = new Router({
  routes: statciRoutes.concat(syncRoutes),
});


// 更新用户信息
function setUser() {
  let user = localStorage.getItem('lifesense_medical_user');
  store.commit('SET_USER', user);
}

const filterRoutes = (roles) => {
  let role = ''
  switch (roles) {
    case 1:
      role = 'organManager';
      break;
    case 2:
      role = 'teamManager';
      break;
    case 3:
      role = 'doctorManager';
      break;
    case 4:
      role = 'patientManager';
      break;
  }
  syncRoutes = syncRoutes.filter(item => {
    if (item.meta.roles) {
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
  // if (to.path === '/') {

  // }
  // login页面意外的路由
  // if (to.name !== 'login') {
  //   //检查用户是否登录
  //   let user = localStorage.getItem('lifesense_medical_user')
  //   let syncRoutes = localStorage.getItem('syncRoutes')
  //   if (user) {
  //     setUser();
  //     if (!syncRoutes) {
  //       const { roles } = JSON.parse(user)
  //       let accessRoutes = filterRoutes(roles)
  //       console.log(accessRoutes)
  //       router.addRoutes(accessRoutes)
  //       localStorage.setItem('syncRoutes',true)
  //     }
  //     next();
  //   } else {
  //     next({
  //       path: '/login',
  //       query: { redirect: to.fullPath }
  //     });
  //   }
  // } else {
    next()
  // }

});


export default router
