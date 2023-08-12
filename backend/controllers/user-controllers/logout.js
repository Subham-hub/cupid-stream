import { HttpError, messages } from '../../utils/index.js'

export const logout = async (req, res, next) => {
  try {
    res.cookie('token', null, { expires: new Date(Date.now()), httpOnly: true })
    res.status(200).json({ success: true, message: 'Logout success' })
  } catch (e) {
    return next(new HttpError(messages.serverError, 500))
  }
}
