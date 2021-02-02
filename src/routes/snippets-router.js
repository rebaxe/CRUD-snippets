/**
 * Snippets routes.
 *
 * @author Rebecca Axelsson
 * @version 1.0.0
 */

import express from 'express'
import { SnippetsController } from '../controllers/snippets-controller.js'

export const router = express.Router()

const controller = new SnippetsController()

router.get('/', controller.index)

router.get('/new', controller.authorizeUser, controller.new)
router.post('/create', controller.authorizeUser, controller.create)

router.get('/:id', controller.view)

router.get('/:id/edit', controller.edit)
router.post('/:id/update', controller.update)

router.get('/:id/remove', controller.remove)
router.post('/:id/delete', controller.delete)
