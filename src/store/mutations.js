import * as types from './mutation-types'
import {ROLES} from '@/utils/enum'
const mutations = {
  // 登录成功设置登录信息
  [types.SET_USER](state, user) {
    state.user = user
  },
  // 设置菜单栏导航
  [types.SET_MENU](state, menu) {
    state.menu = menu
  },
  // 设置授权路由
  [types.SET_SYNCROUTES](state, syncRoutes) {
    state.syncRoutes = syncRoutes
  }
};

export default mutations
