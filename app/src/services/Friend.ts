import useAuth from '@/stores/authStore'
import HttpController from '@/controllers/Http'
import { IFriendUser } from '@/types'

export async function getFriends(page: number = 1, limit: number = 8) {
  const auth = useAuth()
  const httpController = new HttpController(`/users/${auth.userId}`)

  const { results } = await httpController.get<IFriendUser[]>(`/friends?page=${page}&limit=${limit}`, { Authorization: `Bearer ${auth.token}` })

  return results
}

export async function addFriend(friendEmail: { friend_email: string }) {
  const auth = useAuth()
  const httpController = new HttpController(`/users/${auth.userId}`)

  const { message } = await httpController.post('/friends', friendEmail, { Authorization: `Bearer ${auth.token}` })

  return message
}

export async function removeFriend(friendId: number) {
  const auth = useAuth()
  const httpController = new HttpController(`/users/${auth.userId}`)

  const { message } = await httpController.delete(`/friends/${friendId}`, { Authorization: `Bearer ${auth.token}` })

  return message
}
