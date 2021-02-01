/**
* Register routes.
*
* @author Rebecca Axelsson
* @version 1.0.0
*/

import express from 'express'
import { LoginController } from '../controllers/login-controller.js'

export const router = express.Router()

const controller = new LoginController()

router.get('/', controller.index)
router.post('/', controller.login)
