/*
    Dashboard Routes
    host + /api/clients
*/
import { Router } from 'express'
import { clients, client, options } from '../controllers/client.controller.js'

const router = Router()

router.get('/', clients)
router.get('/options', options)
router.get('/:id', client)


export default router
