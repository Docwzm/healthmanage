import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import { constantRouterMap } from './routes'
Vue.use(Router);

const whiteRoutes = ['login', 'forget']//路由白名单

//授权路由汇总

let router = new Router({
  routes: constantRouterMap,
});

router.beforeEach((to, from, next) => {
  document.documentElement.scrollLeft = 0;

  if (whiteRoutes.indexOf(to.name) < 0) {
    //检查用户是否登录
    let hasToken = localStorage.getItem('lifesense_medical_token')
    if (hasToken) {
      try {
        // let menu = store.getters.roles.length
        if (store.getters.roles.length === 0) {

          store.dispatch('GetInfo').then(roleRoutes => {
            // const roles = res.result && res.result.role
            store.dispatch('GenerateRoutes', roleRoutes).then(() => { 

            })
          })
          // router.addRoutes(accessRoutes)

          // next({ ...to, replace: true })
        } else {
          // next()
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
