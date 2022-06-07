import HttpController from '@/controller/Http'

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

  const { results } = await httpController.post<IAuthResponse>('/login', loginBody)

  console.log(results.token)
}

export async function register(registerBody: IRegisterBody) {
  const httpController = new HttpController('/auth')

  const { results } = await httpController.post<IAuthResponse>('/register', registerBody)

  console.log(results)
}
