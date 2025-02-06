import { Request, Response } from "express";
import logger from "../../utils/logger";
import { getPatientById, getPatients } from ".";
import { VapiService } from "../../services/vapi";
import { AGENT_TYPES } from "../../utils/constants";

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
        const assistant = await vapiService.createVapiAssistant(patientId, patient.systemPrompt, patient.vapiConfig);
        await vapiService.initiateCall({callType: AGENT_TYPES.SCHEDULING,  assistantId: assistant.id});
      res.status(201).json({message: `Workflow Initiated for ${patient}`});
    } catch (error) {
      logger.error("Error in workflow: " + error);
      res.status(500).send({
        message: "Something went wrong: " + error,
      });
    }
}