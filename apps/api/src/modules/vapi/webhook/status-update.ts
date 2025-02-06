import SessionManager from "../../session-manager"
import { CallSessionStatus } from "../../types";
import { VAPI_CALL_STATUSES } from "../types";

export const statusUpdateHandler = async (
    SessionManager: SessionManager,
    payload: any
): Promise<any> => {
    if(!payload) {
        throw new Error("Payload data is missing");
    }

    if(payload.status === VAPI_CALL_STATUSES[4]) {
    await SessionManager.setSessionProperty(
        "callSessionStatus",
        CallSessionStatus.CALL_SESSION_SUCCESSFUL,
      );
    }
}