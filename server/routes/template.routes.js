import { Router } from 'express'

import { jwtSalaValidator } from '../middlewares/jwtValidator.js';
import { getTemplates, createTemplate, updateTemplate } from '../controllers/template.controller.js'

const router = Router();

router.get('/', jwtSalaValidator, getTemplates)
router.post('/', jwtSalaValidator, createTemplate)

router.patch('/:id', jwtSalaValidator, updateTemplate)

export default router