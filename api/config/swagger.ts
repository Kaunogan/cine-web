import { SwaggerConfig } from '@ioc:Adonis/Addons/Swagger'

const config = {
  /*
  |--------------------------------------------------------------------------
  | uiEnabled
  |--------------------------------------------------------------------------
  |
  | A boolean disable or enable swaggerUi route
  |
  | Setting the value to `true` will enable the swagger ui.
  |
  */
  uiEnabled: true,

  /*
  |--------------------------------------------------------------------------
  | uiUrl
  |--------------------------------------------------------------------------
  |
  | A string to set url path to swaggerUI
  |
  */
  uiUrl: '/api/docs',

  /*
  |--------------------------------------------------------------------------
  | specEnabled
  |--------------------------------------------------------------------------
  |
  | A boolean disable or enable swagger.json route
  |
  | Setting the value to `true` will load the Open API specification
  |
  */
  specEnabled: true,

  /*
  |--------------------------------------------------------------------------
  | specUrl
  |--------------------------------------------------------------------------
  |
  | A boolean disable or enable swagger.json route
  |
  | Setting the value to `true` will load the Open API specification
  |
  */
  specUrl: '/swagger.json',

  /*
  |--------------------------------------------------------------------------
  | middleware
  |--------------------------------------------------------------------------
  |
  | An array of middlewares for protect your swagger docs and spec endpoints
  |
  */
  middleware: [],

  options: {
    definition: {
      /*
      |--------------------------------------------------------------------------
      | openapi
      |--------------------------------------------------------------------------
      |
      | The version of Open API used
      |
      */
      openapi: '3.0.0',

      /*
      |--------------------------------------------------------------------------
      | info
      |--------------------------------------------------------------------------
      |
      | The info about the application
      |
      */
      info: {
        title: 'CineWeb swagger docs',
        version: '1.0.0',
        description: 'My application with swagger docs',
      },
      components: {
        securitySchemes: {
          /*
          |--------------------------------------------------------------------------
          | bearerAuth
          |--------------------------------------------------------------------------
          |
          | The bearer auth used inside the application
          |
          */
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
          },
        },
      },
    },

    /*
    |--------------------------------------------------------------------------
    | apis
    |--------------------------------------------------------------------------
    |
    | Array of files application used for Swagger
    |
    */
    apis: ['app/**/*.ts', 'docs/swagger/**/*.yml', 'start/routes.ts'],

    /*
    |--------------------------------------------------------------------------
    | basePath
    |--------------------------------------------------------------------------
    |
    | The basePath used by Swagger
    |
    */
    basePath: '/',
  },

  /*
  |--------------------------------------------------------------------------
  | mode
  |--------------------------------------------------------------------------
  |
  | The mode used by Swagger depending on NODE_ENV
  |
  */
  mode: process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'RUNTIME',

  /*
  |--------------------------------------------------------------------------
  | specFilePath
  |--------------------------------------------------------------------------
  |
  | The path to the specification file used when is in production
  |
  */
  specFilePath: 'docs/swagger.json',
} as SwaggerConfig

export default config
