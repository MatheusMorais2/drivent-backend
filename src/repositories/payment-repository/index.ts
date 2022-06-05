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

const paymentRepository = {
  insertPaymentDetails,
  getPaymentDetails,
};

export default paymentRepository;
