/**
 * Logout controller.
 *
 * @author Rebecca Axelsson
 * @version 1.0.0
 */

/**
 * Encapsulates a controller.
 */
export class LogoutController {
  /**
   * Renders a view and sends the rendered HTML string as an HTTP response.
   * index GET.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async logout (req, res) {
    console.log('Logga ut')
    req.session.user = false
    res.redirect('..')
  }
}
