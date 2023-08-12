import Message from "../../models/message-model.js";
import User from "../../models/user-model.js";
import { currentDate, currentTime } from "../../utils/date-time.js";
import { messages } from "../../utils/error-messages.js";

export const sendMessage = (socket) => {
  socket.on("send-message", async (data) => {
    // socket.to(roomId).emit('recieve-message', {
    //   message: 'Message sent successfully',
    //   message_body: message1.message_body.slice(-1).pop(),
    // }
    socket.emit("recieve-message", { hi: data });
  });
};
