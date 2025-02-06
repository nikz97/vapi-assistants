import mongoose, { Schema } from "mongoose";
import { APPOINTMENT_TYPES, PAYMENT_STATUS, SCHEMA_NAMES } from "../config/constants";

const appointmentSchema = new Schema({
    patientId: { type: Schema.Types.ObjectId, ref: SCHEMA_NAMES.PATIENT, required: true },
    provider: { type: Schema.Types.Mixed, ref: SCHEMA_NAMES.PROVIDER, required: true },
    appointmentDate: { type: Date, required: true },
    appointmentType: { type: String, required: true },
    status: { type: String, APPOINTMENT_TYPES, required: true },
    notes: { type: String },
    paymentStatus: { type: String, PAYMENT_STATUS, required: true },

},{
    timestamps: true
});

export const Appointment = mongoose.model(SCHEMA_NAMES.APPOINTMENT, appointmentSchema);
