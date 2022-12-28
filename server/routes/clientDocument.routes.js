/*
    ClientDocument Routes
    host + /api/client
*/
import { Router } from 'express'
import { jwtDocumentValidator } from '../middlewares/jwtValidator.js'
import {
  signDocument,
  information,
  send
} from '../controllers/clientDocument.controller.js'

const router = Router()

router.get('/info/:token', jwtDocumentValidator, information)
router.patch('/sign', signDocument)
router.patch('/send/:id', send)

export default router
