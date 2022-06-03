import { Router } from 'express';
import { insertPaymentDetails } from '@/controllers/payment-controller';
import { authenticateToken } from '@/middlewares';

const paymentRouter = Router();

paymentRouter.post('/', authenticateToken, insertPaymentDetails);
// paymentRouter.get('/', authenticateToken, getUserTicket);

export { paymentRouter };
