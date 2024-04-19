import { pool } from '../database/config.js'

export const getTemplates = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT p.idTemplate,  p.pdfName, p.pdfTemplate, p.idType, d.documentType, p.idIdiom FROM pdftemplate p, documenttype d WHERE p.idType = d.idType AND p.isActive = 1'
    )

    if (rows.length <= 0)
      return res.status(404).json({ message: 'Templates not found' })

    res.status(200).json({
      ok: true,
      message: 'Templates found',
      templates: rows,
    })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error getting templates',
    })
  }
}

export const createTemplate = async (req, res) => {
  try {
    const { body } = req

    await pool.query('INSERT INTO pdftemplate SET ?', [body])

    res.status(200).json({
      ok: true,
      message: 'Template created',
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Error creating template',
    })
  }
}

export const updateTemplate = async (req, res) => {
  try {
    const { id } = req.params
    const { body } = req

    await pool.query('UPDATE pdftemplate SET ? WHERE idTemplate = ?', [
      body,
      id,
    ])

    res.status(200).json({
      ok: true,
      message: 'Template updated',
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      ok: false,
      message: 'Error updating template',
    })
  }
}

export const desactivateTemplate = async (req, res) => {
  try {
    const { id } = req.params

    await pool.query(
      'UPDATE pdftemplate SET isActive = 0 WHERE idTemplate = ?',
      [id]
    )

    res.status(200).json({
      ok: true,
    })
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: 'Error desactivating template',
    })
  }
}

export const deleteTemplate = async (req, res) => {
  try {
    const { id } = req.params

    await pool.query('DELETE FROM pdftemplate WHERE idTemplate = ?', [id])

    res.status(200).json({
      ok: true,
      message: 'Template deleted',
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      ok: false,
      message: 'Error deleting template',
    })
  }
}
