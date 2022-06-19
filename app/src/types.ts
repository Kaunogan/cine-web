/* eslint no-unused-vars: 0 */

/*
|--------------------------------------------------------------------------
| Http Interface
|--------------------------------------------------------------------------
|
| Http Interface contains the details information of the api response
|
*/
export declare module IHttp {
  interface Error {
    message: string
    status: number
    errorCode: string
  }

  interface Response<T> {
    message: string
    status: string
    results: T
  }
}

/*
|--------------------------------------------------------------------------
| Authentication Interface
|--------------------------------------------------------------------------
|
| Authentication Interface contains the details information of the
| authenticated user
|
*/
export declare module IAuth {
  interface LoginBody {
    email: string
    password: string
  }

  interface RegisterBody {
    email: string
    pseudo: string
    password: string
  }

  interface AuthResponse {
    token: string
    userId: number
    expiresAt: string
  }
}

/*
|--------------------------------------------------------------------------
| User Interface
|--------------------------------------------------------------------------
|
| User Interface contains the details information of the user
|
*/
export declare module IUser {
  interface UserInfoResponse {
    id: number
    email: string
    pseudo: string
    created_at: string
    updated_at: string
  }
}

/*
|--------------------------------------------------------------------------
| Movie Interface
|--------------------------------------------------------------------------
|
| Movie Interface contains the details information of the movies
|
*/
export declare module IMovie {
  interface ShortDetails {
    id: number
    title: string
    poster_url: string
    tmdb_movie_id: number
  }

  interface Details {
    tmdb_movie_id: number
    title: string
    overview: string
    poster_url: string
    backdrop_url: string
    trailer_url: string
  }
}

/*
|--------------------------------------------------------------------------
| Category Interface
|--------------------------------------------------------------------------
|
| Category Interface contains the details information of the category
|
*/
export declare module ICategory {
  interface ShortDetails {
    id: number
    name: string
  }

  interface Details {
    id: number
    name: string
    shared_id: string
    created_at: string
    updated_at: string
    visibility: {
      id: number
      type: string
    }
    movies: {
      id: number
      title: string
      poster_url: string
      tmdb_movie_id: number
      created_at: string
    }[]
  }
}
