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

  /**
   * Renders a view with requested snippet and sends rendered HTML string as HTTP reponse.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async view (req, res) {
    try {
      const snippet = await Snippet.findOne({
        _id: req.params.id
      })
      const viewData = {
        id: snippet._id,
        code: snippet.code
      }
      console.log(req.session.user)
      res.render('snippets/view', { viewData })
    } catch (error) {
      console.log(error)
      res.redirect('.')
    }
  }

  /**
   * Renders a view for creating a new snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async new (req, res) {
    // const viewData = {
    //   code: ''
    // }
    res.render('snippets/new')//, { viewData })
  }

  /**
   * Handles a create new snippet POST request.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async create (req, res) {
    try {
      const snippet = new Snippet({
        code: req.body.code,
        creator: {
          name: req.session.user.username,
          id: req.session.user._id
        }
      })
      console.log(snippet.creator)
      await snippet.save()
      res.redirect('/snippets')
    } catch (error) {
      res.redirect('./new')
    }
  }

  /**
   * Renders a view with a form for editing the requested snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async edit (req, res) {
    try {
      const snippet = await Snippet.findOne({
        _id: req.params.id
      })
      const viewData = {
        id: snippet._id,
        code: snippet.code,
        creator: snippet.creator
      }
      res.render('snippets/edit', { viewData })
    } catch (error) {
      res.redirect('.')
    }
  }

  /**
   * Updates a snippet on POST request.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async update (req, res) {
    try {
      await Snippet.updateOne({
        _id: req.body.id
      }, {
        code: req.body.code
      })
      res.redirect('..')
    } catch (error) {
      res.redirect('./edit')
    }
  }

  /**
   * Renders a view for removing the requested snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async remove (req, res) {
    try {
      const snippet = await Snippet.findOne({
        _id: req.params.id
      })
      const viewData = {
        id: snippet._id,
        code: snippet.code
      }
      res.render('snippets/delete', { viewData })
    } catch (error) {
      res.redirect('.')
    }
  }

  /**
   * Deletes the requested snippet on POST.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async delete (req, res) {
    try {
      await Snippet.deleteOne({
        _id: req.body.id
      })
      res.redirect('..')
    } catch (error) {
      res.redirect('./remove')
    }
  }

  /**
   * Authorize logged in user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  authorizeUser (req, res, next) {
    if (!req.session.user) {
      const error = new Error('Forbidden')
      error.statusCode = 403
      res.send('403: Forbidden')
      next(error)
      return
    }
    next()
  }
}
