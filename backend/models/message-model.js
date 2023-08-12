import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  users: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  // parent_message_id: { type: mongoose.Types.ObjectId, ref: 'Message' },
  roomId: { type: String, required: true },
  // type: { type: String, enum: ["group", "private"], default: "private" },
  message_body: {
    sender: {
      uid: { type: mongoose.Types.ObjectId, ref: "User" },
      username: String,
      status: String,
      avatar: { id: String, src: String },
    },
    body: { type: String, required: true },
    sendAt: { date: String, time: String },
  },
  createdAt: { type: Date, default: Date.now() },
});

export default mongoose.model("Message", messageSchema);
