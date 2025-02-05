import OpenAI from "openai";
import {
  ChatCompletion,
  ChatCompletionCreateParamsNonStreaming,
  ChatCompletionMessage,
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from "openai/resources/index.mjs";
import logger from "../../utils/logger.js";
import CONFIG from "../../config/index.js";

export class OpenAIManager {
  private client: OpenAI;
  private model = "gpt-4o";
  private temperature = 0.5;
  private maxTokens = 4096;

  constructor(model?: string, temperature?: number, maxTokens?: number) {
    this.client = new OpenAI({
      apiKey: CONFIG.OPENAI_KEY,
    });

    this.model = model || this.model;
    this.temperature = temperature || this.temperature;
    this.maxTokens = maxTokens || this.maxTokens;
  }

  async getOpenAiResponse(
    messages: ChatCompletionMessageParam[],
    tools?: ChatCompletionTool[],
  ) {
    try {
      const completion: ChatCompletion = await this.getChatCompletion(
        messages,
        tools,
      );

      logger.debug(`Response from OpenAI: ${JSON.stringify(completion)}`);

      const message: ChatCompletionMessage = completion.choices[0]!.message;
      return message;
    } catch (err) {
      logger.error(`Failed to make OpenAI call: ${err}`);
    }
  }

  private async getChatCompletion(
    messages: ChatCompletionMessageParam[],
    tools?: ChatCompletionTool[],
  ) {
    try {
      let params: ChatCompletionCreateParamsNonStreaming = {
        model: this.model,
        messages: messages,
        temperature: this.temperature,
        max_tokens: this.maxTokens,
      };

      if (tools) {
        params.tools = tools;
        params.tool_choice = "required";
      }

      logger.debug(`Made OpenAI call with params: ${JSON.stringify(params)}`);

      return await this.client.chat.completions.create(params);
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