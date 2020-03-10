export const whiteRoutes = ['login', 'forget']//路由白名单

export const routerMap = {
  rpm_org_dashboard: {
    title: '机构dashboard',
    path: '/dashboard',
    icon: () => import('@/assets/svg/dashboard.svg')
  },
  rpm_depart_dashboard: {
    title: '团队dashboard',
    path: '/dashboard',
    icon: () => import('@/assets/svg/dashboard.svg')
  },
  rpm_doctor_dashboard: {
    title: '医生dashboard',
    path: '/dashboard',
    icon: () => import('@/assets/svg/dashboard.svg')
  },
  rpm_org_manage: {
    title: '机构管理',
    path: '/organs',
    icon: () => import('@/assets/svg/organ.svg')
  },
  rpm_depart_manage: {
    title: '团队管理',
    path: '/teams',
    icon: () => import('@/assets/svg/organ.svg'),
    parentBreadCrumb: 'rpm_org_manage'
  },
  rpm_doctor_manage: {
    title: '医生管理',
    path: '/doctors',
    icon: () => import('@/assets/svg/organ.svg'),
    parentBreadCrumb: 'rpm_depart_manage'
  },
  rpm_patient_manage: {
    title: '患者管理',
    path: '/patients',
    icon: () => import('@/assets/svg/organ.svg'),
    parentBreadCrumb: 'rpm_doctor_manage'
  },
  sign_data_manage: {
    title: '体征异常管理',
    path: '/abnormal-patients',
    icon: () => import('@/assets/svg/organ.svg')
  },
  setting: {
    title: '设置',
    path: '/setting',
    icon: () => import('@/assets/svg/setting.svg')
  },
  device: {
    title: '设备管理',
    path: '/device',
    icon: () => import('@/assets/svg/device.svg')
  },
  organization: {
    title: '人员架构',
    path: '/organization',
    icon: () => import('@/assets/svg/organization.svg')
  },
  update_password: {
    title: '修改密码',
    path: '/forget',
    icon: () => import('@/assets/svg/update-password.svg')
  }
}

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
    path: routerMap['rpm_org_dashboard'].path,//机构/团队dashboard
    component: () => import('@/view/dashboard/common'),
    name: 'dashboard',
    meta: {
      permission: ['rpm_org_dashboard', 'rpm_depart_dashboard'],
      title: routerMap['rpm_org_dashboard'].title,
      icon: routerMap['rpm_org_dashboard'].icon
    }
  },
  {
    path: routerMap['rpm_doctor_dashboard'].path,//医生dashboard
    component: () => import('@/view/dashboard/doctor'),
    name: 'rpm_doctor_dashboard',
    meta: {
      permission: ['rpm_doctor_dashboard'],
      title: routerMap['rpm_doctor_dashboard'].title,
      icon: routerMap['rpm_doctor_dashboard'].icon
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/view/home'),
    meta: {
      permission: ['rpm_org_manage', 'rpm_depart_manage', 'rpm_doctor_manage', 'rpm_patient_manage'],
    }
  },
  {
    path: routerMap['rpm_org_manage'].path,
    meta: {
      key:'rpm_org_manage',
      permission: ['rpm_org_manage'],
    },
    component: () => import('@/view/layout'),
    children: [
      {
        path: '',
        name: 'rpm_org_manage',
        meta: {
          parentBreadCrumb:routerMap['rpm_org_manage'].parentBreadCrumb,
          permission: ['rpm_org_manage'],
          title: routerMap['rpm_org_manage'].title,
          icon: routerMap['rpm_org_manage'].icon
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
    path: routerMap['rpm_depart_manage'].path,
    meta: {
      key:'rpm_depart_manage',
      permission: ['rpm_org_manage', 'rpm_depart_manage'],
    },
    component: () => import('@/view/layout'),
    children: [
      {
        path: '',
        name: 'rpm_depart_manage',
        meta: {
          parentBreadCrumb:routerMap['rpm_depart_manage'].parentBreadCrumb,
          permission: ['rpm_org_manage', 'rpm_depart_manage'],
          title: routerMap['rpm_depart_manage'].title,
          icon: routerMap['rpm_depart_manage'].icon
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
    path: routerMap['rpm_doctor_manage'].path,
    meta: {
      key:'rpm_doctor_manage',
      permission: ['rpm_org_manage', 'rpm_depart_manage', 'rpm_doctor_manage'],
    },
    component: () => import('@/view/layout'),
    children: [
      {
        path: '',
        name: 'rpm_doctor_manage',
        meta: {
          parentBreadCrumb:routerMap['rpm_doctor_manage'].parentBreadCrumb,
          title: routerMap['rpm_doctor_manage'].title,
          permission: ['rpm_org_manage', 'rpm_depart_manage', 'rpm_doctor_manage'],
          icon: routerMap['rpm_doctor_manage'].icon
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
    path: routerMap['rpm_patient_manage'].path,
    meta: {
      key:'rpm_patient_manage',
      permission: ['rpm_org_manage', 'rpm_depart_manage', 'rpm_doctor_manage', 'rpm_patient_manage'],
    },
    component: () => import('@/view/layout'),
    children: [
      {
        path: '',
        name: 'rpm_patient_manage',
        meta: {
          parentBreadCrumb:routerMap['rpm_doctor_manage'].parentBreadCrumb,
          title: routerMap['rpm_patient_manage'].title,
          icon: routerMap['rpm_patient_manage'].icon,
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
    path: routerMap['sign_data_manage'].path,
    component: () => import('@/view/layout'),
    meta: {
      permission: ['sign_data_manage']
    },
    children: [
      {
        path: '',
        name: 'sign_data_manage',
        meta: {
          title: routerMap['sign_data_manage'].title,
          permission: ['sign_data_manage'],
          icon: routerMap['sign_data_manage'].icon,
        },
        component: () => import('@/view/patients/abnormal'),
      }
    ]
  },
  {
    path: routerMap['setting'].path,
    component: () => import('@/view/layout'),
    meta: {
      permission: ['setting'],
      title: routerMap['setting'].title,
      icon: routerMap['setting'].icon
    },
    children: [
      {
        path: routerMap['device'].path,
        name: 'device',
        component: () => import('@/view/device'),
        meta: {
          title: routerMap['device'].title,
          icon: routerMap['device'].icon
        }
      },
      {
        path: '/device/edit',
        name: 'deviceEdit',
        component: () => import('@/view/device/edit'),
        meta: {
          title: '设备编辑',
        }
      },
      {
        path: routerMap['organization'].path,
        name: 'organization',
        component: () => import('@/view/organization'),
        meta: {
          permission: ['rpm_org_manage', 'rpm_depart_manage', 'rpm_doctor_manage'],
          title: routerMap['organization'].title,
          icon: routerMap['organization'].icon
        }
      },
      {
        path: routerMap['update_password'].path,
        name: 'update_password',
        component: () => import('@/view/user/forget'),
        meta: {
          title: routerMap['update_password'].title,
          icon: routerMap['update_password'].icon
        }
      }
    ]
  },
  { path: '*', redirect: '/404' }
]