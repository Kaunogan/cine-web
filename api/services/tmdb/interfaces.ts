/*
|--------------------------------------------------------------------------
| Movie Interface
|--------------------------------------------------------------------------
|
| Movie Interface contains the information of the film displayed in the lists
|
| tmdbMovieId : the id of the movie from the TMDB api
| title: the title of the movie
| posterUrl: poster url of the movie
|
*/
interface IMovie {
  tmdb_movie_id: number
  title: string
  poster_url: string
}

/*
|--------------------------------------------------------------------------
| Movie Details Interface
|--------------------------------------------------------------------------
|
| Movie Details Interface contains the details information of the searched movie
|
| tmdbMovieId : the id of the movie from the TMDB api
| title: the title of the movie
| overview: synopsis of the movie
| posterUrl: poster url of the movie
| backdropUrl: background of the movie
| trailerUrl: The youtube embed trailer url
|
*/
interface IMovieDetails {
  tmdb_movie_id: number
  title: string
  overview: string
  poster_url: string
  backdrop_url: string
  trailer_url: string
}

export { IMovie, IMovieDetails }
