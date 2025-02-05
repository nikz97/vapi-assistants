import CONFIG from "../config";
import logger from "../utils/logger";
import { Redis } from "ioredis";
import { Queue, Worker, WorkerOptions, Job } from "bullmq";
import { JOBS, QUEUE } from "../config/constants";
import express from "express";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter.js";
import { ExpressAdapter } from "@bull-board/express";
import { createBullBoard } from "@bull-board/api";
// Redis connection setup
const redisUrl: string =
  CONFIG.NODE_ENV === "local" ? "redis://localhost:6379" : CONFIG.REDIS_URL;
logger.debug(`Redis URL: ${redisUrl}`);

const connection = new Redis(redisUrl, {
  maxRetriesPerRequest: null,
  connectTimeout: 10000,
});

// Add an error listener to handle possible connection errors
connection.on("error", (err) => {
  logger.error(`Redis connection error: ${err}`);
});

export interface WorkerResult {
    data?: any;
    error?: {
      message: any;
      type: string;
      rateLimitTimeout?: number;
    };
}

export const createQueue = (queueName: string): Queue => {
    const queue = new Queue(queueName, { connection });
    logger.debug(`Created queue: ${queueName}`);
    return queue;
};

export const notificationQueue = createQueue(QUEUE.NOTIFICATION);

export const createWorker = (
    queueName: string,
    processFunction: (job: Job) => Promise<WorkerResult>,
    workerName: string,
  ): Worker => {
    logger.debug(`Creating worker for queue: ${queueName}`);
  
    const defaultOpts = {
      connection,
      name: workerName,
      rateLimitMax: 1,
      rateLimitInterval: 2000,
    };
  
  
    const worker = new Worker(
      queueName,
      async (job: Job) => {
        const result = await processFunction(job);
  
        if (result.error) {
          logger.error(
            `Worker ${workerName} failed with error: ${result.error.message}`,
          );
          throw new Error(result.error.message);
        }

        return result;
      },
      defaultOpts,
    );
  
    return worker;
};

const notificationJobProcessor = async (job: Job): Promise<WorkerResult> => {
    logger.debug(`Processing Notification job: ${job.name}`);
    switch (job.name) {
      case JOBS.NOTIFICATION_EMAIL:
        // return initiateJob(job);
      default:
        logger.error(`Unknown job type in Notification queue: ${job.name}`);
        throw new Error(`Unknown job type: ${job.name}`);
    }
};

export const BullBoard = (app: express.Application) => {
    const bullServerAdapter = new ExpressAdapter();
    bullServerAdapter.setBasePath("/admin/queues");
  
    const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
      queues: [
        new BullMQAdapter(notificationQueue),
      ],
      serverAdapter: bullServerAdapter,
    });
  
    app.use("/admin/queues", bullServerAdapter.getRouter());
  };
  