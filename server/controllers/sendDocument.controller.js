import { pool } from '../database/config.js'
import { generateDocumentJWT } from '../helpers/jwt.js'
import { sendEmail } from '../helpers/gmail/sendEmail.js'
import { sendSms } from '../helpers/sendSms.js'

export const getSignDocuments = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM senddocument')
    res.status(200).json({
      ok: true,
      message: 'Documents found',
      documents: rows,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      message: 'Error getting documents',
    })
  }
}

export const getSignDocument = async (req, res) => {
  const { id } = req.params

  try {
    const [rows] = await pool.query(
      'SELECT * FROM senddocument WHERE idDocument = ?',
      [id]
    )

    if (rows.length <= 0)
      return res.status(404).json({ message: 'Document not found' })

    res.status(200).json({
      ok: true,
      message: 'Document found',
      document: rows[0],
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      message: 'Error getting document',
    })
  }
}

export const createSignDocument = async (req, res) => {
  try {
    const { body } = req

    const [document] = await pool.query('INSERT INTO senddocument SET ?', [
      body,
    ])
    console.log(document.insertId)
    body.idDocument = document.insertId

    let [areaCode] = await pool.query(
      'SELECT areaCode FROM areacode WHERE idAreaCode = ?',
      [body.idAreaCode]
    )

    areaCode = areaCode[0].areaCode

    const phoneNumber = `${areaCode}${body.phoneNumber}`

    // generate token
    body.token = await generateDocumentJWT(body.idDocument)

    await pool.query('UPDATE senddocument SET token = ? WHERE iddocument = ?', [
      body.token,
      body.idDocument,
    ])

    // send email

    await sendEmail(body.email, body.fullName, body.token)

    // send sms

    await sendSms(phoneNumber, body.token, body.idDocument)

    res.status(201).json({
      ok: true,
      message: 'Document created',
      token: body.token,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      message: 'Error creating document',
    })
  }
}

export const instantCash = async (req, res) => {
  try {
    const { body } = req
    body.idTemplate = 1

    const [rows] = await pool.query('INSERT INTO senddocument SET ?', [body])
    console.log(rows.insertId)
    body.idDocument = rows.insertId

    let [areaCode] = await pool.query(
      'SELECT areaCode FROM areacode WHERE idAreaCode = ?',
      [body.idAreaCode]
    )

    // generate token
    body.token = await generateDocumentJWT(
      body.idDocument,
      body.fullName,
      body.idIdiom
    )

    await pool.query('UPDATE senddocument SET token = ? WHERE idDocument = ?', [
      body.token,
      body.idDocument,
    ])

    areaCode = areaCode[0].areaCode

    const phoneNumber = `${areaCode}${body.phoneNumber}`

    // send email

    await sendEmail(body.email, body.fullName, body.token)

    // send sms

    await sendSms(phoneNumber, body.token, body.idDocument)

    res.status(201).json({
      ok: true,
      message: 'Document created',
      token: body.token,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      message: 'Error creating document',
    })
  }
}

export const changeState = async (req, res) => {
  const { id } = req.params
  const { idStatus } = req.body

  try {
    const [rows] = await pool.query(
      'UPDATE senddocument SET idStatus = ? WHERE idDocument = ?',
      [idStatus, id]
    )

    if (rows.affectedRows <= 0)
      return res.status(404).json({ message: 'Document not found' })

    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      message: 'Error change state document',
    })
  }
}

export const deleteSignDocument = async (req, res) => {
  const { id } = req.params

  try {
    const [result] = await pool.query(
      'DELETE FROM senddocument WHERE idDocument = ?',
      [id]
    )
    if (result.affectedRows <= 0)
      return res.status(404).json({ message: 'Document not found' })

    res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error deleting document',
    })
  }
}
