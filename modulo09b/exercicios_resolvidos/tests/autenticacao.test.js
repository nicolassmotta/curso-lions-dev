import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../src/app.js'

describe('GET /api/usuarios/perfil sem token válido', () => {
  it('sem token responde 401', async () => {
    const res = await request(app).get('/api/usuarios/perfil')

    expect(res.status).toBe(401)
    expect(res.body.message).toBe('Token não informado.')
  })

  it('sem a palavra Bearer responde 401', async () => {
    const res = await request(app)
      .get('/api/usuarios/perfil')
      .set('Authorization', 'abc123')

    expect(res.status).toBe(401)
  })

  it('token falso responde 401', async () => {
    const res = await request(app)
      .get('/api/usuarios/perfil')
      .set('Authorization', 'Bearer abc.def.ghi')

    expect(res.status).toBe(401)
    expect(res.body.message).toBe('Token inválido ou expirado.')
  })
})
