import { prisma } from '@/config';
import { CreatePaymentData } from '@/services/payment-service';

async function insertPaymentDetails(createPaymentData: CreatePaymentData) {
  return prisma.paymentDetails.create({
    data: createPaymentData,
  });
}

async function getPaymentDetails(userTicketId: number) {
  return prisma.paymentDetails.findFirst({
    where: {
      userTicketId: userTicketId,
    },
  });
}

async function confirmPayment(userTicketId: number) {
  await prisma.paymentDetails.update({
    where: {
      userTicketId: userTicketId,
    },
    data: {
      isPaid: true,
    },
  });
}

async function deletePaymentDetails(userTicketId: number) {
  await prisma.paymentDetails.deleteMany({
    where: {
      userTicketId: userTicketId,
    },
  });
}

const paymentRepository = {
  insertPaymentDetails,
  getPaymentDetails,
  confirmPayment,
  deletePaymentDetails,
};

export default paymentRepository;
