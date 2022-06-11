import HttpController from '@/controllers/Http'
import useAuth from '@/stores/authStore'

export interface IMovieResponse {
  title: string
  poster_url: string
  tmdb_movie_id: number
}

export async function getMovies(query: string = '', page: number = 1): Promise<IMovieResponse[]> {
  const httpController = new HttpController('/movies')
  const auth = useAuth()

  const { results } = await httpController.get<IMovieResponse[]>(`?query=${query}&page=${page}`, { Authorization: `Bearer ${auth.token}` })

  return results
}
