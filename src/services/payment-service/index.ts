import { notFoundError } from '@/errors';
import paymentRepository from '@/repositories/payment-repository';
import ticketRepository from '@/repositories/tickets-repository';
import { PaymentDetails } from '@prisma/client';

export type CreatePaymentData = Omit<PaymentDetails, 'id'>;

async function insertPaymentDetails(userId: number) {
  const tickets = await ticketRepository.getUserTicket(userId);
  if (!tickets) throw notFoundError();

  const paymentData: CreatePaymentData = {
    userTicketId: tickets.id,
    totalValue: tickets.Ticket.price + (tickets.Optional ? tickets.Optional.price : 0),
    paymentDate: new Date(Date.now()),
    isPaid: false,
  };

  await paymentRepository.insertPaymentDetails(paymentData);
}

const paymentService = {
  insertPaymentDetails,
};

export default paymentService;
