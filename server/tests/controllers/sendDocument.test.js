import request from 'supertest'
import app from '../../index.js'
import { pool } from '../../database/config.js'
import { adminToken, userToken } from '../variables.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const api = request(app)

beforeAll(async () => {
  await pool.getConnection()
})

afterAll(async () => {
  await pool.end()
})

describe('GET /sendDocument', () => {
  describe('been a admin', () => {
    test('should respond with a 200 status code', async () => {
      const { statusCode } = await api
        .get(`/api/sendDocument`)
        .set('x-token', adminToken)

      expect(statusCode).toBe(200)
    })
    test('should be an object', async () => {
      const { body } = await api
        .get('/api/sendDocument')
        .set('x-token', adminToken)
      expect(body).toBeInstanceOf(Object)
    })

    test('documents must be an array', async () => {
      const { body } = await api
        .get('/api/sendDocument')
        .set('x-token', adminToken)
      const { documents } = body
      expect(documents).toBeInstanceOf(Array)
    })

    test('types of documents must be right', async () => {
      const { body } = await api
        .get('/api/sendDocument')
        .set('x-token', adminToken)
      const { documents } = body

      documents.forEach((document) => {
        const {
          idDocument,
          token,
          contractNumber,
          idStatus,
          fullName,
          sign,
          idTemplate,
          documentSigned,
          idAreaCode,
          phoneNumber,
          email,
          idUser,
          idIdiom,
          creationDate,
          signedDate,
        } = document

        expect(token && fullName && creationDate).toEqual(expect.any(String))

        expect(
          idDocument && idStatus && idTemplate && idUser && idIdiom
        ).toEqual(expect.any(Number))

        sign !== null
          ? expect(sign).toEqual(expect.any(String))
          : expect(sign).toBeNull()

        documentSigned !== null
          ? expect(documentSigned).toEqual(expect.any(String))
          : expect(documentSigned).toBeNull()

        idAreaCode !== null
          ? expect(idAreaCode).toEqual(expect.any(Number))
          : expect(idAreaCode).toBeNull()

        phoneNumber !== null
          ? expect(phoneNumber).toEqual(expect.any(String))
          : expect(phoneNumber).toBeNull()

        email !== null
          ? expect(email).toEqual(expect.any(String))
          : expect(email).toBeNull()

        signedDate !== null
          ? expect(signedDate).toEqual(expect.any(String))
          : expect(signedDate).toBeNull()

        contractNumber !== null
          ? expect(contractNumber).toEqual(expect.any(String))
          : expect(contractNumber).toBeNull()
      })
    })
  })
  describe('been a user', () => {
    test('should respond with a 401 status code', async () => {
      const { statusCode } = await api
        .get('/api/sendDocument')
        .set('x-token', userToken)
      expect(statusCode).toBe(401)
    })
  })
})

describe('GET /sendDocuments/:id', () => {
  test('should respond with a 200 status code', async () => {
    const [rows] = await pool.query(
      'SELECT idDocument FROM senddocument LIMIT 1'
    )
    const { idDocument } = rows[0]
    const { statusCode } = await api.get(`/api/sendDocument/${idDocument}`)

    expect(statusCode).toBe(200)
  })

  test('should be an object', async () => {
    const [rows] = await pool.query(
      'SELECT idDocument FROM senddocument LIMIT 1'
    )
    const { idDocument } = rows[0]
    const { body } = await api.get(`/api/sendDocument/${idDocument}`)
    expect(body).toBeInstanceOf(Object)
  })

  test('document must be an object', async () => {
    const [rows] = await pool.query(
      'SELECT idDocument FROM senddocument LIMIT 1'
    )
    const { idDocument } = rows[0]
    const { body } = await api.get(`/api/sendDocument/${idDocument}`)
    const { document } = body
    expect(document).toBeInstanceOf(Object)
  })

  test('types of document must be right', async () => {
    const [rows] = await pool.query(
      'SELECT idDocument FROM senddocument LIMIT 1'
    )
    const { idDocument } = rows[0]
    const { body } = await api.get(`/api/sendDocument/${idDocument}`)
    const { document } = body

    const {
      token,
      contractNumber,
      idStatus,
      fullName,
      sign,
      idTemplate,
      documentSigned,
      idAreaCode,
      phoneNumber,
      email,
      idUser,
      idIdiom,
      creationDate,
      signedDate,
    } = document

    expect(token && fullName && creationDate).toEqual(expect.any(String))

    expect(idDocument && idStatus && idTemplate && idUser && idIdiom).toEqual(
      expect.any(Number)
    )

    sign !== null
      ? expect(sign).toEqual(expect.any(String))
      : expect(sign).toBeNull()

    documentSigned !== null
      ? expect(documentSigned).toEqual(expect.any(String))
      : expect(documentSigned).toBeNull()

    idAreaCode !== null
      ? expect(idAreaCode).toEqual(expect.any(Number))
      : expect(idAreaCode).toBeNull()

    phoneNumber !== null
      ? expect(phoneNumber).toEqual(expect.any(String))
      : expect(phoneNumber).toBeNull()

    email !== null
      ? expect(email).toEqual(expect.any(String))
      : expect(email).toBeNull()

    signedDate !== null
      ? expect(signedDate).toEqual(expect.any(String))
      : expect(signedDate).toBeNull()

    contractNumber !== null
      ? expect(contractNumber).toEqual(expect.any(String))
      : expect(contractNumber).toBeNull()
  })

  test('user join with a expired token', async () => {
    const [rows] = await pool.query(
      'SELECT idDocument FROM senddocument LIMIT 1'
    )
    const { idDocument } = rows[0]
    const { body } = await api.get(`/api/sendDocument/${idDocument}`)
    const { document } = body
    const { token } = document

    const isExpired =
      jwt.decode(token, process.env.SECRET_JWT_SEED).exp < Date.now() / 1000

    expect(isExpired).toEqual(false)
  })
})

describe('POST /sendDocuments', () => {
  describe('is given a valid document', () => {
    const document = {
      fullName: 'Eduardo Agustin Leal Pastelin',
      contractNumber: '344243243',
      email: 'lealpastelin@gmail.com',
      phoneNumber: '9982933230',
      idAreaCode: '1',
      idUser: '1',
      idTemplate: '1',
      idIdiom: '1',
    }
    test('should respond with a 200 status code', async () => {
      const { statusCode } = await api.post('/api/sendDocument').send(document)
      expect(statusCode).toBe(201)
    })
    test('should respond with token', async () => {
      const { body } = await api.post('/api/sendDocument').send(document)
      expect(body.token).toBeDefined()
    })
  })
  describe('is given an invalid document', () => {
    test('should respond with a 400 status code', async () => {
      const { statusCode } = await api.post('/api/sendDocument').send({})
      expect(statusCode).toBe(400)
    })
  })
})

describe('DELETE /sendDocuments/sign/:id', () => {
  describe('is given a valid document', () => {
    test('should respond with a 204 status code', async () => {
      const [rows] = await pool.query(
        'SELECT idDocument FROM senddocument LIMIT 1'
      )
      const { idDocument } = rows[0]
      const { statusCode } = await api.delete(`/api/sendDocument/${idDocument}`)
      expect(statusCode).toBe(204)
    })
  })
  describe('is given an invalid document', () => {
    test('should respond with a 400 status code', async () => {
      const { statusCode } = await api.delete(`/api/sendDocument/sign/0`)
      expect(statusCode).toBe(404)
    })
  })
})
