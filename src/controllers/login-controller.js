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
      const user = await User.authenticate(req.body.username, req.body.password)
      req.session.regenerate(() => {
        req.session.user = user
        res.redirect('..')
      })
      req.session.flash = { news: 'good-news', message: `Welcome, ${user.username}!` }
    } catch (error) {
      req.session.flash = { news: 'bad-news', message: error.message }
      res.redirect('/login')
    }
  }
}
