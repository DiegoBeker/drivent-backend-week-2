import { Prisma } from '@prisma/client';
import { notFoundError, unauthorizedError } from '../../errors';
import { PaymentBody } from '../../protocols';
import paymentsRepository from '../../repositories/payment-repository';
import ticketsRepository from '../../repositories/ticket-repository';

async function getTicketPayment(ticketId: number, userId: number) {
  const ticket = await ticketsRepository.getTicketById(ticketId);

  if (!ticket) {
    throw notFoundError();
  }
  if (userId !== ticket.Enrollment.userId) {
    throw unauthorizedError();
  }

  const payment = await paymentsRepository.getTicketPayment(ticketId);

  return payment;
}

async function processPayment(body: PaymentBody, userId: number) {
  // console.log('service');
  const cardLastDigits = body.cardData.number.toString().slice(-4);
  // console.log(cardLastDigits);
  // console.log(userId);
  const ticket = await ticketsRepository.getTicketById(body.ticketId);
  // console.log({ ticket });
  if (!ticket) {
    throw notFoundError();
  }

  if (userId !== ticket.Enrollment.userId) {
    throw unauthorizedError();
  }
  const ticketWithprice = await ticketsRepository.getTicket(userId);

  const data: Prisma.PaymentUncheckedCreateInput = {
    cardIssuer: body.cardData.issuer,
    cardLastDigits,
    ticketId: body.ticketId,
    value: ticketWithprice.TicketType.price,
  };

  const process = await paymentsRepository.processPayment(data);

  await ticketsRepository.processTicketStatus(ticket.id);

  return process;
}

const paymentsService = {
  getTicketPayment,
  processPayment,
};

export default paymentsService;
