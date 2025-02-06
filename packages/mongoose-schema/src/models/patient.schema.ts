import mongoose, { Schema } from "mongoose";
import { SCHEMA_NAMES } from "../config/constants";

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
