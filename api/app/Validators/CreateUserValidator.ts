import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
    pseudo: schema.string({}, [rules.minLength(3), rules.maxLength(15)]),
    password: schema.string({}, [rules.minLength(5), rules.maxLength(30)]),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *s
   */
  public messages: CustomMessages = {
    'required': 'The {{ field }} is required',
    'unique': '{{ field }} is already used',
    'string': 'The {{ field }} must be a string',
    'email': 'The {{ field }} must be in an email format',
    'pseudo.minLength': '{{ field }} must have minimum of {{ options.minLength }} characters',
    'pseudo.maxLength': '{{ field }} must have maximum of {{ options.maxLength }} characters',
    'password.minLength': '{{ field }} must have minimum of {{ options.minLength }} characters',
    'password.maxLength': '{{ field }} must have maximum of {{ options.maxLength }} characters',
  }
}
