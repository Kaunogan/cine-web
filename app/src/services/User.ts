import useAuth from '@/stores/authStore'
import useUser from '@/stores/userStore'
import HttpController from '@/controllers/Http'
import { IUser } from '@/types'

export async function getUserPseudo() {
  const httpController = new HttpController('/users')
  const auth = useAuth()
  const user = useUser()

  const { results } = await httpController.get<IUser.UserInfoResponse>(`/${auth.userId}`, { Authorization: `Bearer ${auth.token}` })

  user.pseudo = results.pseudo
}
