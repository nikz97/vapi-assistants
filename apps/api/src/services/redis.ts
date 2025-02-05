import { createClient, RedisClientType } from "redis";
import CONFIG from "../config/index.js";
import logger from "../utils/logger.js";

// Singleton Redis client manager
class RedisClientManager {
  private static client: RedisClientType | null = null;
  private static redisUrl: string =
    CONFIG.NODE_ENV === "local" ? "redis://localhost:6379" : CONFIG.REDIS_URL;

  static async getClient(): Promise<RedisClientType> {
    if (!this.client) {
      this.client = createClient({ url: this.redisUrl });

      this.client.on("error", (err) => logger.error("Redis Client Error", err));
      this.client.on("end", () => logger.warn("Redis Client Disconnected"));
      this.client.on("reconnecting", () =>
        logger.info("Redis Client Reconnecting"),
      );
      this.client.on("ready", () => logger.info("Redis Client Ready"));

      try {
        await this.client.connect();
        logger.info(`Connected to Redis at ${this.redisUrl}`);
      } catch (err) {
        logger.error("Failed to connect to Redis", err);
        throw err;
      }
    }
    return this.client;
  }

  static async closeClient(): Promise<void> {
    if (this.client) {
      try {
        await this.client.quit();
        logger.info("Redis client closed successfully");
      } catch (err) {
        logger.error("Error closing Redis client", err);
      } finally {
        this.client = null;
      }
    }
  }
}

// Ensure the client is closed when the application exits
process.on("SIGINT", async () => {
  await RedisClientManager.closeClient();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await RedisClientManager.closeClient();
  process.exit(0);
});

export default RedisClientManager;
