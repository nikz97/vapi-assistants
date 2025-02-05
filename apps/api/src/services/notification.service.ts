import logger from "../utils/logger";


export async function notifyHumans(
    notificationData: any,
    reason: string,
  ) {
    if (!notificationData) {
      logger.error("No notificatio data found to notify.");
      return;
    }
  
    // const email = USE AN OPENSOURCE or TWILLIO SDK for SENDING EMAILS
    
}
  