/*
    Users Routes / Auth
    host + /api/auth
*/
import { Router } from 'express'
import { fieldValidator } from '../middlewares/fieldValidator.js'
import {
  jwtUserValidator,
  jwtSalaValidator,
} from '../middlewares/jwtValidator.js'
import { createUserChecker } from '../middlewares/fieldChecker..js'

import {
  postUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  userLogin,
  tokenValidator,
} from '../controllers/auth.controller.js'

const router = Router()

router.post(
  '/user',
  [jwtSalaValidator, createUserChecker, fieldValidator],
  postUser
)
router.post('/', userLogin)
router.get('/user', jwtSalaValidator, getUsers)
router.get('/userToken', jwtUserValidator, tokenValidator)
router.get('/user/:id', getUser)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

export default router
