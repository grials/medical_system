export const userQueryListValidationData = {
  $id: 'http://example.com/schemas/userQueryListValidationData.json',
  definitions: {
    userQueryListValidationData: {
      $ref: '#',
    },
  },
  title: 'User query list Validation',
  description: 'User query list Validation',
  type: 'object',
  properties: {
    filter: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        type: { type: 'string' },
        email: { type: 'string' },
      },
      required: [],
      additionalProperties: false,
    },
    select: {
      type: 'object',
      properties: {
        username: { enum: [1, 0] },
        type: { enum: [1, 0] },
        email: { enum: [1, 0] },
      },
      required: [],
      additionalProperties: false,
    },
    limit: { type: 'number' },
    skip: { type: 'number' },
    sort: {
      type: 'object',
      properties: {
        username: { enum: [1, -1] },
        type: { enum: [1, -1] },
        email: { enum: [1, -1] },
      },
      required: [],
      additionalProperties: false,
    },
  },
  required: [],
  additionalProperties: false,
};
