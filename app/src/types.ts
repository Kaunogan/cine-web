/* eslint no-unused-vars: 0 */

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
  export interface LoginBody {
    email: string
    password: string
  }

  export interface RegisterBody {
    email: string
    pseudo: string
    password: string
  }

  export interface AuthResponse {
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
    title: string
    poster_url: string
    tmdb_movie_id: number
  }
}
