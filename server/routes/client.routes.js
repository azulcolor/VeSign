import { Router } from 'express'

import { clients, client, options, instantCash } from '../controllers/client.controller.js'

const router = Router()

router.get('/', clients)
router.get('/options', options)
router.get('/:id', client)
router.get('/instantCash/:token', instantCash)

export default router
