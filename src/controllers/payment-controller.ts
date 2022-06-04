import { Request, Response } from 'express';
import httpStatus from 'http-status';
import paymentService from '@/services/payment-service';

export async function insertPaymentDetails(req: Request, res: Response) {
  const userId = parseInt(res.locals.userId);
  await paymentService.insertPaymentDetails(userId);
  res.sendStatus(httpStatus.OK);
}
