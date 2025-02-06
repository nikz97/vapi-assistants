import { Request, Response } from "express";
import logger from "../../utils/logger";
import { addPatient, getPatientById, getPatients } from ".";
import { VapiService } from "../../services/vapi";
import { AGENT_TYPES } from "../../utils/constants";
import { getOutboundSchedulingPrompt, getVapiReminderPrompt, VAPI_INBOUND_SYSTEM_PROMPT } from "../vapi/prompts";

const vapiService = new VapiService();

export async function getAllPatients(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const patients = await getPatients();
      res.status(201).json(patients);
    } catch (error) {
      logger.error("Error in handleCallback: " + error);
      res.status(500).send({
        message: "Something went wrong: " + error,
      });
    }
}

export async function initiateWorkflow(
    req: Request,
    res: Response,
  ): Promise<void> {
    const patientId = req.body.patientId;
    try {
      const patient: any = await getPatientById(patientId);
        if(!patient) {
            throw new Error("Patient Id not found in the extracted data");
        }
      if(patient.status !== "NOT_CONTACTED") {
        throw new Error("Patient is already contacted");
      }
        // initiate call
        const systemPrompt = getOutboundSchedulingPrompt(patient);
        const assistant = await vapiService.createVapiAssistant(patientId, systemPrompt);
        await vapiService.initiateCall({callType: AGENT_TYPES.SCHEDULING,  assistantId: assistant.id});
      res.status(201).json({message: `Workflow Initiated for ${patient}`});
    } catch (error) {
      logger.error("Error in workflow: " + error);
      res.status(500).send({
        message: "Something went wrong: " + error,
      });
    }
}

export async function createPatient(req: Request, res: Response): Promise<void> {
    try {
        const patient = await addPatient(req.body);
        res.status(201).json(patient);
    } catch (error) {
        logger.error("Error in adding patient: " + error);
        res.status(500).send({
            message: "Something went wrong: " + error,
        });
    }
}

export async function initiateReminder(
    req: Request,
    res: Response,
  ): Promise<void> {
    const patientId = req.body.patientId;
    const appointmentId = req.body.appointmentId;
    try {
      const patient: any = await getPatientById(patientId);
      const appointment = patient.appointments.find((appt: any) => appt.id === appointmentId);

      if(!patient) {
        throw new Error("Patient Id not found in the extracted data");
      }
      if(!["SCHEDULED","REMINDED", "PAYMENT_COLLECTED"].includes(patient.status)) {
        throw new Error("Invlaid status to initiate reminder");
      }
      const systemPrompt = getVapiReminderPrompt(patient, appointment);
      const assistant = await vapiService.createVapiAssistant(patientId, systemPrompt, patient.vapiConfig);
      const call = await vapiService.initiateCall({callType: AGENT_TYPES.REMINDER,  assistantId: assistant.id});
      res.status(201).json({message: `Reminder Initiated for ${patient}`});
    } catch (error) {
      logger.error("Error in workflow: " + error);
      res.status(500).send({
        message: "Something went wrong: " + error,
      });
    }
}