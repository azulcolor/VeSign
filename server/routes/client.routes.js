import { Router } from 'express'

import {
  clients,
  client,
  options,
  instantCash,
  clientsId,
} from '../controllers/client.controller.js'
import { jwtSalaValidator } from '../middlewares/jwtValidator.js'

const router = Router()

router.get('/', clients)
router.get('/options', options)
router.get('/client/:id',  client)
router.get('/instantCash/:token', jwtSalaValidator, instantCash)
router.get('/idClient', clientsId)

export default router
