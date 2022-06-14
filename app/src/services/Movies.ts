import HttpController from '@/controllers/Http'
import useAuth from '@/stores/authStore'
import { IMovie } from '@/types'

export async function getMovies(query: string = '', page: number = 1): Promise<IMovie.ShortDetails[]> {
  const httpController = new HttpController('/movies')
  const auth = useAuth()

  const { results } = await httpController.get<IMovie.ShortDetails[]>(`?query=${query}&page=${page}`, { Authorization: `Bearer ${auth.token}` })

  return results
}

export async function getMoviesDetails(tmdbMovieId: number): Promise<IMovie.Details> {
  const httpController = new HttpController('/movies')
  const auth = useAuth()

  const { results } = await httpController.get<IMovie.Details>(`/${tmdbMovieId}`, { Authorization: `Bearer ${auth.token}` })

  return results
}
