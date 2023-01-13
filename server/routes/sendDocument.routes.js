import { Router } from 'express'

import { fieldValidator } from '../middlewares/fieldValidator.js'
import {
  jwtSalaValidator,
  jwtInstantCashValidator,
} from '../middlewares/jwtValidator.js'
import { sendDocumentChecker } from '../middlewares/fieldChecker..js'

import {
  getSignDocuments,
  getSignDocument,
  createSignDocument,
  changeState,
  deleteSignDocument,
  instantCash,
  cancelDocument,
} from '../controllers/sendDocument.controller.js'

const router = Router()

router.get('/', jwtSalaValidator, getSignDocuments)
router.get('/:id', jwtSalaValidator, getSignDocument)

router.patch('/:id', jwtSalaValidator, changeState)
router.patch('/cancel/:token', jwtInstantCashValidator, cancelDocument)

router.delete('/:id', jwtSalaValidator, deleteSignDocument)

router.post('/instantCash', jwtInstantCashValidator, instantCash)

router.post(
  '/',
  [sendDocumentChecker, fieldValidator, jwtSalaValidator],
  createSignDocument
)

export default router
