import HttpController from '@/controllers/Http'
import useAuth from '@/stores/authStore'
import * as UserService from '@/services/User'
import * as LocalStorageController from '@/controllers/LocalStorage'
import router from '@/router'
import { IAuth } from '@/types'

export async function login(loginBody: IAuth.LoginBody) {
  const httpController = new HttpController('/auth')
  const auth = useAuth()

  const { results } = await httpController.post<IAuth.AuthResponse>('/login', loginBody)

  auth.token = results.token
  auth.userId = results.userId
  auth.expireAt = results.expiresAt

  await UserService.getUserPseudo()
}

export async function register(registerBody: IAuth.RegisterBody) {
  const httpController = new HttpController('/auth')
  const auth = useAuth()

  const { results } = await httpController.post<IAuth.AuthResponse>('/register', registerBody)

  auth.token = results.token
  auth.userId = results.userId
  auth.expireAt = results.expiresAt

  await UserService.getUserPseudo()
}

export async function logout() {
  const httpController = new HttpController('/auth')
  const auth = useAuth()

  await httpController.post('/logout', {}, { Authorization: `Bearer ${auth.token}` })

  await LocalStorageController.clearApplication()

  await router.push({ path: '/signin' })
}
