import { validationResult } from 'express-validator'

import User from '../../models/user-model.js'
import { cookieToken, HttpError, messages } from '../../utils/index.js'

export const login = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return next(new HttpError(messages.inputError, 422))

  const { email, password } = req.body
  let user
  try {
    user = await User.findOne({ email })
    if (!user)
      return next(
        new HttpError("Email don't exists, please signup instead", 403),
      )
  } catch (e) {
    return next(new HttpError(messages.serverError, 500))
  }

  const isPasswordCorrect = await user.isValidatedPassword(password)

  if (!isPasswordCorrect) return next(new HttpError('Wrong password', 422))

  cookieToken(user, res)
}
