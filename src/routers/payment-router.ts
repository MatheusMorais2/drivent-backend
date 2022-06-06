import { Router } from 'express';
import { confirmPayment, getPaymentDetails, insertPaymentDetails } from '@/controllers/payment-controller';
import { authenticateToken, validateBody } from '@/middlewares';
import { creditCardSchema } from '@/schemas';

const paymentRouter = Router();

paymentRouter.post('/', authenticateToken, insertPaymentDetails);
paymentRouter.get('/', authenticateToken, getPaymentDetails);
paymentRouter.post('/confirm', validateBody(creditCardSchema), authenticateToken, confirmPayment);

export { paymentRouter };
