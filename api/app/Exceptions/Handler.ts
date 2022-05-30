/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExceptionHandler extends HttpExceptionHandler {
  private handledCodes = [
    'E_UNAUTHORIZED_ACCESS',
    'E_AUTHORIZATION_FAILURE',
    'E_ROW_NOT_FOUND',
    'E_ROUTE_NOT_FOUND',
    'E_CONFLICT',
    'E_TMDB_API',
  ]

  constructor() {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract) {
    /**
     * Self handle the validation exception
     */
    const { status } = error
    const errorCode = error.code
    const message = error.message.split(': ')[1]

    const findHandledCode = this.handledCodes.find((code) => code === errorCode)

    if (findHandledCode) {
      return ctx.response.send({
        message,
        status,
        errorCode,
      })
    }

    /**
     * Forward rest of the exceptions to the parent class
     */
    return super.handle(error, ctx)
  }
}
