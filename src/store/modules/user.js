import Vue from 'vue'
import { login, getUserMenu, logout } from '@/api/user'
import { ACCESS_TOKEN } from '@/store/mutation-types'

const user = {
  state: {
    token: '',
    name: '',
    avatar: '',
    roles: [],
    info: {}
  },
  
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name }) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const result = response.result
          Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
          commit('SET_TOKEN', result.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        // getUserMenu().then(res => {
          
        // })
        // getInfo().then(response => {
        //   const result = response.result

        //   if (result.role && result.role.permissions.length > 0) {
        //     const role = result.role
        //     role.permissions = result.role.permissions
        //     role.permissions.map(per => {
        //       if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
        //         const action = per.actionEntitySet.map(action => { return action.action })
        //         per.actionList = action
        //       }
        //     })
        //     role.permissionList = role.permissions.map(permission => { return permission.permissionId })
        //     commit('SET_ROLES', result.role)
        //     commit('SET_INFO', result)
        //   } else {
        //     reject(new Error('getInfo: roles must be a non-null array !'))
        //   }

        //   commit('SET_NAME', { name: result.name })
        //   commit('SET_AVATAR', result.avatar)
        let menu = [
          {
            pageCode: 'rpm_org_dashboard',
            pageName: '机构Dashboard'
          },
          {
            pageCode: 'rpm_org_manage',
            pageName: '机构管理'
          },
          {
            pageCode: 'setting',
            pageName: '设置',
            children: [
              {
                pageCode: 'device',
              },
              {
                pageCode: 'organization',
              },
              {
                pageCode: 'update_password',
              }
            ]
          }
        ]
        // menu = [
        //   {
        //     pageCode: 'rpm_depart_dashboard',
        //     pageName: '团队Dashboard'
        //   },
        //   {
        //     pageCode: 'rpm_depart_manage',
        //     pageName: '团队管理'
        //   },
        //   {
        //     pageCode: 'setting',
        //     pageName: '设置',
        //     children: [
        //       {
        //         pageCode: 'device',
        //       },
        //       {
        //         pageCode: 'organization',
        //       },
        //       {
        //         pageCode: 'update_password',
        //       }
        //     ]
        //   }
        // ]
        let permissionList = []
        const func = (menus) => {
          menus.map(item => {
            permissionList.push(item.pageCode)
            if (item.children) {
              func(item.children)
            }
          })
        }

        func(menu)
        let roles = {
          menu,
          permissionList
        }

        commit('SET_ROLES', roles)
        resolve(roles)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 登出
    Logout({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          Vue.ls.remove(ACCESS_TOKEN)
        })
      })
    }

  }
}

export default user
