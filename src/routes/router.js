/**
 * The routes.
 *
 * @author Rebecca Axelsson
 * @version 1.0.0
 */

import express from 'express'
import { router as homeRouter } from './home-router.js'
import { router as snippetRouter } from './snippets-router.js'
import { router as loginRouter } from './login-router.js'
import { router as registerRouter } from './register-router.js'

export const router = express.Router()

router.use('/', homeRouter)
router.use('/snippets', snippetRouter)
router.use('/login', loginRouter)
router.use('/register', registerRouter)

router.use('*', (req, res, next) => {
  const error = new Error()
  error.status = 404
  error.message = 'Not Found'
  next(error)
})
