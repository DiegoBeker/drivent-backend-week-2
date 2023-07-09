import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '../middlewares';
import ticketsService from '../services/tickets-service';

async function getAllTicketsTypes(req: AuthenticatedRequest, res: Response) {
  const ticketsTypes = await ticketsService.getAllTicketsTypes();
  if (!ticketsTypes) res.send([]);
  return res.send(ticketsTypes);
}

async function getTicket(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const ticket = await ticketsService.getTicket(userId);
  return res.send(ticket);
}

async function createTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body;
  const userId = req.userId;

  if (!ticketTypeId) res.sendStatus(httpStatus.BAD_REQUEST);

  const newTicket = await ticketsService.createTicket(userId, ticketTypeId);

  return res.status(httpStatus.CREATED).send(newTicket);
}

const ticketsController = {
  getAllTicketsTypes,
  getTicket,
  createTicket,
};

export default ticketsController;
