import mongoose, { Schema, models } from "mongoose";
import AutoIncrementFactory from 'mongoose-sequence';

// Initialize AutoIncrement plugin
const AutoIncrement = AutoIncrementFactory(mongoose.connection);

const sampleSchema = new Schema(
  {
    id:{type:Number, unique: true},
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

// Apply the auto-increment plugin to the `id` field
sampleSchema.plugin(AutoIncrement, { inc_field: 'id' });

const Sample = models.Sample || mongoose.model("Sample", sampleSchema);
export default Sample;
