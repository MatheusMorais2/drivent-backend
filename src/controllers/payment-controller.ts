import { Request, Response } from 'express';
import paymentService from '@/services/payment-service';

export async function insertPaymentDetails(req: Request, res: Response) {
  const userId = parseInt(res.locals.userId);
  await paymentService.insertPaymentDetails(userId);
}
