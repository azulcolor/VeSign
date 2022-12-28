import { Router } from 'express'
import { getTemplates, createTemplate, updateTemplate } from '../controllers/template.controller.js'

const router = Router();

router.get('/', getTemplates)
router.post('/', createTemplate)

router.patch('/:id', updateTemplate)

export default router