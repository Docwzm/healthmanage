export const whiteRoutes = ['login', 'forget']//路由白名单

export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/view/user/login'),
    name: 'login'
  },
  {
    path: '/forget',
    component: () => import('@/view/user/forget'),
    name: 'forget'
  },
  {
    path: '/404',
    component: () => import('@/view/error-page/404'),
    hidden: true
  },
  {
    path: '/',
    name: 'index',
    redirect: '/dashboard'
  }
]

export let asyncRouterMap = [
  {
    path: '/dashboard',//机构/团队dashboard
    component: () => import('@/view/dashboard/common'),
    name: 'dashboard',
    meta: {
      permission: ['rpm_org_dashboard', 'rpm_depart_dashboard'],
      title: 'dashboard',
      keepAlive: true,
      menu: {
        icon: () => import('@/assets/svg/dashboard.svg')
      }
    }
  },
  {
    path: '/dashboard',//医生dashboard
    component: () => import('@/view/dashboard/doctor'),
    name: 'doctor_dashboard',
    meta: {
      permission: ['rpm_doctor_dashboard'],
      title: 'dashboard',
      keepAlive: true,
      menu: {
        icon: () => import('@/assets/svg/dashboard.svg')
      }
    }
  },
  {
    path:'/home',
    name:'home',
    component:() => import('@/view/home'),
    meta:{
      permission:['rpm_org_manage', 'rpm_depart_manage', 'rpm_doctor_manage', 'rpm_patient_manage'],
    }
  },
  {
    path: '/organs',
    name: 'rpm_org_manage',
    meta: {
      permission: ['rpm_org_manage'],
      title: '机构管理',
      keepAlive: true,
      menu: {
        icon: () => import('@/assets/svg/organ.svg')
      }
    },
    component: () => import('@/view/layout'),
    children: [
      {
        path: '',
        name: 'rpm_org_manage_index',
        meta: {
          permission: ['rpm_org_manage']
        },
        component: () => import('@/view/organs'),
      },
      {
        path: 'edit',
        name: 'organsEdit',
        meta: {
          permission: ['rpm_org_manage']
        },
        component: () => import('@/view/organs/edit'),
      }
    ]
  },
  {
    path: '/teams',
    name: 'rpm_depart_manage',
    meta: {
      permission: ['rpm_org_manage', 'rpm_depart_manage'],
      title: '团队管理',
      parentBreadCrumb: 'rpm_org_manage',
      keepAlive: true,
      menu: {
        icon: () => import('@/assets/svg/organ.svg')
      }
    },
    component: () => import('@/view/layout'),
    children: [
      {
        path: '',
        name: 'rpm_depart_manage_index',
        meta: {
          permission: ['rpm_org_manage', 'rpm_depart_manage']
        },
        component: () => import('@/view/teams'),
      },
      {
        path: 'edit',
        name: 'teamsEdit',
        meta: {
          permission: ['rpm_org_manage', 'rpm_depart_manage'],
        },
        component: () => import('@/view/teams/edit'),
      }
    ]
  },
  {
    path: '/doctors',
    name: 'rpm_doctor_manage',
    meta: {
      title: '医生管理',
      permission: ['rpm_org_manage', 'rpm_depart_manage', 'rpm_doctor_manage'],
      parentBreadCrumb: 'rpm_depart_manage',
      keepAlive: true,
      menu: {
        icon: () => import('@/assets/svg/organ.svg')
      }
    },
    component: () => import('@/view/layout'),
    children: [
      {
        path: '',
        name: 'rpm_doctor_manage_index',
        meta: {
          permission: ['rpm_org_manage', 'rpm_depart_manage', 'rpm_doctor_manage'],
        },
        component: () => import('@/view/doctors'),
      },
      {
        path: 'edit',
        name: 'doctorsEdit',
        meta: {
          permission: ['rpm_org_manage', 'rpm_depart_manage', 'rpm_doctor_manage'],
        },
        component: () => import('@/view/doctors/edit'),
      }
    ]
  },
  {
    path: '/patients',
    name: 'rpm_patient_manage',
    meta: {
      title: '患者管理',
      permission: ['rpm_org_manage', 'rpm_depart_manage', 'rpm_doctor_manage', 'rpm_patient_manage'],
      parentBreadCrumb: 'rpm_doctor_manage',
      keepAlive: true,
      menu: {
        icon: () => import('@/assets/svg/organ.svg')
      }
    },
    component: () => import('@/view/layout'),
    children: [
      {
        path: '',
        name: 'rpm_patient_manage_index',
        meta: {
          permission: ['rpm_org_manage', 'rpm_depart_manage', 'rpm_doctor_manage', 'rpm_patient_manage'],
        },
        component: () => import('@/view/patients'),
      },
      {
        path: 'edit',
        name: 'patientsEdit',
        meta: {
          permission: ['rpm_org_manage', 'rpm_depart_manage', 'rpm_doctor_manage', 'rpm_patient_manage'],
        },
        component: () => import('@/view/patients/edit'),
      }
    ]
  },
  {
    path: '/abnormal-patients',
    name:'sign_data_manage',
    meta: {
      title: '体征异常管理',
      permission: ['sign_data_manage'],
      keepAlive: true,
      menu: {
        icon: () => import('@/assets/img/sider/organization.svg')
      }
    },
    component: () => import('@/view/layout'),
    children: [
      {
        path: '',
        meta: {
          permission: ['sign_data_manage'],
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
        icon: () => import('@/assets/svg/setting.svg')
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
            icon: () => import('@/assets/svg/device.svg')
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
        path: '/organization',
        name: 'organization',
        component: () => import('@/view/organization'),
        meta: {
          permission: ['rpm_org_manage', 'rpm_depart_manage', 'rpm_doctor_manage'],
          title: '人员架构',
          keepAlive: true,
          menu: {
            icon: () => import('@/assets/svg/organization.svg')
          }
        }
      },
      {
        path: '/forget',
        name: 'updatePassword',
        component: () => import('@/view/user/forget'),
        meta: {
          key: 'updatePassword',
          title: '修改密码',
          keepAlive: true,
          menu: {
            icon: () => import('@/assets/svg/update-password.svg')
          }
        }
      }
    ]
  },
  { path: '*', redirect: '/404' }
]