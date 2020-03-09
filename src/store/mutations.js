import * as types from './mutation-types'
const mutations = {
  // 登录成功设置登录信息
  [types.SET_USER](state, user) {
    state.user = user
  },
  // 设置菜单栏导航
  [types.SET_MENU](state, { routes, menu }) {
    console.log('routes', routes)
    console.log('menu', menu)
    let func = (routes, menu) => {
      let _route = routes.filter(route => {
        let findMenu = menu.find(item => {
          if (route.meta) {
            if(typeof route.meta.key === 'object'){
              console.log(route.meta.key)
              return route.meta.key.includes(item.key)
            }else {
              return item.key === route.meta.key
            }
          }
        })
        console.log(findMenu)

        if (!findMenu) {
          return false;
        } else {
          if (findMenu.children) {
            route.children = func(route.children, findMenu.children);
          } else {
            route.children = [];
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
