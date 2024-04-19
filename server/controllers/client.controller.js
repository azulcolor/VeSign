import { pool } from '../database/config.js'

export const clients = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT DISTINCT d.idDocument, d.fullname, d.creationDate, d.contractNumber, d.idStatus, s.statusName, p.idType, t.documentType FROM senddocument d, documentstatus s, documenttype t, pdftemplate p WHERE d.idStatus = s.idStatus AND d.idTemplate = p.idTemplate AND  p.idType = t.idtype ORDER BY d.creationDate DESC'
    )

    if (rows.length === 0) {
      return res.status(404).json({
        message: 'clients not found',
      })
    }

    return res.status(200).json({
      ok: true,
      message: 'clients found',
      clients: rows,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      message: 'Error getting clients',
    })
  }
}

export const clientsId = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT idDocument FROM senddocument')
    res.status(200).json(rows)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      message: `Error getting client's id`,
    })
  }
}

export const client = async (req, res) => {
  const { id } = req.params

  try {
    const [rows] = await pool.query(
      'SELECT idDocument, fullname, c.areaCode, phoneNumber, email, contractNumber, d.idStatus, s.statusName, IF(d.idStatus = 1 or d.idStatus = 5, IF(d.template = 1, t.pdfTemplate, d.document), d.documentSigned) AS document FROM senddocument d, documentstatus s, areacode c, pdftemplate t WHERE d.idStatus = s.idStatus AND c.idAreaCode = d.idAreaCode AND d.idTemplate = t.idTemplate AND d.idDocument = ?',
      [id]
    )
    if (rows.length === 0) {
      return res.status(404).json({
        message: 'client not found',
        client: rows,
      })
    }
    return res.status(200).json({
      ok: true,
      message: 'client found',
      client: rows[0],
    })
  } catch {
    return res.status(500).json({
      ok: false,
      message: 'Error getting client',
    })
  }
}

export const options = async (req, res) => {
  const options = {
    documentStatus: [],
    documentType: [],
    documentTemplate: [],
    idiom: [],
    areaCode: [],
    rol: [],
  }

  const error = (message, row) => {
    if (row.length === 0) {
      return res.status(404).json({
        message: `${message} not found`,
      })
    }
  }

  try {
    const [status] = await pool.query(
      'SELECT statusName as label, idStatus as id FROM documentstatus'
    )
    const [type] = await pool.query(
      'SELECT documentType as label, idType as id FROM documenttype'
    )

    const [idiom] = await pool.query('SELECT idIdiom, idiom FROM idiom')

    const [areaCode] = await pool.query(
      'SELECT idAreaCode, areaCode FROM areacode'
    )

    const [rol] = await pool.query('SELECT idRol, rol FROM rol')

    const [template] = await pool.query(
      'SELECT pdfName AS label, idTemplate AS id FROM pdftemplate'
    )

    error('documentStatus', status)
    error('documentType', type)
    error('idiom', idiom)
    error('areaCode', areaCode)
    error('rol', rol)
    error('template', template)

    options.documentStatus = status
    options.documentType = type
    options.idiom = idiom
    options.areaCode = areaCode
    options.rol = rol
    options.template = template

    return res.status(200).json({
      ok: true,
      message: 'options found',
      options,
    })
  } catch {
    return res.status(500).json({
      ok: false,
      message: 'Error getting options',
    })
  }
}

export const instantCash = async (req, res) => {
  const { token } = req.params

  try {
    const [rows] = await pool.query(
      'SELECT d.idStatus, s.statusName, IF(d.idStatus = 1 or d.idStatus = 5, IF(d.template = 1, t.pdfTemplate, d.document), d.documentSigned) AS document FROM senddocument d, documentstatus s, pdftemplate t WHERE d.idStatus = s.idStatus AND d.idTemplate = t.idTemplate AND d.token = ?',
      [token]
    )
    if (rows.length === 0) {
      return res.status(404).json({
        message: 'client not found',
      })
    }
    return res.status(200).json({
      ok: true,
      message: 'client found',
      client: rows[0],
    })
  } catch {
    return res.status(500).json({
      ok: false,
      message: 'Error getting client',
    })
  }
}
