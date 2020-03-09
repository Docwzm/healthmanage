import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import { whiteRoutes, asyncRouterMap, constantRouterMap } from './routes'
Vue.use(Router);

let router = new Router({
  routes: constantRouterMap,
});

router.beforeEach((to, from, next) => {
  document.documentElement.scrollLeft = 0;

  if (whiteRoutes.indexOf(to.name) < 0) {
    //检查用户是否登录
    let user = localStorage.getItem('lifesense_medical_token')
    if (user) {
      try {
        if (store.getters.roles.length === 0) {
          store
            .dispatch('GetInfo')
            .then(res => {
              store.dispatch('GenerateRoutes', res).then(() => {
                // 根据roles权限生成可访问的路由表
                // 动态添加可访问路由表
                router.addRoutes(store.getters.addRouters)
                // 请求带有 redirect 重定向时，登录自动重定向到该地址
                const redirect = decodeURIComponent(from.query.redirect || to.path)
                if (to.path === redirect) {
                  // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                  next({ ...to, replace: true })
                } else {
                  // 跳转到目的路由
                  next({ path: redirect })
                }
              })
            })
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
