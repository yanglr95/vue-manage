import { loginByUsername, logout, getUserInfo } from '@/api/login'
// import { logout, getUserInfo } from '@/api/login'
import { getUserBankInfo, userRecharge, userWithdraw, sendSmsCode, updateSetting, getCallBack, updateResultData } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    mobile: '',
    avatar: '',
    introduction: '',
    roles: '',
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_MOBILE: (state, mobile) => {
      state.mobile = mobile
      state.name = mobile
    },
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const mobile = userInfo.mobile.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(mobile, userInfo.password).then(res => {
          const token = 1
          commit('SET_MOBILE', mobile)
          commit('SET_USER', mobile)
          commit('SET_TOKEN', token)
          // commit('SET_ROLES', mobile)
          setToken(token)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          commit('SET_MOBILE', response.mobile)
          commit('SET_USER', response.mobile)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetUserBankInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserBankInfo().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    UserRecharge({ commit }, value) {
      return new Promise((resolve, reject) => {
        userRecharge(value).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    UserWithdraw({ commit }, value) {
      return new Promise((resolve, reject) => {
        userWithdraw(value).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    SendSmsCode({ commit }, value) {
      return new Promise((resolve, reject) => {
        sendSmsCode(value).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    updateUserSetting({ commit }, value) {
      return new Promise((resolve, reject) => {
        updateSetting(value).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    getCallBackResult({ commit }) {
      return new Promise((resolve, reject) => {
        getCallBack().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    updateResult({ commit }) {
      return new Promise((resolve, reject) => {
        updateResultData()
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', '')
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    }
  }
}

export default user
