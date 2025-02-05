export const EXTRACT_DATA_FROM_TRANSCRIPT_SYSTEM_PROMPT = `
Extract structured data in JSON format from the call transcript. Follow these guidelines:

- If data is not present in the transcript, mark the field as null
- Only respond with the JSON object, no additional text
- Dates should be in DD/MM/YYYY format
- Never guess values - if unsure, mark as null
- All fields must be present in the response, even if null

Required fields to extract:
{
  "patientName": string | null,
  "patientAddress": string | null, 
  "patientDOB": string | null,  // DD/MM/YYYY format
  "appointmentDate": string | null, // DD/MM/YYYY format
  "appointmentSlot": string | null, // HH:MM format
  "doctorToVisit": string | null,
  "appointmentType": string | null // Must be one of: INITIAL, FOLLOW_UP, PROCEDURE, CONSULTATION
}

Example response:
{
  "patientName": "John Doe",
  "patientAddress": "123 Main St, City, State 12345",
  "patientDOB": "01/01/1990",
  "appointmentDate": "15/02/2025",
  "appointmentSlot": "10:30",
  "doctorToVisit": "Dr. Smith",
  "appointmentType": "INITIAL"
}
`;