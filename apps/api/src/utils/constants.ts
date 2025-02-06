export const SCHEMA_NAMES = {
  PATIENT: "Patient",
  APPOINTMENT: "Appointment",
  CALL_SESSION: "CallSession",
  WORKFLOW: "Workflow",
  PROVIDER: "Provider",
};

export const AGENT_TYPES = {
  SCHEDULING: "Scheduling",
  REMINDER: "Reminder",
  INQUIRY: "Inquiry"
};
export const CALL_TYPE = {

  INBOUND: "Inbound",
  OUTBOUND: "Outbound"
};

export const CALL_STATUS = {
  INITIATED: "Initiated",
  CONNECTED: "Connected",
  FAILED: "Failed",
  NO_ANSWER: "No Answer",
  COMPLETED: "Completed"
};

export const WORKFLOW_STAGES = {
  NOT_CONTCATED: "Not Contacted",
  CONTACTED: "Contacted",
  SCHEDULED: "Scheduled",
  REMINDED: "Reminded",
  PAYMENT_COLLECTED: "Payment Collected",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled"
};

export const PAYMENT_STATUS = {
  PENDING: "Pending",
  COMPLETED: "Completed",
  FAILED: "Failed"
};

export const APPOINTMENT_STATUS = {
  NOT_CONTACTED: "Not Contacted",
  CONTACTED: "Contacted",
  REMINDED: "Reminded",
  SCHEDULED: "Scheduled",
  CANCELLED: "Cancelled",
  COMPLETED: "Completed"
};

export const APPOINTMENT_TYPES = {
  INPERSON: "Inperson",
  ONLINE: "Online",
  TELEPHONE: "Telephone",
  VIDEO: "Video",
};