import mongoose, { Schema, models } from "mongoose";
import { type } from "os";

const messageSchema = new Schema(
  {
    conversationId:{type:mongoose.Schema.Types.ObjectId,ref:'Conversation'},
    senderId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    text:{type:String},
    timestamp:{}
  },
  { timestamps: true }
);

const Message = models.Message || mongoose.model("Message", messageSchema);
export default Message;