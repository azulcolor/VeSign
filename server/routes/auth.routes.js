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
  logged,
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
router.get('/user/:id', jwtSalaValidator, getUser)
router.patch('/user/:id',  updateUser)
router.delete('/user/:id', jwtSalaValidator, deleteUser)
router.get('/logged', jwtUserValidator, logged)

export default router
