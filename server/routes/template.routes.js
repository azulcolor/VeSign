import { Router } from 'express'

import { fieldValidator } from '../middlewares/fieldValidator.js'
import { createTemplateChecker } from '../middlewares/fieldChecker..js'
import { jwtSalaValidator } from '../middlewares/jwtValidator.js'
import {
  getTemplates,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  desactivateTemplate,
} from '../controllers/template.controller.js'

const router = Router()

router.get('/', jwtSalaValidator, getTemplates)
router.post(
  '/',
  [createTemplateChecker, fieldValidator, jwtSalaValidator],
  createTemplate
)

router.patch('/desactivate/:id', jwtSalaValidator, desactivateTemplate)
router.patch('/:id', jwtSalaValidator, updateTemplate)
router.delete('/:id', jwtSalaValidator, deleteTemplate)

export default router
