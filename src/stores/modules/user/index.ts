import { defineStore } from 'pinia'
import { login as userLogin, getUserInfo, LoginData } from '@/api/auth'
import { setToken, clearToken } from '@/utils/auth'
import { removeRouteListener } from '@/utils/route-listener'
import { UserState } from './types'

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    name: undefined,
    phone: undefined,
    remark: undefined,
    roleId: undefined,
    roleName: undefined,
    departmentId: undefined,
    departmentName: undefined,
    permissions: undefined,
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state }
    },
  },

  actions: {
    // switchRoles() {
    //   return new Promise((resolve) => {
    //     this.role = this.role === 'user' ? 'admin' : 'user';
    //     resolve(this.role);
    //   });
    // },
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial)
    },

    // Reset user's information
    resetInfo() {
      this.$reset()
    },

    // Get user's information
    async info() {
      const res = await getUserInfo()

      this.setInfo(res.data)
    },

    // Login
    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm)
        setToken(res.data.token)
      } catch (err) {
        clearToken()
        throw err
      }
    },

    // Logout
    async logout() {
      // await userLogout();
      this.resetInfo()
      clearToken()
      removeRouteListener()
    },
  },
})

export default useUserStore
