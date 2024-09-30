import mongoose, { Schema, models } from "mongoose";

const sampleSchema = new Schema(
  {
    id:{type:String},
    orderId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Order', // Reference to the Order model
      required: true // If every sample should be associated with an order
    },
    name: { type: String },
    qualityFees: { type: String },
    libraryFees: { type: String },
    analysisFees: { type: String },
    tax: { type: String },
    others: { type: String },
    total: { type: String },
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
    analysisSpecificationStatus: {
      type: String,
      enum: ["isPending", "inUserProgress", "inAdminProgress", "isAdminCompleted", "isUserCompleted", "isCompleted"],
      default: "isPending",
    },
    analysisSpecificationReportLink: {
      type: String,
    },
  },
  { timestamps: true }
);

const Sample = models.Sample || mongoose.model("Sample", sampleSchema);
export default Sample;
