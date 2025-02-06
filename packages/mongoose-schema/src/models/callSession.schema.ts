import mongoose, { Schema } from "mongoose";
import { CALL_TYPE, SCHEMA_NAMES } from "../config/constants";

export const callSessionSchema = new Schema({
    workflow: { type: Schema.Types.ObjectId, ref: SCHEMA_NAMES.WORKFLOW, required: true },
    AGENT_TYPES: { type: String, required: true },
    CALL_TYPE: { type: String, CALL_TYPE, required: true },
    phoneNumber: { type: String, required: true },
    duration: { type: Number, required: true }, // To be decided
    status: { type: String, required: true },
    transcript: { type: Schema.Types.Mixed },
    errorDetails: { type: String }
},{
    timestamps: true
});

export const CallSession = mongoose.model(SCHEMA_NAMES.CALL_SESSION, callSessionSchema);
