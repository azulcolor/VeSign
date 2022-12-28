/* 
  documents Routes / documents
  host + /api/signDocument(s)/:
*/
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
  instantCash
} from '../controllers/sendDocument.controller.js'

const router = Router()

router.get('/', jwtSalaValidator, getSignDocuments)
router.get('/:id', getSignDocument)
router.patch('/:id', changeState)
router.delete('/:id', deleteSignDocument)

router.post('/', [sendDocumentChecker, fieldValidator], createSignDocument)
router.post('/instantCash', jwtInstantCashValidator, instantCash)

export default router
