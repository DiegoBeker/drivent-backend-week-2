import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function getTicketPayment(ticketId: number) {
  const payment = await prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
  return payment;
}

async function processPayment(data: Prisma.PaymentUncheckedCreateInput) {
  return await prisma.payment.create({
    data,
  });
}

const paymentsRepository = {
  getTicketPayment,
  processPayment,
};

export default paymentsRepository;
