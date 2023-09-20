export const BookSchema = {
  keyCompression: false,
  version: 0,
  title: 'Bookschema for the web app',
  primaryKey: {
    key: 'id',
    fields: ['title', 'author'],
    separator: ',',
  },
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100,
    },
    title: {
      type: 'string',
    },
    author: {
      type: 'string',
    },
    pages: {
      type: 'number',
    },
    imageUrl: {
      type: 'string',
    },
    pubblicationDate: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
  },
  required: ['id', 'title', 'author'],
};
