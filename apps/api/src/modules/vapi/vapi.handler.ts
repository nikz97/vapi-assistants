import logger from "../../utils/logger";
import SessionManager from "../session-manager";
import { endOfCallReportHandler } from "./end-of-call-report";

import { VapiWebhookEnum } from "./types";


export class CallbackManager {
    constructor() {}
  
    public static async handleVapiCallback(
      sessionId: string,
      payload: any,
    ): Promise<any> {
      const sessionManager: SessionManager =
        await SessionManager.fetchSession(sessionId);
  
      logger.info(
        `Processing callback with type ${payload.type} for session ${sessionId}`,
      );
  
      switch (payload.type) {
        case VapiWebhookEnum.END_OF_CALL_REPORT:
          return await endOfCallReportHandler(sessionManager, payload);
  
        default:
          logger.error(`Unhandled message type: ${payload.type}`);
          throw new Error(`Unhandled message type`);
      }
    }
  }
  