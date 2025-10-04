// src/swagger.js
const pkg = require('../package.json');

const serverUrl = process.env.SWAGGER_SERVER_URL || 'http://localhost:8081';

const swaggerSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Orchestrator API',
    version: pkg.version || '1.0.0',
    description: 'BFF/Orquestador para MS_guias y backend-cloud-auth',
  },
  servers: [{ url: serverUrl }],
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
    },
    schemas: {
      GuiaIdiomaRequest: {
        type: 'object',
        additionalProperties: true,
        example: { lang: 'es', level: 'C2' }
      },
      GuiaRequest: {
        type: 'object',
        required: ['nombres','apellidos','dni','bio','city','country','certification','languages','correo'],
        properties: {
          nombres: { type: 'string' },
          apellidos: { type: 'string' },
          dni: { type: 'string', minLength: 8, maxLength: 8 },
          bio: { type: 'string' },
          city: { type: 'string' },
          country: { type: 'string' },
          certification: { type: 'boolean' },
          languages: { type: 'array', items: { $ref: '#/components/schemas/GuiaIdiomaRequest' } },
          correo: { type: 'string', format: 'email' }
        }
      },
      GuiaPutRequest: {
        type: 'object',
        properties: {
          bio: { type: 'string' },
          languages: { type: 'array', items: { $ref: '#/components/schemas/GuiaIdiomaRequest' } },
          city: { type: 'string' }
        }
      },
      GuiaResponse: {
        type: 'object',
        properties: {
          id: { type: 'integer', format: 'int64' },
          fullName: { type: 'string' },
          city: { type: 'string' },
          ratingAvg: { type: 'number' },
          languages: { type: 'array', items: { type: 'string' } },
          certification: { type: 'boolean' },
          nextAvailable: { type: 'object', additionalProperties: true },
          hourlyRate: { type: 'object', additionalProperties: true }
        }
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          error: {
            type: 'object',
            properties: {
              message: { type: 'string' },
              code: { type: 'integer' },
              service: { type: 'string' }
            }
          }
        }
      }
    }
  },
  security: [{ bearerAuth: [] }],
  tags: [
    { name: 'Auth', description: 'Autenticación' },
    { name: 'Guides', description: 'Gestión de guías' }
  ],
  paths: {
    '/internal/auth/private': {
      get: {
        tags: ['Auth'],
        summary: 'Valida token contra backend-cloud-auth',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': { description: 'Token válido' },
          '401': { description: 'No autorizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
        }
      }
    },
    '/internal/guides': {
      post: {
        tags: ['Guides'],
        summary: 'Crear guía',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/GuiaRequest' } }
          }
        },
        responses: {
          '201': { description: 'Creado', content: { 'application/json': { schema: { $ref: '#/components/schemas/GuiaResponse' } } } },
          '400': { description: 'Error de validación' }
        }
      }
    },
    '/internal/guides/{id}': {
      get: {
        tags: ['Guides'],
        summary: 'Obtener guía por ID',
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
        ],
        responses: {
          '200': { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/GuiaResponse' } } } },
          '404': { description: 'No encontrado' }
        }
      },
      put: {
        tags: ['Guides'],
        summary: 'Actualizar guía por ID',
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
        ],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/GuiaPutRequest' } } }
        },
        responses: {
          '200': { description: 'Actualizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/GuiaResponse' } } } },
          '400': { description: 'Error de validación' },
          '404': { description: 'No encontrado' }
        }
      }
    },
    '/internal/guides/search': {
      get: {
        tags: ['Guides'],
        summary: 'Buscar guías por filtros',
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'city', in: 'query', schema: { type: 'string' } },
          { name: 'language', in: 'query', schema: { type: 'string' } },
          { name: 'certification', in: 'query', schema: { type: 'boolean' } },
          { name: 'date', in: 'query', schema: { type: 'string', format: 'date' } }
        ],
        responses: {
          '200': {
            description: 'Listado',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/GuiaResponse' } } } }
          }
        }
      }
    }
  }
};

module.exports = swaggerSpec;
