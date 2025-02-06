export interface Patient {
    patientId: String;
    name: String;
    age: Number;
    paymentDetails?: any;
    insuranceDetails?: any,
    address?: any,
    phoneNumber: String,
    appointments: any,
    sendReminders: Boolean,
}

export interface VapiAssistant {
    id?: string;
    name?: string;
    voice?: {
        voiceId?: string;
        provider?: string;
        speed?: number;
    };
    model?: {
        model?: string;
        messages?: {
            content?: string;
            role?: string;
        }[];
        provider?: string;
    };
    serverMessages?: string[];
    serverUrl?: string;
}