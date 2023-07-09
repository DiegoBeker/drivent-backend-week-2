import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '../middlewares';
import paymentsService from '../services/payments-service';

async function getTicketPayment(req: AuthenticatedRequest, res: Response) {
  const ticketId = parseInt(req.query.ticketId as string);
  const { userId } = req;

  try {
    if (!ticketId || isNaN(ticketId)) return res.sendStatus(httpStatus.BAD_REQUEST);

    const payment = await paymentsService.getTicketPayment(ticketId, userId);

    return res.send(payment);
  } catch (err) {
    if (err.name === 'UnauthorizedError') {
      return res.status(httpStatus.UNAUTHORIZED).send({
        message: err.message,
      });
    }
    if (err.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send({
        message: err.message,
      });
    }
  }
}

async function processPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { body } = req;

  if (!body.cardData || !body.ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);

  const result = await paymentsService.processPayment(body, userId);
  console.log({ result });
  return res.send(result);
}

const paymentsController = {
  getTicketPayment,
  processPayment,
};

export default paymentsController;
