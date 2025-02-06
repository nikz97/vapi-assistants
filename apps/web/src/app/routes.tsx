import { Patient } from "./types";

export async function getPatients(): Promise<Patient[]> {
    try{
        const response = await fetch(`/api/patients/getAllPatients`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        // if(!response.ok) {
        //     throw new Error("Failed to initiate workflow");
        // }

        const patients: Patient[] = [
            { id: '1', name: 'John Doe', age: 30, phoneNumber: '123-456-7890', status: 'NOT_CONTACTED' },
            { id: '2', name: 'Amina Smith', age: 25, phoneNumber: '987-654-3210', status: 'CONTACTED' },
            { id: '3', name: 'Ann Marie', age: 30, phoneNumber: '123-456-7890', status: 'NOT_CONTACTED' },
            { id: '4', name: 'Ron Smith', age: 25, phoneNumber: '987-654-3210', status: 'CONTACTED' },
            { id: '5', name: 'John Doe', age: 30, phoneNumber: '123-456-7890', status: 'NOT_CONTACTED' },
            { id: '6', name: 'Nikhil Smith', age: 25, phoneNumber: '987-654-3210', status: 'CONTACTED' },
            { id: '7', name: 'Rohit Doe', age: 30, phoneNumber: '123-456-7890', status: 'NOT_CONTACTED' },
            { id: '8', name: 'Rahul Smith', age: 25, phoneNumber: '987-654-3210', status: 'CONTACTED' },
            { id: '9', name: 'Jain Doe', age: 30, phoneNumber: '123-456-7890', status: 'NOT_CONTACTED' },
            { id: '10', name: 'Ishan Smith', age: 25, phoneNumber: '987-654-3210', status: 'CONTACTED' },
            { id: '11', name: 'Tim Doe', age: 30, phoneNumber: '123-456-7890', status: 'NOT_CONTACTED' },
            { id: '12', name: 'Mohammed Smith', age: 25, phoneNumber: '987-654-3210', status: 'CONTACTED' },
            { id: '13', name: 'Kumar Doe', age: 30, phoneNumber: '123-456-7890', status: 'NOT_CONTACTED' },
            { id: '14', name: 'Gokul Smith', age: 25, phoneNumber: '987-654-3210', status: 'CONTACTED' },
            { id: '15', name: 'Kate Doe', age: 30, phoneNumber: '123-456-7890', status: 'NOT_CONTACTED' },
            { id: '16', name: 'Charlie Smith', age: 25, phoneNumber: '987-654-3210', status: 'CONTACTED' },
            { id: '17', name: 'Animesh Doe', age: 30, phoneNumber: '123-456-7890', status: 'NOT_CONTACTED' },
            { id: '18', name: 'Anna Smith', age: 25, phoneNumber: '987-654-3210', status: 'CONTACTED' },
            { id: '19', name: 'Nami Doe', age: 30, phoneNumber: '123-456-7890', status: 'NOT_CONTACTED' },
            { id: '20', name: 'Reo Smith', age: 25, phoneNumber: '987-654-3210', status: 'CONTACTED' },
          ];
    
        return patients;
        const data = await response.json();
        return data;
    } catch(e) {
        console.log(e);
        return [];
    }
    
}

export async function initiateWorkflow(patientId: string) {
    try{
        const response = await fetch(`/api/workflow/initiate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ patientId }),
        });
        if(!response.ok) {
            throw new Error("Failed to initiate workflow");
        }

        const data = await response.json();
        return data;
    } catch(error) {
        console.log(error);
    }
}