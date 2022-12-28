import { pool } from '../database/config.js'

export const getTemplates = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM pdftemplate')

    if (rows.length <= 0)
      return res.status(404).json({ message: 'Templates not found' })

    res.status(200).json({
      ok: true,
      message: 'Templates found',
      templates: rows,
    })
  } catch (error) {
    console.log(error)

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
    console.log(error)
    res.send(500).json({
      ok: false,
      message: 'Error creating template',
    })
  }
}

export const updateTemplate = async (req, res) => {
  try {
    const { id } = req.params
    const { body } = req

    await pool.query(
      'UPDATE pdftemplate SET ? WHERE idTemplate = ?',
      [body, id]
    )

    res.status(200).json({
      ok: true,
      message: 'Template updated',
    })
  } catch (error) {
    console.log(error)

    res.send(500).json({
      ok: false,
      message: 'Error updating template',
    })
  }
}
