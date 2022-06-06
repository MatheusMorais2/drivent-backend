import { Request, Response } from 'express';
import httpStatus from 'http-status';
import paymentService from '@/services/payment-service';

export async function insertPaymentDetails(req: Request, res: Response) {
  const userId = parseInt(res.locals.userId);
  await paymentService.insertPaymentDetails(userId);

  res.sendStatus(httpStatus.OK);
}

export async function getPaymentDetails(req: Request, res: Response) {
  const userId = parseInt(res.locals.userId);
  const paymentDetails = await paymentService.getPaymentDetails(userId);

  res.status(httpStatus.OK).send(paymentDetails);
}

export async function confirmPayment(req: Request, res: Response) {
  const userId = parseInt(res.locals.userId);

  await paymentService.confirmPayment(userId);

  res.sendStatus(httpStatus.OK);
}
