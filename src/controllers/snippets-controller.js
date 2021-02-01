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
    } catch (error) {
      next(error)
    }
  }

  async view (req, res) {
    try {
      const snippet = await Snippet.findOne({
        _id: req.params.id
      })
      console.log(snippet)
      const viewData = {
        id: snippet._id,
        code: snippet.code
      }
      res.render('snippets/view', { viewData })
    } catch (error) {
      console.log(error)
      res.redirect('.')
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

  async edit (req, res) {
    try {
      const snippet = await Snippet.findOne({
        _id: req.params.id
      })
      const viewData = {
        id: snippet._id,
        code: snippet.code
      }
      res.render('snippets/edit', { viewData })
    } catch (error) {
      res.redirect('.')
    }
  }

  async update (req, res) {
    try {
      const snippetResult = await Snippet.updateOne({
        _id: req.body.id
      }, {
        code: req.body.code
      })
      res.redirect('..')
    } catch (error) {
      res.redirect('./edit')
    }
  }
}
