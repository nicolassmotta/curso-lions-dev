// Documentação da API no padrão OpenAPI 3 (lida pelo Swagger UI em /api/docs)
const erro = (exemplo) => ({
  content: { 'application/json': { schema: { $ref: '#/components/schemas/Erro' }, example: { message: exemplo } } },
})

const openapi = {
  openapi: '3.0.3',
  info: {
    title: 'API Boilerplate Lions Dev',
    version: '1.0.0',
    description: 'Cadastro, login com JWT e perfil do usuário.',
  },
  servers: [{ url: 'http://localhost:3000' }],
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    },
    schemas: {
      Usuario: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '66f1c2a9e4b0a1b2c3d4e5f6' },
          nome: { type: 'string', example: 'Ana' },
          email: { type: 'string', example: 'ana@email.com' },
        },
      },
      Erro: {
        type: 'object',
        properties: { message: { type: 'string' } },
      },
    },
  },
  paths: {
    '/api/auth/cadastro': {
      post: {
        tags: ['Auth'],
        summary: 'Cadastra um usuário e devolve o token',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['nome', 'email', 'senha'],
                properties: {
                  nome: { type: 'string', example: 'Ana' },
                  email: { type: 'string', example: 'ana@email.com' },
                  senha: { type: 'string', minLength: 6, example: '123456' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Usuário criado' },
          400: { description: 'Campo faltando ou senha curta', ...erro("O campo 'nome' é obrigatório.") },
          409: { description: 'Email já cadastrado', ...erro('Email já cadastrado.') },
        },
      },
    },
    '/api/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Faz login e devolve o token',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'senha'],
                properties: {
                  email: { type: 'string', example: 'ana@email.com' },
                  senha: { type: 'string', example: '123456' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Login feito' },
          400: { description: 'Campo faltando', ...erro("O campo 'email' é obrigatório.") },
          401: { description: 'Email ou senha errados', ...erro('Email ou senha incorretos.') },
        },
      },
    },
    '/api/usuarios/perfil': {
      get: {
        tags: ['Usuários'],
        summary: 'Mostra o usuário do token',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Usuário logado',
            content: {
              'application/json': {
                schema: { type: 'object', properties: { usuario: { $ref: '#/components/schemas/Usuario' } } },
              },
            },
          },
          401: { description: 'Sem token ou token inválido', ...erro('Token não informado.') },
        },
      },
    },
  },
}

export default openapi
