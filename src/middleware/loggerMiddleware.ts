import express from 'express';
import { log } from "../helpers/log";

function loggerMiddleware(request: express.Request, response: express.Response, next: express.NextFunction) {
  log(`${request.method} ${request.path}`);
  next();
}

export {
  loggerMiddleware
}