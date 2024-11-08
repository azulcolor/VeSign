import { pool } from '../database/config.js'
import bcrypt from 'bcrypt'
import { generateUserJWT } from '../helpers/jwt.js'

export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT idUser, userName, userEmail, userPassword, fullName, s.idRol, rol FROM rol r, users s WHERE r.idRol = s.idRol'
    )

    res.status(201).json({
      ok: true,
      message: 'Users found',
      users: rows,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      message: 'Error getting users',
    })
  }
}

export const postUser = async (req, res) => {
  try {
    const { body } = req
    //Encrypt password
    const salt = bcrypt.genSaltSync()
    body.userPassword = bcrypt.hashSync(body.userPassword, salt)

    const [rows] = await pool.query('INSERT INTO users SET ?', [body])

    const token = await generateUserJWT(rows.insertId, body.userName)

    res.status(201).json({
      ok: true,
      uid: rows.insertId,
      token,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      message: 'Error creating user',
    })
  }
}

export const userLogin = async (req, res) => {
  const { userName, userPassword } = req.body

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE userName = ?', [
      userName,
    ])

    const user = rows[0]

    if (user.userName === undefined) {
      return res.status(400).json({
        ok: false,
        message: 'User or password incorrect',
      })
    }

    //Validate password
    const validPassword = bcrypt.compareSync(userPassword, user.userPassword)

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        message: 'User or password incorrect',
      })
    }

    //Generate JWT
    const token = await generateUserJWT(user.idUser, user.userName, user.idRol)

    res.status(200).json({
      ok: true,
      uid: user.id,
      name: user.fullName,
      rol: user.idRol,
      token,
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      ok: false,
      message: 'Error logging in',
    })
  }
}

export const tokenValidator = async (req, res) => {
  try {
    const { uid, name, idRol } = req

    const token = await generateUserJWT(uid, name, idRol)

    res.status(201).json({
      ok: true,
      token,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
    })
  }
}

export const logged = async (req, res) => {
  res.status(201).json({ ok: true, message: 'logged' })
}

export const getUser = async (req, res) => {
  res.status(201).json({ ok: true, message: 'getUser' })
}

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { body } = req

    if (!id) {
      return res.status(400).json({
        ok: false,
        message: 'No id provided',
      })
    }

    //Encrypt password
    if (body.userPassword !== undefined) {
      const salt = bcrypt.genSaltSync()
      body.userPassword = bcrypt.hashSync(body.userPassword, salt)
    }

    await pool.query('UPDATE users SET ? WHERE idUser = ?', [body, id])

    res.status(201).json({
      ok: true,
      message: 'User updated',
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      message: 'Error updating user',
    })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({
        ok: false,
        message: 'No id provided',
      })
    }

    await pool.query('DELETE FROM users WHERE idUser = ?', [id])

    res.status(201).json({
      ok: true,
      message: 'User deleted',
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      message: 'Error deleting user',
    })
  }
}
