import axios from 'axios'
import tmdbConfig from 'Config/tmdb'
import { IMovie, IMovieDetails } from 'Services/tmdb/interfaces'
import TmdbRequestException from 'App/Exceptions/TmdbRequestException'

class TmdbMovieService {
  protected config: typeof tmdbConfig

  constructor(config: typeof tmdbConfig) {
    this.config = config
  }

  // Get the original TMDB image path
  private getPosterImagePath(imageId: string): string {
    const { basePathImage } = this.config.basePath

    return basePathImage.poster + imageId
  }

  // Get the backdrop TMDB image path
  private getBackDropPath(imageId: string): string {
    const { basePathImage } = this.config.basePath

    return basePathImage.backdrop + imageId
  }

  // Parse result as IMovie type
  private parseResult(data: any): IMovie[] {
    return data.results.map(
      (item) =>
        <IMovie>{
          tmdb_movie_id: item.id,
          title: item.title,
          poster_url: this.getPosterImagePath(item.poster_path),
        }
    )
  }

  // Get a list of the current popular movies on TMDB
  public async getNowPlayingMovie(page: number): Promise<IMovie[]> {
    const basePathApi = this.config.basePath.api
    const { apiKey } = this.config

    try {
      const { data } = await axios.get(
        `${basePathApi}/movie/now_playing?api_key=${apiKey}&page=${page}`
      )

      return this.parseResult(data)
    } catch ({ response }) {
      throw new TmdbRequestException(response.data.status_message, response.status, 'E_TMDB_API')
    }
  }

  // Search for movies
  public async searchMovie(query: string, page: string): Promise<IMovie[]> {
    const basePathApi = this.config.basePath.api
    const { apiKey } = this.config

    try {
      const { data } = await axios.get(
        `${basePathApi}/search/movie?api_key=${apiKey}&query=${query}&page=${page}`
      )

      return this.parseResult(data)
    } catch ({ response }) {
      throw new TmdbRequestException(response.data.status_message, response.status, 'E_TMDB_API')
    }
  }

  // Get the primary information about a movie
  public async getMovieDetails(tmdbMovieId: number): Promise<IMovieDetails> {
    const basePathApi = this.config.basePath.api
    const { youtubeEmbed } = this.config.basePath
    const { apiKey } = this.config
    let trailerUrl = ''

    try {
      const { data: movieData } = await axios.get(
        `${basePathApi}/movie/${tmdbMovieId}?api_key=${apiKey}`
      )
      const { data: videoData } = await axios.get(
        `${basePathApi}/movie/${tmdbMovieId}/videos?api_key=${apiKey}`
      )

      const movieTrailer = videoData.results.find((movie) => movie.type === 'Trailer')

      if (movieTrailer !== undefined) {
        trailerUrl = youtubeEmbed + movieTrailer.key
      }

      return {
        tmdb_movie_id: movieData.id,
        title: movieData.original_title,
        overview: movieData.overview,
        poster_url: this.getPosterImagePath(movieData.poster_path),
        backdrop_url: this.getBackDropPath(movieData.backdrop_path),
        trailer_url: trailerUrl,
      }
    } catch ({ response }) {
      throw new TmdbRequestException(response.data.status_message, response.status, 'E_TMDB_API')
    }
  }
}

export default TmdbMovieService
