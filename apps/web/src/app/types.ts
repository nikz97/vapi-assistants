export interface Patient {
    id: string;
    name: string;
    age: number;
    status: string;
    lastContacted?: Date;
    phoneNumber: string;
}