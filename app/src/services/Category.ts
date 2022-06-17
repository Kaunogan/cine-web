import HttpController from '@/controllers/Http'
import useAuth from '@/stores/authStore'
import { ICategory } from '@/types'

export async function getCategories(page: number = 1, limit: number = 12) {
  const auth = useAuth()
  const httpController = new HttpController(`/users/${auth.userId}`)

  const { results } = await httpController.get<ICategory[]>(`/categories?page=${page}&limit=${limit}`, { Authorization: `Bearer ${auth.token}` })

  return results
}

export async function addCategory(category: { name: string }) {
  const auth = useAuth()
  const httpController = new HttpController(`/users/${auth.userId}`)

  await httpController.post('/categories', category, { Authorization: `Bearer ${auth.token}` })
}
