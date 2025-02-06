import mongoose, { Schema } from "mongoose";
import { APPOINTMENT_STATUS, APPOINTMENT_TYPES, PAYMENT_STATUS, SCHEMA_NAMES, WORKFLOW_STAGES } from "../config/constants";

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
