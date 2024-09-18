export const loginSchemaValidator = {
  $id: 'http://example.com/schemas/loginSchemaValidator.json',
  definitions: {
    loginSchemaValidator: {
      $ref: '#',
    },
  },
  title: 'Login Schema Validation',
  description: 'Login Schema Validation',
  type: 'object',
  properties: {
    password: {
      type: 'string',
      minLength: 2,
    },
    user: {
      type: 'string',
      minLength: 2,
    },
  },
  required: ['password', 'user'],
  additionalProperties: false,
};
