import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import {authCheck} from '../api/login'

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path:'/organs',
      name: 'organs',
      component: () => import('@/view/homepage'),
      meta: {
        title:'机构管理',
        keepAlive: true,// 是否显示侧边栏和头部
        section: 'home',
        menu:[{ // 顶部导航内容
          name: "数据首页",
          path: "/home"
        }]
      },
    },
    {
      path: '/teams',
      name: 'teams',
      component: () => import('@/view/healthanalysis'),
      meta: {
        title:'团队管理',
        parentBreadCrumb:'organs',
        keepAlive: true,
        section: "healthanalysis",
        menu:[{
          name: "健康分析",
          path: "/healthanalysis"
        }]
      }
    },
    {
      path: '/organization',
      name: 'organization',
      component: () => import('@/view/organization'),
      meta: {
        keepAlive: true,
        section: 'organization',
        menu:[{
          name: "组织机构",
          path: "/organization"
        }]
      }
    },
    //组织成员
    {
      path: '/organizationmember',
      name: 'organizationmember',
      component: () => import('@/view/organizationmember'),
      meta: {
        keepAlive: true,
        section: 'organizationmember',
        menu:[{
          name: "组织成员",
          path: "/organizationmember"
        }]
      }
    },
    // 预警处理
    {
      path: '/dealwarn',
      name: 'dealwarn',
      component: () => import('@/view/dealwarn'),
      meta: {
        keepAlive: true,
        section: 'dealwarn',
        menu:[{
          name: "预警处理",
          path: "/dealwarn"
        }]
      },
    },
    // 预警配置
    {
      path: '/warnconfig',
      name: 'warnconfig',
      component: () => import('@/view/warnconfig'),
      meta: {
        keepAlive: true,
        section: 'warnconfig',
        menu:[{
          name: "预警设置",
          path: "/warnconfig"
        }]
      }
    },
    // 设备管理
    {
      path: '/equipmentmanage',
      name: 'equipmentmanage',
      component: () => import('@/view/equipmentmanage'),
      meta: {
        keepAlive: true,
        section: 'equipmentmanage',
        menu:[{
          name: "设备管理",
          path: "/equipmentmanage"
        }]
      }
    },
    {
      path: '/login',
      component: () => import('@/view/login'),
      name:'login'
    },
    {
      path: '/dashboard',
      component: () => import('@/view/dashboard'),
      name:'dashboard'
    }
  ],
});

// 更新用户信息
function setUser(to) {
  let userName = localStorage.getItem('ls_userName');
  let headImg = localStorage.getItem('ls_headImg');
  store.commit('SET_USERNAME',userName);
  store.commit('SET_AVATAR',headImg);
  // 提交侧边栏的默认高亮部分
  store.commit('SET_SECTION',to.meta.section);
  // 头部导航更新内容
  // store.commit('SET_MENU',to.meta.menu);
}

// router.beforeEach((to, from, next) => {
//   // login页面意外的路由
//   if(to.name!=='login'){
//     //检查用户是否登录
//     if(store.getters.isLogin) {
//       setUser(to);
//       next();
//     } else {
//       authCheck().then(res => {
//         // 返回ture, 接着往下走
//         if(res){
//           setUser(to);
//           store.commit('SET_LOGIN',true);
//           next();
//         }else{
//           // 未登录, 跳转到登录页面
//           next({
//             path: '/login',
//             query: {redirect: to.fullPath}
//           });
//           return
//         }
//       });
//     }

//   }else{
//     next()
//   }
// });


export default router
