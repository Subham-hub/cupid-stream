import User from "../../models/user-model.js";

import { messages } from "../../utils/error-messages.js";

export const updateTheme = (socket) => {
  socket.on("change_theme", async (data) => {
    const { uid, newTheme } = data;
    try {
      const user = await User.findById(uid);
      if (!user) return socket.emit("error", messages.notFound);
      user.uiTheme = newTheme;
      await user.save();
    } catch (e) {
      socket.emit("error", messages.serverError);
    }
  });
};
