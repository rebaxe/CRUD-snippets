/**
 * Logout routes.
 *
 * @author Rebecca Axelsson
 * @version 1.0.0
 */

import express from 'express'
import { LogoutController } from '../controllers/logout-controller.js'

export const router = express.Router()

const controller = new LogoutController()

router.get('/', controller.logout)
