import express, { Request, Response } from "express";
import dotenv from "dotenv";
import CONFIG from "./config";
import getDb from "./services/mongodb";
import logger from "./utils/logger";
import { vapiRoute } from "./modules/vapi/vapi.route";
import { BullBoard } from "./services/bullmq";
import { patientRoute } from "./modules/patients/patients.route";

dotenv.config();

const app = express(); 

// Body Parser middleware
app.use(express.json({ limit: "5mb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "5mb",
  }),
);
app.get("/", (req: Request, res: Response) => {
  res.send("Hey! How you doing"); // Placeholder
});

vapiRoute(app);
BullBoard(app);
patientRoute(app);

(async () => {
    // Initialise Mongo
    getDb();
    app.listen(CONFIG.PORT || 3000, () =>
      logger.log("info", `Started listening on port:${CONFIG.PORT || 3000}`),
    );
  })();
