import { notFoundError } from '../../errors';
import enrollmentRepository from '../../repositories/enrollment-repository';
import ticketsRepository from '../../repositories/ticket-repository';

async function getAllTicketsTypes() {
  return await ticketsRepository.getAllTicketsTypes();
}

async function getTicket(userId: number) {
  const ticket = await ticketsRepository.getTicket(userId);

  if (!ticket) throw notFoundError();
  return ticket;
}

async function createTicket(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) throw notFoundError();

  return await ticketsRepository.createTicket(ticketTypeId, enrollment.id);
}

const ticketsService = {
  getAllTicketsTypes,
  getTicket,
  createTicket,
};

export default ticketsService;
