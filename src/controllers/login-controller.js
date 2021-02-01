/**
 * Login controller.
 *
 * @author Rebecca Axelsson
 * @version 1.0.0
 */

import { User } from '../models/user.js'

/**
 * Encapsulates a controller.
 */
export class LoginController {
  /**
   * Renders a view and sends the rendered HTML string as an HTTP response.
   * index GET.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    res.render('login/index')
  }

  /**
   * Handles a login POST request.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   */
  async login (req, res) {
    try {
      console.log(req.body.username, req.body.password)
      await User.authenticate(req.body.username, req.body.password)
      res.redirect('/snippets')
    } catch (error) {
      console.log(error)
      res.status(401)
      res.redirect('/login')
    }
  }
}
