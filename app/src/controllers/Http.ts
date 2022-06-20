import axios, { AxiosError, AxiosInstance, AxiosRequestHeaders } from 'axios'
import { useToast } from 'vue-toastification'
import { IHttp } from '@/types'
import router from '@/router'
import * as LocalStorageController from '@/controllers/LocalStorage'

export default class HttpController {
  private instance: AxiosInstance

  private API_IP = import.meta.env.VITE_API_IP

  private API_PORT = import.meta.env.VITE_API_PORT

  private toast = useToast()

  constructor(basePath: string) {
    this.instance = axios.create({
      baseURL: `http://${this.API_IP}:${this.API_PORT}/api${basePath}`,
    })
  }

  private async handleError({ response, message }: AxiosError) {
    if (response) {
      const errorData = response.data

      if (errorData) {
        const error = <IHttp.Error>errorData

        if (error.status === 401) {
          error.message = 'Please signin again'
          await LocalStorageController.clearApplication()
          await router.push({ path: '/signin' })
        }

        if (error.status === 403) {
          await router.push({ path: '/home' })
        }

        if (error.status === 404) {
          error.message = 'Not found'
          await router.push({ path: '/home' })
        }

        this.toast.info(error.message)
        return
      }

      this.toast.error(message)
    }
  }

  public async get<T>(url: string, headers: AxiosRequestHeaders = {}): Promise<IHttp.Response<T>> {
    try {
      const { data } = await this.instance.get<IHttp.Response<T>>(url, { headers })
      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await this.handleError(error)
      } else {
        this.toast.error('An unexpected error occurred')
      }

      throw new Error()
    }
  }

  public async post<T>(url: string, body: any, headers: AxiosRequestHeaders = {}): Promise<IHttp.Response<T>> {
    try {
      const { data } = await this.instance.post<IHttp.Response<T>>(url, body, { headers })
      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await this.handleError(error)
      } else {
        this.toast.error('An unexpected error occurred')
      }

      throw new Error()
    }
  }

  public async put<T>(url: string, body: any, headers: AxiosRequestHeaders = {}): Promise<IHttp.Response<T>> {
    try {
      const { data } = await this.instance.put<IHttp.Response<T>>(url, body, { headers })
      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await this.handleError(error)
      } else {
        this.toast.error('An unexpected error occurred')
      }

      throw new Error()
    }
  }

  public async delete<T>(url: string, headers: AxiosRequestHeaders = {}): Promise<IHttp.Response<T>> {
    try {
      const { data } = await this.instance.delete<IHttp.Response<T>>(url, { headers })
      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        await this.handleError(error)
      } else {
        this.toast.error('An unexpected error occurred')
      }

      throw new Error()
    }
  }
}
