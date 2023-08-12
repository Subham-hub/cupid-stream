import Message from '../../models/message-model.js'
import { HttpError, messages } from '../../utils/index.js'

export const getMessageById = async (req, res, next) => {
  const { mid } = req.params
  if (!mid) return next(new HttpError(messages.inputError, 422))

  let message
  try {
    message = await Message.findById(mid)
  } catch (e) {
    return next(new HttpError(messages.serverError, 500))
  }
  res.status(200).json({ success: true, message })
}
