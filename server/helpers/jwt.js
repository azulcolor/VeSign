import jwt from 'jsonwebtoken'

export const generateUserJWT = (uid, userName, idRol) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, userName, idRol }

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: '15m',
      },
      (err, token) => {
        if (err) {
          console.log(err)
          reject('Error generating token')
        }

        resolve(token)
      }
    )
  })
}

export const generateDocumentJWT = (idDocument) => {
  return new Promise((resolve, reject) => {
    const payload = { idDocument }

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: '30d',
      },
      (err, token) => {
        if (err) {
          console.log(err)
          reject('Error generating token')
        }

        resolve(token)
      }
    )
  })
}
