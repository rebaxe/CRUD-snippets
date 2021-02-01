/**
 * Register routes.
 *
 * @author Rebecca Axelsson
 * @version 1.0.0
 */

import express from 'express'
import { RegisterController } from '../controllers/register-controller.js'

export const router = express.Router()

const controller = new RegisterController()

router.get('/', controller.index)
router.post('/', controller.register)
