import { describe, it, expect } from 'vitest'
import criarErro from '../src/utils/criarErro.js'

describe('criarErro', () => {
  it('cria um erro com mensagem e status', () => {
    const erro = criarErro('Email já cadastrado.', 409)

    expect(erro.message).toBe('Email já cadastrado.')
    expect(erro.status).toBe(409)
    expect(erro).toBeInstanceOf(Error)
  })
})
