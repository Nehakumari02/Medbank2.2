import { kMaxLength } from "buffer";
import mongoose, { Schema, models } from "mongoose";
import { type } from "os";

const conversationSchema = new Schema(
  {
    participants:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    lastMessage:{
      text:{
        type:String
      },
      senderId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    }
  },
  { timestamps: true }
);

const Conversation = models.Conversation || mongoose.model("Conversation", conversationSchema);
export default Conversation;