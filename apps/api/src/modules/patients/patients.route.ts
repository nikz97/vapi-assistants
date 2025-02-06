import Express from 'express';
import { createPatient, getAllPatients, initiateReminder, initiateWorkflow } from './patient.controller';


const ROUTE_BASE = 'api/v1/patient'
export const patientRoute = (app: Express.Application) => {
     // Vapi Webhook Routes
     app.get(
        `${ROUTE_BASE}/getAllPatients`,
          getAllPatients
      );
    
      app.post(
        `${ROUTE_BASE}/initiateWorkflow`,
        initiateWorkflow,
      );
    
      app.post(
        `${ROUTE_BASE}/addPatient`,
        createPatient
      );

      app.post(
        `${ROUTE_BASE}/initiateReminder`,
        initiateReminder
      )
  return app;
}
