import { Router } from 'express'

import { jwtDocumentValidator } from '../middlewares/jwtValidator.js'
import {
  signDocument,
  information,
  send,
  tokens,
} from '../controllers/clientDocument.controller.js'

const router = Router()

router.get('/info/:token', jwtDocumentValidator, information)
router.get('/tokens', tokens)
router.patch('/sign', signDocument)
router.patch('/send/:id', send)

export default router
