import axios, { AxiosError, AxiosInstance } from 'axios'
import { useToast } from 'vue-toastification'

interface IErrorResponse {
  message: string
  status: number
  errorCode: string
}

interface IResponse<T> {
  message: string
  status: string
  results: T
}

export default class Http {
  private instance: AxiosInstance

  private API_IP = import.meta.env.VITE_API_IP

  private API_PORT = import.meta.env.VITE_API_PORT

  private toast = useToast()

  constructor(basePath: string) {
    this.instance = axios.create({
      baseURL: `http://${this.API_IP}:${this.API_PORT}/api${basePath}`,
    })
  }

  private handleError({ response, message }: AxiosError) {
    if (response) {
      const errorData = response.data

      if (errorData) {
        const error = <IErrorResponse>errorData
        this.toast.info(error.message)
        return
      }

      this.toast.error(message)
    }
  }

  public async post<T>(url: string, body: any): Promise<IResponse<T>> {
    try {
      const { data } = await this.instance.post<IResponse<T>>(url, body)
      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        this.handleError(error)
      } else {
        this.toast.error('An unexpected error occurred')
      }

      throw new Error()
    }
  }
}
