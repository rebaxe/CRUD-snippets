/**
 * Snippets controller.
 *
 * @author Rebecca Axelsson
 * @version 1.0.0
 */

import { Snippet } from '../models/snippet.js'

/**
 * Encapsulates a controller.
 */
export class SnippetsController {
  /**
   * Renders a view and sends the rendered HTML string as an HTTP response.
   * index GET.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    try {
      const viewData = {
        snippets: (await Snippet.find({}))
          .map(snippet => ({
            id: snippet._id,
            code: snippet.code
          }))
      }
      res.render('snippets/index', { viewData })
      console.log(viewData)
    } catch (error) {
      next(error)
    }
  }

  async new (req, res) {
    const viewData = {
      code: ''
      //createdByUser: '1'
    }
    res.render('snippets/new', { viewData })
  }

  async create (req, res) {
    try {
      const snippet = new Snippet({
        code: req.body.code
      })
      await snippet.save()
      res.redirect('.')
    } catch (error) {
      res.redirect('./new')
    }
  }
}
