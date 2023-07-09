import 'reflect-metadata';
import express, { Express } from 'express';
import 'express-async-errors';
import cors from 'cors';
import ticketsRouter from './routers/tickets-routers';
import paymentsRouter from './routers/payments-routes';
import { loadEnv, connectDb, disconnectDB } from '@/config';
import { handleApplicationErrors } from '@/middlewares';
import { usersRouter, authenticationRouter, eventsRouter, enrollmentsRouter } from '@/routers';

loadEnv();

const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/health', (_req, res) => res.send('OK!'))
  .use('/users', usersRouter)
  .use('/auth', authenticationRouter)
  .use('/event', eventsRouter)
  .use('/enrollments', enrollmentsRouter)
  .use('/tickets', ticketsRouter)
  .use('/payments', paymentsRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
