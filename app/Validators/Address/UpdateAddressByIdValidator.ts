import { schema, rules } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UpdateAddressByIdValidator {
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
    params: schema.object().members({
      id: schema.string(
        {
          trim: true,
        },
        [rules.required(), rules.uuid()]
      ),
    }),
    street: schema.string.optional({}, [
      rules.minLength(5),
      rules.maxLength(50),
    ]),
    neighborhood: schema.string.optional({}, [
      rules.minLength(5),
      rules.maxLength(50),
    ]),
    state: schema.string.optional({}, [
      rules.minLength(5),
      rules.maxLength(50),
    ]),
    country: schema.string.optional({}, [
      rules.minLength(5),
      rules.maxLength(50),
    ]),
    complement: schema.string.optional({}, [rules.maxLength(50)]),
    zip_code: schema.string.optional({
      trim: true,
    }),
  });

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {};
}
