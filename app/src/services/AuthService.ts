import HttpController from '@/controllers/Http'
import useAuth from '@/stores/authStore'
import * as UserService from '@/services/UserService'
import * as LocalStorageController from '@/controllers/LocalStorage'

interface ILoginBody {
  email: string
  password: string
}

interface IRegisterBody {
  email: string
  pseudo: string
  password: string
}

interface IAuthResponse {
  token: string
  userId: number
  expiresAt: string
}

export async function login(loginBody: ILoginBody) {
  const httpController = new HttpController('/auth')
  const auth = useAuth()

  const { results } = await httpController.post<IAuthResponse>('/login', loginBody)

  auth.token = results.token
  auth.userId = results.userId
  auth.expireAt = results.expiresAt

  await UserService.getUserPseudo()
}

export async function register(registerBody: IRegisterBody) {
  const httpController = new HttpController('/auth')
  const auth = useAuth()

  const { results } = await httpController.post<IAuthResponse>('/register', registerBody)

  auth.token = results.token
  auth.userId = results.userId
  auth.expireAt = results.expiresAt

  await UserService.getUserPseudo()
}

export async function logout() {
  const httpController = new HttpController('/auth')
  const auth = useAuth()

  await httpController.post('/logout', {}, { Authorization: `Bearer ${auth.token}` })

  LocalStorageController.clearStoresApplication()
}
