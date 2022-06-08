import HttpController from '@/controller/Http'
import useAuth from '@/stores/authStore'

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
  auth.expireAt = results.expiresAt
}

export async function register(registerBody: IRegisterBody) {
  const httpController = new HttpController('/auth')
  const auth = useAuth()

  const { results } = await httpController.post<IAuthResponse>('/register', registerBody)

  auth.token = results.token
  auth.expireAt = results.expiresAt
}
