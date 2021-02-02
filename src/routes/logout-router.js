/**
 * Logout routes.
 *
 * @author Rebecca Axelsson
 * @version 1.0.0
 */

import express from 'express'
import { LogoutController } from '../controllers/logout-controller.js'
import { SnippetsController } from '../controllers/snippets-controller.js'

export const router = express.Router()

const controller = new LogoutController()
const snippetController = new SnippetsController()

router.get('/', snippetController.authorizeUser, controller.logout)
