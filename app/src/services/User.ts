import useAuth from '@/stores/authStore'
import useUser from '@/stores/userStore'
import HttpController from '@/controllers/Http'

interface IUserInfoResponse {
  id: number
  email: string
  pseudo: string
  created_at: string
  updated_at: string
}

export async function getUserPseudo() {
  const httpController = new HttpController('/users')
  const auth = useAuth()
  const user = useUser()

  const { results } = await httpController.get<IUserInfoResponse>(`/${auth.userId}`, { Authorization: `Bearer ${auth.token}` })

  user.pseudo = results.pseudo
}
