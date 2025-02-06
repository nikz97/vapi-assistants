import logger from "../../../utils/logger";
import { ProcessTranscript } from "../../agents/process-transcript";
import SessionManager from "../../session-manager";
import { CallSessionStatus } from "../../types";
import { EndOfCallReportPayload } from "../types";


export const endOfCallReportHandler = async (
    sessionManager: SessionManager,
    payload: EndOfCallReportPayload,
  ): Promise<void> => {
    await sessionManager.setSessionProperty("vapiCallReport", payload);
    await sessionManager.setSessionProperty(
      "callSessionStatus",
      CallSessionStatus.VAPI_AGENT_CALL_TRANSCRIPT_RECEIVED,
    );
  
    let extractedDetails;
  
    try {
      extractedDetails = await extractDataFromTranscript(
        payload.transcript || "",
      );
     
      await sessionManager.setSessionProperty(
        "callSessionStatus",
        CallSessionStatus.PROCESSED_TRANSCRIPT,
      );
    } catch (error) {
      // TODO: Why the fuck is this not working? Or is it working but not fast enough?!
      await sessionManager.setSessionProperty(
        "callSessionStatus",
        CallSessionStatus.FAILED_TO_PROCESS_TRANSCRIPT,
      );
      throw error;
    }

    return;
};

export async function extractDataFromTranscript(
    transcript: string,
    systemPrompt?: string,
  ) {
    try {
      const transcriptProcessor = new ProcessTranscript(systemPrompt);
      const structuredVerification =
        await transcriptProcessor.getStructuredJsonData(transcript);
  
      return structuredVerification;
    } catch (error) {
      logger.error("Error in extracting data from transcript: " + error);
      throw error;
    }
};

