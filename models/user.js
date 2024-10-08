import mongoose, { Schema, models } from "mongoose";
import Order from './order'
import { type } from "os";
// import AutoIncrementFactory from 'mongoose-sequence';

// Initialize AutoIncrement plugin
// const AutoIncrement = AutoIncrementFactory(mongoose.connection);

const userSchema = new Schema(
  {
    Username: {
      type: String,
      required: false,
    },
    token: {
      type: String
    },
    verified:{
      type: Boolean,
      default: false
    },
    role:{
      type: String,
      default: "user"
    },
    userDetails:{
      type: Boolean,
      default: false
    },
    verificationToken:{
      type: String
    },
    verificationTokenExpiry:{
      type: Date
    },
    resetPasswordToken:{
      type: String
    },
    resetPasswordTokenExpiry:{
      type: Date
    },
    memberId:{
      type:String
    },
    // memberId: {type:Number, unique: true},
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

// Apply the auto-increment plugin to the `id` field
// sampleSchema.plugin(AutoIncrement, { inc_field: 'id' });

const User = models.User || mongoose.model("User", userSchema);
export default User;
