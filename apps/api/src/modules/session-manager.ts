

import { randomUUID } from 'crypto';
import logger from '../utils/logger';
import RedisClientManager from '../services/redis';


interface SessionConfig {
  id?: string;
  callSessionStatus?: string
  vapiCallReport?: any
  // Add other session properties as needed
}

class SessionManager {
  sessionConfig: SessionConfig;
  id: string;

  constructor(config: SessionConfig) {
    this.id = config.id || randomUUID();
    this.sessionConfig = { ...config, id: this.id };
  }

  static async initiateNewSession(session: SessionConfig): Promise<SessionManager> {
    const manager = new SessionManager(session);
    logger.debug(`Initiating new session with config: ${JSON.stringify(session)}`);
    
    try {
      await manager.saveSessionToRedis(session);
      logger.info(`Session created and saved to Redis: ${manager.id}`);
    } catch (error) {
      logger.error(`Failed to save session to Redis: ${error}`);
    }
    
    logger.debug(`Returning session manager with ID: ${manager.id}`);
    return manager;
  }

//   async saveSessionToRedis(session?: SessionConfig) {
//     try {
//       await saveSessionToRedis(session ? session : this.sessionConfig);
//     } catch (error) {
//       logger.error("Failed to save session to Redis:", error);
//     }
//   }

  async saveSessionToRedis(sessionConfig: SessionConfig) {
    try {
      const redisClient = await RedisClientManager.getClient();
      const sessionId = sessionConfig.id;
      if (!redisClient) {
        throw new Error("Redis client is not available");
      }
      if (!sessionId) {
        throw new Error("Session ID is undefined");
      }
  
      const sessionData = JSON.stringify(sessionConfig);
      await redisClient.set(SessionManager.getRedisKeyForSessionId(sessionId), sessionData);
      logger.info(`Session ${sessionId} saved to Redis successfully`);
    } catch (error) {
      logger.error("Failed to save session to Redis:", error);
    }
  };
  static async fetchSession(sessionId: string): Promise<SessionManager> {
    try {
      const redisClient = await RedisClientManager.getClient();
      const sessionDataString = await redisClient.get(SessionManager.getRedisKeyForSessionId(sessionId));
      if (!sessionDataString) {
        throw new Error(`No session found for ID ${sessionId}`);
      }
      const sessionData = JSON.parse(sessionDataString);
      return new SessionManager(sessionData);
    } catch (error) {
      logger.error(`Error fetching session: ${error}`);
      throw error;
    }
  }

  async getSessionFromRedis (
    sessionId: string,
  ): Promise<SessionConfig | null> {
    try {
      const redisClient = await RedisClientManager.getClient();
      const sessionDataString = await redisClient.get(
        SessionManager.getRedisKeyForSessionId(sessionId),
      );
  
      if (!sessionDataString) {
        logger.warn(`No session found for ID ${sessionId}`);
        return null;
      }
  
      const sessionData = JSON.parse(sessionDataString);
      return sessionData as SessionConfig;
    } catch (error) {
      logger.error("Failed to get session from Redis:", error);
      return null;
    }
  };

  static getRedisKeyForSessionId(sessionId: string): string {
    return `session:${sessionId}`;
  }

  async setSessionProperty<T extends keyof SessionConfig>(
    propertyName: T,
    propertyValue: SessionConfig[T],
  ): Promise<void> {
    const sessionData = await this.fetchSessionData();
    sessionData[propertyName] = propertyValue;
    await this.saveSessionToRedis(sessionData);
  }

  private async fetchSessionData(): Promise<SessionConfig> {
    const sessionData = await this.getSessionFromRedis(this.id);
    if (sessionData === null) {
      throw new Error(`Session with id ${this.id} not found`);
    }
    this.sessionConfig = sessionData;
    return sessionData;
  }
}

export default SessionManager;