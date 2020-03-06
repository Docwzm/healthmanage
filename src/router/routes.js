export const constantRouterMap = [
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


export let syncRouterMap = [
    {
        path: '/organs',
        meta:{
            permissions: ['rpm_org_manage'],
        },
        component: () => import('@/view/layout'),
        children: [
            {
                path: '',
                name:'rpm_org_manage',
                meta: {
                    permissions: ['rpm_org_manage'],
                    title: '机构管理',
                    keepAlive: true,
                    menu: {
                        icon: () => import('@/assets/img/sider/organization.svg')
                    },
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
            }
        ]
    },
    { path: '*', redirect: '/404' }
]