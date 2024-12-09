export const practitionerUserQueryListValidationData = {
  $id: 'http://example.com/schemas/practitionerUserQueryListValidationData.json',
  definitions: {
    practitionerUserQueryListValidationData: {
      $ref: '#',
    },
  },
  title: 'Practitioner user query list Validation',
  description: 'Practitioner user query list Validation',
  type: 'object',
  properties: {
    filter: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        type: { type: 'string' },
        email: { type: 'string' },
        identification: { type: 'string' },
        birthdate: {
          anyOf: [
            {
              type: 'object',
              isDate: true,
            },
            {
              type: 'string',
              format: 'date-time',
            },
          ],
        },
        name: { type: 'string' },
        lastname: { type: 'string' },
      },
      required: [],
      additionalProperties: false,
    },
    select: {
      type: 'object',
      properties: {
        type: { enum: [1, 0] },
        name: { enum: [1, 0] },
        email: { enum: [1, 0] },
        profile: { enum: [1, 0] },
        telecom: { enum: [1, 0] },
        username: { enum: [1, 0] },
        birthdate: { enum: [1, 0] },
        identification: { enum: [1, 0] },
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
        birthdate: { enum: [1, -1] },
      },
      required: [],
      additionalProperties: false,
    },
  },
  required: [],
  additionalProperties: false,
};
