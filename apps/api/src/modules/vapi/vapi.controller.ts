import logger from "../../utils/logger";
import { Request, Response } from "express";
import { CallbackManager } from "./vapi.handler";

export async function vapiCallbackHandler(
    req: Request,
    res: Response,
  ): Promise<void> {
    const sessionId = req.query.session || req.body.session;
    logger.info(
      `Callback received from Vapi with sessionId ${sessionId}: ${JSON.stringify(req.body)}`,
    );
  
    try {
      const payload = req.body.message;
      const result = await CallbackManager.handleVapiCallback(sessionId, payload);
      res.status(201).json(result);
    } catch (error) {
      logger.error("Error in handleCallback: " + error);
      res.status(500).send({
        message: "Something went wrong: " + error,
      });
    }
}