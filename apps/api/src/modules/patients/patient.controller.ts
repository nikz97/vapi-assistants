import { Request, Response } from "express";
import logger from "../../utils/logger";
import { getPatientById, getPatients } from ".";


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

      res.status(201).json(patient);
    } catch (error) {
      logger.error("Error in handleCallback: " + error);
      res.status(500).send({
        message: "Something went wrong: " + error,
      });
    }
}