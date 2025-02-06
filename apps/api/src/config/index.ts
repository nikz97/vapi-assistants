import dotenv from "dotenv";
dotenv.config();

interface EnvConfig {
  PORT?: number;
  NODE_ENV?: string;
  MONGODB_URI?: string;
  WHITELIST?: string;
  REDIS_URL?: string;
  OPENAI_KEY?: string;
  PORTKEY_KEY?: string;
  VAPI_KEY?: string;
  NGROK_URL?: string;
  SCHEDULING_ASSISTANT_ID?: string;
  REMINDER_AND_PAYMENT_ASSISTANT_ID?: string;
  OUTBOUNT_ENQUIRY_ASSISTANT_ID?: string;
}

let envConfig: EnvConfig = {};
try {
  envConfig = JSON.parse(process.env.ENV || "{}") as EnvConfig; // Default to empty object if ENV is not set
} catch (error) {
  console.log("Error parsing ENV:", error);
}

// Create the CONFIG object
const CONFIG = {
  PORT: envConfig.PORT || process.env.PORT || 3000,
  NODE_ENV: envConfig.NODE_ENV || process.env.NODE_ENV || "local",
  MONGODB_URI:
    envConfig.MONGODB_URI ||
    process.env.MONGODB_URI ||
    "mongodb+srv://yourusername:yourpassword@yourcluster.mongodb.net/yourdb",
  REDIS_URL:
    envConfig.REDIS_URL || process.env.REDIS_URL || "redis://localhost:6379",
  WHITELIST:
    envConfig.WHITELIST ||
    process.env.WHITELIST ||
    "http://localhost:3000",
  OPENAI_KEY:
    envConfig.OPENAI_KEY || process.env.OPENAI_KEY || "your_openai_api_key",
  PORTKEY_KEY:
    envConfig.PORTKEY_KEY || process.env.PORTKEY_KEY || "your_portkey_api_key",
  VAPI_KEY:
    envConfig.VAPI_KEY || process.env.VAPI_KEY || "your_vapi_api_key",
  NGROK_URL: envConfig.NGROK_URL || process.env.NGROK_URL || "http://localhost:4040",
  SCHEDULING_ASSISTANT_ID:
    envConfig.SCHEDULING_ASSISTANT_ID ||
    process.env.SCHEDULING_ASSISTANT_ID ||
    "your_scheduling_assistant_id",
  REMINDER_AND_PAYMENT_ASSISTANT_ID:
    envConfig.REMINDER_AND_PAYMENT_ASSISTANT_ID ||
    process.env.REMINDER_AND_PAYMENT_ASSISTANT_ID ||
    "your_reminder_and_payment_assistant_id",
  OUTBOUNT_ENQUIRY_ASSISTANT_ID:
    envConfig.OUTBOUNT_ENQUIRY_ASSISTANT_ID ||  
    process.env.OUTBOUNT_ENQUIRY_ASSISTANT_ID ||  
    "your_outbount_enquiry_assistant_id",
};

export default CONFIG;
