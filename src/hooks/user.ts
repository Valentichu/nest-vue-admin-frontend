import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'

export default function useUser() {
  const router = useRouter()
  const userStore = useUserStore()
  const logout = async (logoutTo?: string) => {
    await userStore.logout()
    router.push({
      name: 'login',
    })
  }
  return {
    logout,
  }
}
