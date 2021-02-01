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
      await user.save()
      res.redirect('/login')
    } catch (error) {
      res.redirect('.')
    }
  }
}
