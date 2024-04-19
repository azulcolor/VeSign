import request from 'supertest'
import app from '../../index.js'
import { pool } from '../../database/config.js'
import { adminToken, userToken } from '../variables.js'
import randomWords from 'random-words'

const api = request(app)

beforeAll(async () => {
  await pool.getConnection()
})

afterAll(async () => {
  await pool.end()
})

describe('GET /auth/user', () => {
  test('should return 401 if no token is provided', async () => {
    const { statusCode } = await api.get('/api/auth/user')

    expect(statusCode).toBe(401)
  })
  test('should return 401 if token is invalid', async () => {
    const { statusCode } = await api
      .get('/api/auth/user')
      .set('x-token', 'Bearer')
      expect(statusCode).toBe(401)
  })
  test('should return 401 if token is valid but not admin', async () => {
    const { statusCode } = await api
      .get('/api/auth/user')
      .set('x-token', userToken)
    expect(statusCode).toBe(401)
  })
  test('should return 201 if token is valid and admin', async () => {
    const { statusCode } = await api
      .get('/api/auth/user')
      .set('x-token', adminToken)
    expect(statusCode).toBe(201)
  })
})


describe('POST /auth/user (create user)', () => {
  describe('when user is admin', () => {
    const randomWord = randomWords()
    const validUser = {
      userName: `${randomWord}prueba`,
      userPassword: `${randomWord}prueba`,
      userEmail: `${randomWord}prueba@gmail.com`,
      fullName: `${randomWord} filomeno de la rosa`,
      idRol: '2',
    }
    const invalidUser = {
      userName: 'o',
      userPassword: 'o',
      userEmail: 'o',
      fullName: 'o',
      idRol: '2',
    }

    describe('is given a valid user', () => {
      test('should respond with a 201 status code', async () => {
        const { statusCode } = await api
          .post('/api/auth/user')
          .set('x-token', adminToken)
          .send(validUser)

        expect(statusCode).toBe(201)
      })
      test('password should be encrypted', async () => {
        const { body } = await api
          .post('/api/auth/user')
          .set('x-token', adminToken)
          .send(validUser)

        expect(body.userPassword).not.toBe(validUser.userPassword)
      })
    })
    describe('is given an invalid user', () => {
      test('should respond with a 400 status code', async () => {
        const { statusCode } = await api
          .post('/api/auth/user')
          .set('x-token', adminToken)
          .send(invalidUser)

        expect(statusCode).toBe(400)
      })
    })
  })
})

describe('POST /auth/login (login user)', () => {
  const validUser = {
    userName: 'prueba',
    userPassword: 'prueba',
  }

  const invalidUser = {
    userName: 'lala',
    userPassword: 'lala',
  }

  describe('is given a valid user', () => {
    test('should respond with a 200 status code', async () => {
      const { statusCode } = await api.post('/api/auth').send(validUser)

      expect(statusCode).toBe(200)
    })
    test('should respond with a token', async () => {
      const { body } = await api.post('/api/auth').send(validUser)

      expect(body).toHaveProperty('token')
    })
  })

  describe('is given an invalid user', () => {
    test('should respond with a 400 status code', async () => {
      const { statusCode } = await api.post('/api/auth').send(invalidUser)

      expect(statusCode).toBe(500)
    })
  })
})
