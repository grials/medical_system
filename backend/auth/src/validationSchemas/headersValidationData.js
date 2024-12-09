export const headersValidationData = {
  $id: 'http://example.com/schemas/headersValidationData.json',
  definitions: {
    headersValidationData: {
      $ref: '#',
    },
  },
  title: 'Headers Validation',
  description: 'Headers Validation',
  type: 'object',
  properties: {
    'accept-language': {
      type: 'string',
      minLength: 2,
    },
    'l-api-version': {
      type: 'string',
      minLength: 2,
    },
  },
  required: [],
  additionalProperties: true,
};
