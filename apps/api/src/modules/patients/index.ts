import { Patient } from "../../services/mongodb";

export async function getPatients() {
    try {
        const patients = await Patient.find();
        return patients;
    } catch (error) {
        return error;
    }
}

export async function getPatientById(patientId: string) {
    try {
        const patient = await Patient.findOne({ patientId });
        return patient;
    } catch (error) {
        return error;
    }
}

export async function addPatient(patientData: any) {
    try {
        const patient = await Patient.create(patientData);
        return patient;
    } catch (error) {
        return error;
    }
}