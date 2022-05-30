import Env from '@ioc:Adonis/Core/Env'

const tmdbConfig = {
  apiKey: Env.get('TMDB_API_KEY'),
  basePath: 'https://api.themoviedb.org/3',
}

export default tmdbConfig
