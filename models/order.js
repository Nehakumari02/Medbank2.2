import mongoose, { Schema, models } from "mongoose";
// import AutoIncrementFactory from 'mongoose-sequence';

// Initialize AutoIncrement plugin
// const AutoIncrement = AutoIncrementFactory(mongoose.connection);

const orderSchema = new Schema(
  {
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    // orderId: {type:Number, unique: true},
    orderTitle: {
      type: String,
      required: false,
    },
    requestSheetStatus: {
      type: String,
      enum: ["isPending", "inUserProgress", "inAdminProgress", "isAdminCompleted", "isUserCompleted", "isCompleted"],
      default: "isPending",
    },
    requestSheetLink: {
      type: String,
    },
    costEstimateStatus: {
      type: String,
      enum: ["isPending", "inUserProgress", "inAdminProgress", "isAdminCompleted", "isUserCompleted", "isCompleted"],
      default: "isPending",
    },
    costEstimationLink: {
      type: String,
    },
    formalRequestStatus: {
      type: String,
      enum: ["isPending", "inUserProgress", "inAdminProgress", "isAdminCompleted", "isUserCompleted", "isCompleted"],
      default: "isPending",
    },
    sampleShippingStatus: {
      type: String,
      enum: ["isPending", "inProgress", "inTransit", "isCompleted"],
      default: "isPending",
    },
    sampleShipping: {
      type: String,
      enum: ["","ok", "notOk"],
    },
    qualityCheckStatus: {
      type: String,
      enum: ["isPending", "inUserProgress", "inAdminProgress", "isAdminCompleted", "isUserCompleted", "isCompleted"],
      default: "isPending",
    },
    qualityCheckReportLink: {
      type: String,
    },
    libraryPrepStatus: {
      type: String,
      enum: ["isPending", "inUserProgress", "inAdminProgress", "isAdminCompleted", "isUserCompleted", "isCompleted"],
      default: "isPending",
    },
    libraryCheckReportLink: {
      type: String,
    },
    analysisProgressStatus: {
        type: String,
        enum: ["isPending", "inUserProgress", "inAdminProgress", "isAdminCompleted", "isUserCompleted", "isCompleted"],
        default: "isPending",
      },
    analysisDoneStatus: {
        type: String,
        enum: ["isPending", "inUserProgress", "inAdminProgress", "isAdminCompleted", "isUserCompleted", "isCompleted"],
        default: "isPending",
      },
    analysisRawDataStatus: {
      type: String,
      enum: ["isPending", "inUserProgress", "inAdminProgress", "isAdminCompleted", "isUserCompleted", "isCompleted"],
      default: "isPending",
    },
    rawDataLink: {
      type: String,
    },
    analysisSpecificationStatus: {
      type: String,
      enum: ["isPending", "inUserProgress", "inAdminProgress", "isAdminCompleted", "isUserCompleted", "isCompleted"],
      default: "isPending",
    },
    analysisSpecificationReportLink: {
      type: String,
    },
    
    invoiceStatus: {
      type: String,
      enum: ["isPending", "inUserProgress", "inAdminProgress", "isAdminCompleted", "isUserCompleted", "isCompleted"],
      default: "isPending",
    },
    invoiceLink: {
      type: String,
    },
    paymentStatus: {
      type: String,
      enum: ["isPending", "inUserProgress", "inAdminProgress", "isAdminCompleted", "isUserCompleted", "isCompleted"],
      default: "isPending",
    },
    paymentRecieptLink: {
      type: String,
    },
    grandTotal:{
      type: String,
    },
    grandTotal1:{
      type: String,
    },
    currency:{
      type: String,
    },
    currency1:{
      type: String,
    },
    samples1: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sample'
      }
    ],
    samples: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sample'
      }
    ]
  },
  { timestamps: true }
);

// Apply the auto-increment plugin to the `id` field
// sampleSchema.plugin(AutoIncrement, { inc_field: 'id' });

const Order = models.Order || mongoose.model("Order", orderSchema);
export default Order;
