// mongodb.ts
import mongoose, { Schema } from "mongoose";
import logger from "./../utils/logger.js";
import CONFIG from "./../config/index.js";
import { APPOINTMENT_STATUS, SCHEMA_NAMES, WORKFLOW_STAGES } from "../utils/constants.js";

mongoose.set('bufferTimeoutMS', 30000);  // Increase buffer timeout

let isConnected = false;

const connectDB = async () => {
  try {
    if (!isConnected) {
      logger.log("info", "Attempting to connect to MongoDB...");
      logger.log("info", `Connection URI: ${CONFIG.MONGODB_URI.replace(/\/\/[^@]+@/, '//<credentials>@')}`);

      const connection = await mongoose.connect(CONFIG.MONGODB_URI);
      
      // Test the connection
      await connection.connection.db?.admin().ping();
      
      isConnected = true;
      logger.log("info", "MongoDB connection successful and verified");
    }
    return mongoose.connection;
  } catch (error) {
    isConnected = false;
    logger.log("error", `MongoDB connection error: ${error}`);
    throw error;
  }
};

mongoose.connection.on('connected', () => {
  logger.log("info", "Mongoose 'connected' event fired");
  isConnected = true;
});

mongoose.connection.on('disconnected', () => {
  logger.log("warn", "Mongoose 'disconnected' event fired");
  isConnected = false;
});

mongoose.connection.on('error', (error) => {
  logger.log("error", `Mongoose error event: ${error}`);
  isConnected = false;
});

export const getDb = async () => {
  if (!isConnected || mongoose.connection.readyState !== 1) {
    logger.log("info", `Reconnecting to MongoDB (current state: ${mongoose.connection.readyState})`);
    return connectDB();
  }
  return mongoose.connection;
};

const patientSchema = new Schema({
  patientId: String,
  name: String,
  age: Number,
  paymentDetails: [{ type: Schema.Types.Mixed }],
  insuranceDetails: [{ type: Schema.Types.Mixed}],
  address: [{ type: Schema.Types.Mixed}],
  phoneNumber: String,
  appointments: [{ type: Schema.Types.Mixed }],
  sendReminders: Boolean,
  status: String,
},{
  timestamps: true
});

export const Patient = mongoose.model(SCHEMA_NAMES.PATIENT, patientSchema);

const workflowSchema = new Schema({
  patient: { type: Schema.Types.Mixed, ref: SCHEMA_NAMES.PATIENT, required: true },
  provider: { type: Schema.Types.Mixed, ref: SCHEMA_NAMES.PROVIDER, required: true },
  appointment: { type:Schema.Types.Mixed, ref: SCHEMA_NAMES.APPOINTMENT, required: true },
  appointmentType: { type: String, required: true },
  status: { type: String, APPOINTMENT_STATUS, default: APPOINTMENT_STATUS.NOT_CONTACTED, required: true },
  currentStage: { type: String, WORKFLOW_STAGES, default: WORKFLOW_STAGES.NOT_CONTCATED, required: true },
  nextStage: { type: String, WORKFLOW_STAGES },
  errorDetails: { type: String },
},{
  timestamps: true
});

export const Workflow = mongoose.model(SCHEMA_NAMES.WORKFLOW, workflowSchema);

export default getDb;