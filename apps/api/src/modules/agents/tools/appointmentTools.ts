
/**
 * These are the list of tools that the Appointmnents agent can call based on the type of the tool call.
 * The tools are defined in the prompts.ts file
 * 
**/

export enum AppointmentsToolCallEnum {
    CREATE_APPOINTMENT = 'CREATE_APPOINTMENT',
    UPDATE_APPOINTMENT = 'UPDATE_APPOINTMENT',
    CANCEL_APPOINTMENT = 'CANCEL_APPOINTMENT',
}

export async function createAppointment( extractedData: any) {
    //TODO: Create an appointment from the extracted data
    //Store in Appointments Collection
    //Return the appointment object
}

export async function updateAppointment( appointmentId: string, extractedData: any) {
    //TODO: Update an appointment from the extracted data
    //Store in Appointments Collection
    //Return the appointment object
}

export async function cancelAppointment( appointmentId: string) {
    //TODO: Cancel an appointment
    //Store in Appointments Collection
    //Return the appointment object
}