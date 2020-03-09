import * as types from './mutation-types'
const mutations = {
  // 登录成功设置登录信息
  [types.SET_USER](state, user) {
    state.user = user
  },
  // 设置菜单栏导航
  [types.SET_MENU](state, { routes, menu }) {
    let func = (routes, menu) => {
      let _route = routes.filter((route,index) => {
        let findMenu = menu.find(item => {
          if (route.meta) {
            if(typeof route.meta.key === 'object'){
              console.log(route.meta.key)
              return route.meta.key.includes(item.pageCode)
            }else {
              return item.pageCode === route.meta.key
            }
          }
        })
        
        if (!findMenu) {
          return false;
        } else {
          route.meta.title = findMenu.pageName?findMenu.pageName:route.meta.title
          if (findMenu.children) {
            route.children = func(route.children, findMenu.children);
          }
        }

        return true;
      });

      return _route;
    };

    state.menu = func(routes, menu);
    console.log('state.menu', state.menu)
  },
  // 设置路由
  [types.SET_ROUTES](state, routes) {
    state.routes = routes
  }
};

export default mutations
