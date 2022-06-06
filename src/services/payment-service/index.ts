import { conflictError, notFoundError } from '@/errors';
import paymentRepository from '@/repositories/payment-repository';
import ticketRepository from '@/repositories/tickets-repository';
import { PaymentDetails } from '@prisma/client';

export type CreatePaymentData = Omit<PaymentDetails, 'id'>;

async function insertPaymentDetails(userId: number) {
  const userTicket = await ticketRepository.getUserTicket(userId);
  if (!userTicket) throw notFoundError();

  const paymentData: CreatePaymentData = {
    userTicketId: userTicket.id,
    totalValue: userTicket.Ticket.price + (userTicket.Optional ? userTicket.Optional.price : 0),
    paymentDate: new Date(Date.now()),
    isPaid: false,
  };

  await paymentRepository.insertPaymentDetails(paymentData);
}

async function getPaymentDetails(userId: number) {
  const userTicket = await ticketRepository.getUserTicket(userId);
  if (!userTicket) throw notFoundError();

  const paymentDetails = await paymentRepository.getPaymentDetails(userTicket.id);
  if (!paymentDetails) {
    return null;
  }

  return paymentDetails;
}

async function deletePaymentDetails(userId: number) {
  const userTicket = await ticketRepository.getUserTicket(userId);
  if (!userTicket) throw notFoundError();

  const paymentDetails = await paymentRepository.getPaymentDetails(userTicket.id);
  if (!paymentDetails) throw notFoundError();

  await paymentRepository.deletePaymentDetails(userTicket.id);
}

async function confirmPayment(userId: number) {
  const userTicket = await ticketRepository.getUserTicket(userId);
  if (!userTicket) throw notFoundError();

  const paymentDetails = await paymentRepository.getPaymentDetails(userTicket.id);
  if (!paymentDetails) throw notFoundError();

  if (paymentDetails.isPaid === true) throw conflictError('Already paid');

  await paymentRepository.confirmPayment(userTicket.id);
}

const paymentService = {
  insertPaymentDetails,
  getPaymentDetails,
  confirmPayment,
  deletePaymentDetails,
};

export default paymentService;
