import request from 'supertest'
import app from '../../index.js'
import { pool } from '../../database/config.js'

const api = request(app)

beforeAll(async () => {
  await pool.getConnection()
})

afterAll(async () => {
  await pool.end()
})