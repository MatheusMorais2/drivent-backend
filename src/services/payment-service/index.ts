import { notFoundError } from '@/errors';
// import paymentRepository from '@/repositories/payment-repository';
import ticketRepository from '@/repositories/tickets-repository';

async function insertPaymentDetails(userId: number) {
  const tickets = await ticketRepository.getUserTicket(userId);
  if (!tickets) throw notFoundError();

  // await paymentRepository.insertPaymentDetails(tickets.id);
}

const paymentService = {
  insertPaymentDetails,
};

export default paymentService;
