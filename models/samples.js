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
    costEstimation_qualityFees: { type: String },
    costEstimation_libraryFees: { type: String },
    costEstimation_analysisFees: { type: String },
    tax: { type: String },
    others: { type: String },
    total: { type: String },
    costEstimation_tax: { type: String },
    costEstimation_others: { type: String },
    costEstimation_total: { type: String },
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
sampleSchema.plugin(AutoIncrement, { inc_field: 'id', start_seq: 1, disable_hooks: true });

const Sample = models.Sample || mongoose.model("Sample", sampleSchema);
export default Sample;
