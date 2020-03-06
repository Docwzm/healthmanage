/**
 * 向后端请求用户的菜单，动态生成路由
 */
import { constantRouterMap, syncRouterMap } from '@/router/routes'

/**
 * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 *
 * @param permission
 * @param route
 * @returns {boolean}
 */
function hasPermission(permission, route) {
  if (route.meta && route.meta.permission) {
    let flag = false
    for (let i = 0, len = permission.length; i < len; i++) {
      flag = route.meta.permission.includes(permission[i])
      if (flag) {
        return true
      }
    }
    return false
  }
  return true
}

function filterAsyncRouter(syncRouterMap, permissionRoutes) {
  // let filterSyncRouterMap = [];
  permissionRoutes.map(route => {
    syncRouterMap = syncRouterMap.filter(item => {
      if (!item.meta || !item.meta.permissions) {
        return true
      }
      if (item.meta.permissions.includes(route.pageCode)) {
        
        if (route.children) {
          filterAsyncRouter(item.children, route.children)
        }
        return true

      } else {
        return false
      }
      return true
    })
  })

  // const accessedRouters = syncRouterMap.filter(item => {

  // })

  // return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, routes) {
      return new Promise(resolve => {
        filterAsyncRouter(syncRouterMap, routes)
        resolve()
      })
    }
  }
}

export default permission
