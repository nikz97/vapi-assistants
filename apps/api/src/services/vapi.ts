

import { VapiClient } from "@vapi-ai/server-sdk";
import CONFIG from "../config";
import { Patient, VapiAssistant } from "./types";
import { VapiWebhookEnum } from "../modules/vapi/types";
import axios from "axios";
const VAPI_BASE_URL = "https://api.vapi.ai";
export class VapiService {
  private client: VapiClient;

  constructor() {
    this.client = new VapiClient({ token: CONFIG.VAPI_KEY });
  }

  async createCall(callType: string, assistantId: string) {
    return await this.client.calls.create({
        name: callType,
        assistantId: assistantId,
    });
  }

  async initiateCall(callConfig: any) {
    // should create an agent or get created agent first
    const call = await this.createCall(callConfig.callType, callConfig.assistantId);
    return call;
  }

  async createVapiAssistant(
    sessionId: string,
    systemPrompt: string,
    vapiConfig: any
  ) : Promise<VapiAssistant> {
    try {
        const body = await this.getCreateAssistantBody(
            sessionId,
            systemPrompt,
            vapiConfig
        );

        const options = {
            headers: {
                Authorization: `Bearer ${CONFIG.VAPI_KEY}`,
                "Content-Type": "application/json",
            },
            data: body,
        };

        const response = await axios.post(
            `${VAPI_BASE_URL}/assistant`,
            body,
            options
        );

        return response.data as VapiAssistant;
    } catch (error) {
        console.error("Error creating assistant:", error);
        throw error;
    }
  }


  async getCreateAssistantBody(
    sessionId: string,
    systemPrompt: string,
    vapiConfig: any
  ) {
    return {
        name: sessionId,
        voice: {
            voiceId: vapiConfig.voice ?? "mellisa", // TODO: change this
            provider: vapiConfig.provider ?? "playht",
            speed: 0.9,
        },
        model: {
            model: vapiConfig.model ?? "gpt-4o",
            messages: [
                {
                    content: systemPrompt,
                    role: "system",
                },
            ],
            provider: "openai",

        },
        firstMessage: "Hello, this is Eva. A, from Adam's Clinic.",
        serverMessages: [
            VapiWebhookEnum.CONVERSATION_UPDATE,
            VapiWebhookEnum.STATUS_UPDATE,
            VapiWebhookEnum.END_OF_CALL_REPORT,
        ],
        serverUrl: `${CONFIG.NGROK_URL}/api/v1/vapi/webhook`,
    }
  }
}
