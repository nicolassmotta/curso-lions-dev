import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../src/app.js'

describe('rotas básicas', () => {
  it('GET / responde 200', async () => {
    const res = await request(app).get('/')

    expect(res.status).toBe(200)
    expect(res.body.message).toBe('Boilerplate API MVC está rodando.')
  })

  it('rota que não existe responde 404', async () => {
    const res = await request(app).get('/api/nada')

    expect(res.status).toBe(404)
    expect(res.body).toEqual({ message: 'Rota não encontrada.' })
  })
})
