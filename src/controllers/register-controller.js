/**
 * Register controller.
 *
 * @author Rebecca Axelsson
 * @version 1.0.0
 */

import { User } from '../models/user.js'

/**
 * Encapsulates a controller.
 */
export class RegisterController {
  /**
   * Renders a view and sends the rendered HTML string as an HTTP response.
   * index GET.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    res.render('register/index')
  }

  /**
   * Handles register POST request.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   */
  async register (req, res) {
    try {
      const user = new User({
        username: req.body.username,
        password: req.body.password
      })
      if (await User.findOne({ username: req.body.username })) {
        throw new Error('Username already exists.')
      } else {
        await user.save()
        req.session.flash = { news: 'good-news', message: 'User successfully registered.' }
        res.redirect('./login')
      }
    } catch (error) {
      req.session.flash = { news: 'bad-news', message: error.message }
      res.redirect('./register')
    }
  }
}
