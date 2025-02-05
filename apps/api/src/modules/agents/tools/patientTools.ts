
export async function updatePatientData(extractedData: any) {
    const patientId = extractedData.patientId;

    // const patient = await Patient.findOne({ _id: patientId });  fetch from patient collection
    if(!patientId) {
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
    //Update the document
    // await Patient.updateOne({ _id: patientId },
    //      { $set: patientData });

    return patientData;
}
