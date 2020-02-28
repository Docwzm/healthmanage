import * as types from './mutation-types'

const mutations = {
  // 登录成功设置登录信息
  [types.SET_USERNAME](state, userName) {
    state.userName = userName
  },
  // 设置头像
  [types.SET_AVATAR](state, avatar) {
    state.avatar = avatar
  },
  // 设置左侧栏目高亮
  [types.SET_SECTION](state, section) {
    state.section = [section]
  },
  // 设置头部面包屑导航菜单
  [types.SET_MENU](state, menu) {
    state.menu = menu
  },
  // 设置登录
  [types.SET_LOGIN](state, status) {
    state.isLogin = status
  },
};

export default mutations
