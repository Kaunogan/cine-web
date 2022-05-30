import axios from 'axios'
import tmdbConfig from 'Config/tmdb'

class TmdbMovieService {
  protected config: typeof tmdbConfig

  constructor(config: typeof tmdbConfig) {
    this.config = config
  }

  public async getPopularMovie(page: number): Promise<any> {
    const { data } = await axios.get(
      `${this.config.basePath}/movie/popular?api_key=${this.config.apiKey}&page=${page}`
    )

    return data
  }
}

export default TmdbMovieService
