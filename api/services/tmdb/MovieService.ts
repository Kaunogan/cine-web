import axios from 'axios'
import tmdbConfig from 'Config/tmdb'
import { IMovie, IMovieDetails } from 'Services/tmdb/interfaces'

class TmdbMovieService {
  protected config: typeof tmdbConfig

  constructor(config: typeof tmdbConfig) {
    this.config = config
  }

  // Get the original TMDB image path
  private getOriginalImagePath(imageId: string): string {
    const { originalImage } = this.config.basePath

    return originalImage + imageId
  }

  // Parse result as IMovie type
  private parseResult(data: any): IMovie[] {
    return data.results.map(
      (item) =>
        <IMovie>{
          tmdbMovieId: item.id,
          title: item.title,
          posterUrl: this.getOriginalImagePath(item.poster_path),
        }
    )
  }

  // Get a list of the current popular movies on TMDB
  public async getPopularMovie(page: number): Promise<IMovie[]> {
    const basePathApi = this.config.basePath.api
    const { apiKey } = this.config

    const { data } = await axios.get(`${basePathApi}/movie/popular?api_key=${apiKey}&page=${page}`)

    return this.parseResult(data)
  }

  // Search for movies
  public async searchMovie(query: string, page: string): Promise<IMovie[]> {
    const basePathApi = this.config.basePath.api
    const { apiKey } = this.config

    const { data } = await axios.get(
      `${basePathApi}/search/movie?api_key=${apiKey}&query=${query}&page=${page}`
    )

    return this.parseResult(data)
  }

  // Get the primary information about a movie
  public async getMovieDetails(tmdbMovieId: number): Promise<IMovieDetails> {
    const basePathApi = this.config.basePath.api
    const { youtubeEmbed } = this.config.basePath
    const { apiKey } = this.config
    let trailerUrl = ''

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
      tmdbMovieId: movieData.id,
      title: movieData.original_title,
      overview: movieData.overview,
      posterUrl: this.getOriginalImagePath(movieData.poster_path),
      backdropUrl: this.getOriginalImagePath(movieData.backdrop_path),
      trailerUrl,
    }
  }
}

export default TmdbMovieService
