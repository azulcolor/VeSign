import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Cookies from 'js-cookie'

export const jwtUserValidator = (req, res, next) => {
  // x-token headers

  const token = Cookies.get('token')
  console.log(token)

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: 'There is no token in the request',
    })
  }

  try {
    const { uid, userName, idRol } = jwt.verify(
      token,
      process.env.SECRET_JWT_SEED
    )

    req.uid = uid
    req.name = userName
    req.rol = idRol
  } catch {
    return res.status(401).json({
      ok: false,
      message: 'Invalid token',
    })
  }

  next()
}

export const jwtSalaValidator = (req, res, next) => {
  const token = req.header('x-token')

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: 'There is no token in the request',
    })
  }

  try {
    const { uid, userName, idRol } = jwt.verify(
      token,
      process.env.SECRET_JWT_SEED
    )
    if (idRol !== 1) {
      req.uid = uid
      req.name = userName
      req.rol = idRol
    } else if (idRol === 1) {
      return res.status(401).json({
        ok: false,
        message: 'only sala can access',
      })
    }
  } catch {
    return res.status(401).json({
      ok: false,
      message: 'Invalid token',
    })
  }

  next()
}

export const jwtInstantCashValidator = (req, res, next) => {
  const token = req.header('x-token')

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: 'There is no token in the request',
    })
  }

  try {
    const { userName, password } = jwt.verify(
      token,
      process.env.SECRET_JWT_SEED
    )

    console.log(userName)

    const validPassword = bcrypt.compareSync(password, '$2b$10$yXSh/0BkMLJKFxHKI.O9Z.Zv63mbwVygjs/hFY/Bb6SnR1JAnCbYe');

    if (userName === 'InstantCash' && validPassword) {
      return res.status(200).json({
        ok: true,
      })
    }
  } catch {
    return res.status(401).json({
      ok: false,
      message: 'Invalid token',
    })
  }

  next()
}

export const jwtDocumentValidator = (req, res, next) => {
  const { token } = req.params

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: 'There is no token in the request',
    })
  }

  try {
    jwt.verify(token, process.env.SECRET_JWT_SEED)
  } catch {
    return res.status(401).json({
      ok: false,
      message: 'Invalid token',
    })
  }

  next()
}
