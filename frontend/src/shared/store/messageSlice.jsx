import { createSlice, current } from '@reduxjs/toolkit'

const messageSlice = createSlice({
  name: 'Message slice',
  initialState: {
    users: [],
    message_body: [],
    roomId: '',
  },

  reducers: {
    setData(state, action) {
      state.roomId = action.payload.message.roomId
      state.users = action.payload.message.users
      state.message_body = action.payload.message.message_body
    },
    updateData(state, action) {
      const finderFunc = (m) => m._id === action.payload._id
      const existingMessage = current(state).message_body.find(finderFunc)
      if (!existingMessage)
        state.message_body = [...current(state).message_body, action.payload]
    },
  },
})

export const messageActions = messageSlice.actions
export default messageSlice.reducer
