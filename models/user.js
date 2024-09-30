import mongoose, { Schema, models } from "mongoose";
import Order from './order'
import { type } from "os";

const userSchema = new Schema(
  {
    Username: {
      type: String,
      required: false,
    },
    token: {
      type: String
    },
    memberId:{
      type:String
    },
    name: {
      type: String,
      required: true,
    },
    school: {
      type: String,
      required: false,
    },
    faculty: {
      type: String,
      required: false,
    },
    field: {
      type: String,
      required: false,
    },
    others: {
      type: String,
      required: false,
    },
    service: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    Perfecture: {
      type: String,
      required: false,
    },
    postalCode: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
