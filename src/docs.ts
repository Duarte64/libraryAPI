import m2s from 'mongoose-to-swagger';
import swaggerJsdoc from 'swagger-jsdoc';
import { Author } from './modules/authors/models/Author.model';
import { Book } from './modules/books/models/Book.model';
import { Publisher } from './modules/publishers/models/Publisher.model';
import { User } from './modules/users/models/User.model';
  
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'This is a portifolio project for training purposes. It is a REST API for a library management system.',
      contact: {
        name: 'Gabriel Duarte',
        email: 'gabriel.duartepaz@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      schemas: {
        Author: m2s(Author),
        Book: m2s(Book),
        Publisher: m2s(Publisher),
        User: m2s(User, { omitFields: ['password'] }),
        CreateUser: m2s(User, { omitFields: ['_id', 'profilePicture'] }),
      },
    },
    paths: {
      '/authors': {
        get: {
          tags: ['Authors'],
          summary: 'Get all authors',
          responses: {
            200: {
              description: 'Returns the paginated list of authors',
              content: {
                'application/json': {
                  schema: {
                    type: "object",
                    properties: {
                      totalPages: {
                        type: "number",
                        example: 10
                      },
                      currentPage: {
                        type: "number",
                        example: 2
                      },
                      perPage: {
                        type: "number",
                        example: 25
                      },
                      results: {
                        type: "array",
                        items: {
                          $ref: '#/components/schemas/Author',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ['Authors'],
          summary: 'Create a new author',
          consumes: ['multipart/form-data'],
          parameters: [
            {
              in: 'formData',
              name: 'name',
              type: 'string',
              description: 'The name of the author',
            },
            {
              in: 'formData',
              name: 'profilePicture',
              type: 'file',
              description: 'The profile picture of the author',
            },
          ],
          responses: {
            201: {
              description: 'Returns the created author',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Author',
                  },
                },
              },
            },
          },
        }
      },
      '/authors/:id': {
        get: {
          tags: ['Authors'],
          summary: 'Get an author by ID',
          responses: {
            200: {
              description: 'Returns an author',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Author',
                  },
                },
              },
            },
          },
        },
      },
      '/books': {
        get: {
          tags: ['Books'],
          summary: 'Get all books',
          responses: {
            200: {
              description: 'Returns the paginated list of books',
              content: {
                'application/json': {
                  schema: {
                    type: "object",
                    properties: {
                      totalPages: {
                        type: "number",
                        example: 10
                      },
                      currentPage: {
                        type: "number",
                        example: 2
                      },
                      perPage: {
                        type: "number",
                        example: 25
                      },
                      results: {
                        type: "array",
                        items: {
                          $ref: '#/components/schemas/Book',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ['Books'],
          summary: 'Create a new book',
          consumes: ['multipart/form-data'],
          parameters: [
            {
              in: 'formData',
              name: 'name',
              type: 'string',
              description: 'The name of the author',
            },
            {
              in: 'formData',
              name: 'profilePicture',
              type: 'file',
              description: 'The profile picture of the author',
            },
          ],
          responses: {
            201: {
              description: 'Returns the created book',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Book',
                  },
                },
              },
            },
          },
        }
      },
      '/books/:id': {
        get: {
          tags: ['Books'],
          summary: 'Get a Book by ID',
          responses: {
            200: {
              description: 'Returns a book',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Book',
                  },
                },
              },
            },
          },
        },
      },
      '/publishers': {
        get: {
          tags: ['Publishers'],
          summary: 'Get all publishers',
          responses: {
            200: {
              description: 'Returns the paginated list of publishers',
              content: {
                'application/json': {
                  schema: {
                    type: "object",
                    properties: {
                      totalPages: {
                        type: "number",
                        example: 10
                      },
                      currentPage: {
                        type: "number",
                        example: 2
                      },
                      perPage: {
                        type: "number",
                        example: 25
                      },
                      results: {
                        type: "array",
                        items: {
                          $ref: '#/components/schemas/Publisher',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ['Publishers'],
          summary: 'Create a new publisher',
          consumes: ['multipart/form-data'],
          parameters: [
            {
              in: 'formData',
              name: 'name',
              type: 'string',
              description: 'The name of the author',
            },
            {
              in: 'formData',
              name: 'profilePicture',
              type: 'file',
              description: 'The profile picture of the author',
            },
          ],
          responses: {
            201: {
              description: 'Returns the created publisher',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Book',
                  },
                },
              },
            },
          },
        }
      },
      '/publishers/:id': {
        get: {
          tags: ['Publishers'],
          summary: 'Get a Publisher by ID',
          responses: {
            200: {
              description: 'Returns a publisher',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Publisher',
                  },
                },
              },
            },
          },
        },
      },
      '/users': {
        post: {
          tags: ['Users'],
          summary: 'Create a new user',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CreateUser',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Returns the created user',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
          },
        },
      },
      '/users/:id': {
        get: {
          tags: ['Users'],
          summary: 'Get a user by ID',
          responses: {
            200: {
              description: 'Returns a user',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ['Users'],
          summary: 'Delete a user by ID',
          responses: {
            200: {
              description: 'Delete a user by ID',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
          },
        }
      }
    },
  },
  apis: ['./src/routes/*.ts'],
};

const specs = swaggerJsdoc(options);

export default specs;

