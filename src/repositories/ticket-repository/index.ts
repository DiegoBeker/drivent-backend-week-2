//import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function getAllTicketsTypes() {
  return await prisma.ticketType.findMany();
}

async function getTicket(userId: number) {
  return await prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId: userId,
      },
    },
    include: {
      TicketType: true,
    },
  });
}

async function getTicketById(id: number) {
  return await prisma.ticket.findFirst({
    where: {
      id,
    },
    include: {
      Enrollment: true,
    },
  });
}

async function createTicket(ticketTypeId: number, enrollmentId: number) {
  const ticket = await prisma.ticket.create({
    data: {
      status: 'RESERVED',
      ticketTypeId: ticketTypeId,
      enrollmentId: enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });

  return ticket;
}

async function processTicketStatus(ticketId: number) {
  return await prisma.ticket.update({
    data: {
      status: 'PAID',
    },
    where: {
      id: ticketId,
    },
  });
}

const ticketsRepository = {
  getAllTicketsTypes,
  getTicket,
  getTicketById,
  createTicket,
  processTicketStatus,
};

export default ticketsRepository;
