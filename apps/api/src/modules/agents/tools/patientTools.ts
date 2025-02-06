import { Patient } from "../../../services/mongodb";

export async function updatePatientData(extractedData: any) {
    const patientId = extractedData.patientId;

    //fetch from patient collection
    const patient = await Patient.findOne({ patientId });  
    if(!patient) {
        throw new Error("Patient Id not found in the extracted data");
    }

    // Validate Patient data 
    const patientData = {
        name: extractedData.name,
        age: extractedData.age,
        paymentDetails: extractedData.paymentDetails,
        address: extractedData.address,
        phoneNumber: extractedData.phoneNumber
    }

    // Update the document
    await Patient.updateOne({ patientId },
         { $set: patientData });

    return patientData;
}
