export interface Patient {
    patientId: string;
    name: string;
    age: number;
    status: string;
    lastContacted?: Date;
    phoneNumber: string;
}