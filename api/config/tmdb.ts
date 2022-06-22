import Env from '@ioc:Adonis/Core/Env'

const tmdbConfig = {
  /*
  |--------------------------------------------------------------------------
  | TMDB API Key
  |--------------------------------------------------------------------------
  |
  | The TMDB api key used to communicate with the api
  |
  */
  apiKey: Env.get('TMDB_API_KEY'),

  /*
  |--------------------------------------------------------------------------
  | Base path
  |--------------------------------------------------------------------------
  |
  | The base path of the tmdb api, the original image of the movies and the
  | youtube video trailer
  |
  */
  basePath: {
    api: 'https://api.themoviedb.org/3',
    basePathImage: {
      poster: 'https://image.tmdb.org/t/p/w220_and_h330_face',
      backdrop: 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces',
    },
    youtubeEmbed: 'https://youtube.com/embed/',
  },
}

export default tmdbConfig
