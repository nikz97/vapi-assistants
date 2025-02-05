import OpenAI from "openai";
import logger from "../../utils/logger.js";
import CONFIG from "../../config/index.js";
import {
  ChatCompletion,
  ChatCompletionCreateParamsNonStreaming,
  ChatCompletionMessageParam,
} from "openai/resources/index.mjs";
import { EXTRACT_DATA_FROM_TRANSCRIPT_SYSTEM_PROMPT } from "./prompts.js";

export class ProcessTranscript {
  private openAi: OpenAI;
  private jsonExtractionSystemPrompt: string;
  private model = "gpt-4-turbo";
  private temperature = 0.1;
  private maxTokens = 1000;

  constructor(jsonExtractionSystemPrompt?: string) {
    this.openAi = new OpenAI({
      apiKey: CONFIG.OPENAI_KEY,
    });

    this.jsonExtractionSystemPrompt = jsonExtractionSystemPrompt || EXTRACT_DATA_FROM_TRANSCRIPT_SYSTEM_PROMPT;
  }

  async getStructuredJsonData(userQuery: string) {
    try {
      const messages = [
        this.getMessage("system", this.jsonExtractionSystemPrompt),
        this.getMessage("user", userQuery),
      ];

      const completion: ChatCompletion = await this.getChatCompletion(messages);

      logger.debug(`Response from OpenAI: ${JSON.stringify(completion)}`);

      const message = completion.choices[0]!.message;
      messages.push(message);
      logger.debug(`Generated message: ${JSON.stringify(message)}`);

      return message.content;
    } catch (err) {
      logger.error(`Failed to make OpenAI call: ${err}`);
    }
  }

  private async getChatCompletion(messages: ChatCompletionMessageParam[]) {
    try {
      const params: ChatCompletionCreateParamsNonStreaming = {
        model: this.model,
        messages: messages,
        temperature: this.temperature,
        max_tokens: this.maxTokens,
      };

      logger.debug(`Made OpenAI call with params: ${JSON.stringify(params)}`);

      return await this.openAi.chat.completions.create(params);
    } catch (err) {
      logger.error(`Failed to get response from OpenAI: ${err}`);
      throw err;
    }
  }

  getMessage(role: string, content: string) {
    return {
      role,
      content,
    } as ChatCompletionMessageParam;
  }
}