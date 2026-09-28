import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../src/app.js'
import openapi from '../src/docs/openapi.js'

describe('documentação da API', () => {
  it('GET /api/docs/ mostra o Swagger UI', async () => {
    const res = await request(app).get('/api/docs/')

    expect(res.status).toBe(200)
    expect(res.text).toContain('swagger-ui')
  })

  it('GET /api/docs.json devolve a especificação', async () => {
    const res = await request(app).get('/api/docs.json')

    expect(res.status).toBe(200)
    expect(res.body.openapi).toBe('3.0.3')
  })
})

describe('a documentação não pode mentir', () => {
  for (const [rota, metodos] of Object.entries(openapi.paths)) {
    for (const metodo of Object.keys(metodos)) {
      it(`${metodo.toUpperCase()} ${rota} existe`, async () => {
        const res = await request(app)[metodo](rota).send({})

        expect(res.status).not.toBe(404)
      })
    }
  }
})
