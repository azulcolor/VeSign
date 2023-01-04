import { pool } from '../database/config.js'
import getDate from '../helpers/general/date.js'
import { signPdf } from '../helpers/signPdf.js'

export const information = async (req, res) => {
  try {
    const { token } = req.params
    const [rows] = await pool.query(
      'SELECT idDocument, idStatus, fullName, d.idIdiom, IF(d.template = 1, t.pdfTemplate, d.document) AS document FROM senddocument d, pdftemplate t WHERE d.idTemplate = t.idTemplate AND d.token = ?',
      [token]
    )

    if (rows.length === 0) {
      return res.status(404).json({
        message: 'client not found',
      })
    }

    switch (rows[0].idStatus) {
      case 1:
        res.status(200).json({
          ok: true,
          message: 'client found',
          client: rows[0],
        })
        break
      case 2:
        return res.status(400).json({
          ok: false,
          status: 2,
          message: 'Document is already signed',
        })
        break
      case 3:
        return res.status(400).json({
          ok: false,
          status: 3,
          message: 'Document is already accepted',
        })
        break
      case 4:
        return res.status(400).json({
          ok: false,
          status: 3,
          message: 'Document is already rejected',
        })
        break
      case 5:
        return res.status(400).json({
          ok: false,
          status: 5,
          message: 'Document is already annulled',
        })
        break

      default:
        break
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      message: 'Error getting client',
    })
  }
}

export const signDocument = async (req, res) => {
  const { sign, documentToSign, screenWidth } = req.body

  try {
    const documentSigned = await signPdf(documentToSign, sign, screenWidth)

    res.status(200).json({
      ok: true,
      message: 'Document signed',
      documentSigned,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      message: 'Error updating document',
    })
  }
}

export const send = async (req, res) => {
  const { id } = req.params
  const { sign, signedDocument } = req.body

  const signedDate = getDate()

  if (!sign || !signedDocument) {
    return res.status(400).json({
      ok: false,
      message: 'Missing data',
    })
  }

  try {
    const [rows] = await pool.query(
      'UPDATE senddocument SET idStatus = 2, sign = ?, documentSigned = ?, signedDate = ? WHERE idDocument = ?',
      [sign, signedDocument, signedDate, id]
    )
    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: 'Document not found' })
    }

    res.sendStatus(204)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      message: 'Error updating document',
    })
  }
}

export const tokens = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT token FROM senddocument')
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Tokens not found' })
    }
    res.status(200).json(rows)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      message: 'Error getting tokens',
    })
  }
}
