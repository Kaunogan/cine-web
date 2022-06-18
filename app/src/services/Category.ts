import HttpController from '@/controllers/Http'
import useAuth from '@/stores/authStore'
import { ICategory, IMovie } from '@/types'

export async function getAllCategories() {
  const auth = useAuth()
  const httpController = new HttpController(`/users/${auth.userId}`)

  const { results } = await httpController.get<ICategory.ShortDetails[]>('/categories', { Authorization: `Bearer ${auth.token}` })

  return results
}

export async function getCategories(page: number = 1, limit: number = 12) {
  const auth = useAuth()
  const httpController = new HttpController(`/users/${auth.userId}`)

  const { results } = await httpController.get<ICategory.ShortDetails[]>(`/categories?page=${page}&limit=${limit}`, { Authorization: `Bearer ${auth.token}` })

  return results
}

export async function getCategory(id: number) {
  const auth = useAuth()
  const httpController = new HttpController(`/users/${auth.userId}`)

  const { results } = await httpController.get<ICategory.Details>(`/categories/${id}`, { Authorization: `Bearer ${auth.token}` })

  return results
}

export async function addCategory(category: { name: string }) {
  const auth = useAuth()
  const httpController = new HttpController(`/users/${auth.userId}`)

  const { message } = await httpController.post('/categories', category, { Authorization: `Bearer ${auth.token}` })

  return message
}

export async function addMovieInCategory(categoryId: number, tmdbMovie: IMovie.ShortDetails) {
  const auth = useAuth()
  const httpController = new HttpController(`/users/${auth.userId}`)

  const { message } = await httpController.post(`/categories/${categoryId}/movies`, tmdbMovie, { Authorization: `Bearer ${auth.token}` })

  return message
}
