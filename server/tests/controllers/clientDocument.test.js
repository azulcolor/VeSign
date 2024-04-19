import request from 'supertest'
import app from '../../index.js'
import { pool } from '../../database/config.js'
import { sign } from '../variables.js'

const api = request(app)

beforeAll(async () => {
  await pool.getConnection()
})

afterAll(async () => {
  await pool.end()
})

describe('PATCH /clientDocument/sign', () => {
  describe('is given a valid document', () => {
    test('should respond with a 204 status code', async () => {
      const { statusCode } = await api
        .patch(`/api/clientDocument/sign`)
        .send(sign)
      expect(statusCode).toBe(204)
    })
  })
  describe('is given an invalid document', () => {
    test('should respond with a 500 status code', async () => {
      const { statusCode } = await api
        .patch(`/api/clientDocument/sign`)
        .send({})
      expect(statusCode).toBe(500)
    })
  })
})
