import Express from 'express';
import { vapiCallbackHandler } from './vapi.controller';

const ROUTE_BASE = 'api/v1/vapi/webhook'
export const vapiRoute = (app: Express.Application) => {
     // Vapi Webhook Routes
  app.post(
    `${ROUTE_BASE}/vapi/callback`,
    vapiCallbackHandler,
  );

  
  return app;
}