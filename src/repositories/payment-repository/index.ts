import { prisma } from '@/config';
import { CreatePaymentData } from '@/services/payment-service';

async function insertPaymentDetails(createPaymentData: CreatePaymentData) {
  return prisma.paymentDetails.create({
    data: createPaymentData,
  });
}

const paymentRepository = {
  insertPaymentDetails,
};

export default paymentRepository;
