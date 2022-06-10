import useAuth from '@/stores/authStore'
import useUser from '@/stores/userStore'

export function clearStoresApplication() {
  const auth = useAuth()
  const user = useUser()

  auth.$reset()
  user.$reset()

  localStorage.clear()
}
