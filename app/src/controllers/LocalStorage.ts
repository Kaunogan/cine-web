import useAuth from '@/stores/authStore'
import useUser from '@/stores/userStore'

export function clearApplication(): Promise<void> {
  return new Promise((resolve) => {
    const auth = useAuth()
    const user = useUser()

    auth.$reset()
    user.$reset()

    localStorage.clear()

    resolve()
  })
}
