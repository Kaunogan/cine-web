import Http from '@/services/Http'

interface ILoginBody {
  email: string
  password: string
}

interface ILoginResponse {
  token: string
  userId: number
  expiresAt: string
}

export async function login(loginBody: ILoginBody) {
  const http = new Http('/auth')

  const { results } = await http.post<ILoginResponse>('/login', loginBody)

  console.log(results.token)
}

export async function register() {
  console.log('regsiter')
}
