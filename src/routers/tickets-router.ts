import { Router } from 'express';
import {
  getOptionals,
  getTicketsTypes,
  getUserTicket,
  updateOptional,
  updateTicket,
} from '@/controllers/tickets-controller';
import { validateBody, validateParams } from '@/middlewares';
import { updateTicketSchema, updateOptionaltSchema, userIdtSchema } from '@/schemas';
import { ticketIdSchema } from '@/schemas/ticket-params-schema';
import { optionalIdSchema } from '@/schemas/optional-params-schema';

const ticketsRouter = Router();

ticketsRouter.get('/:eventId', validateParams(ticketIdSchema), /* authenticateToken, */ getTicketsTypes);
ticketsRouter.get('/optionals/:eventId', validateParams(optionalIdSchema), /* authenticateToken, */ getOptionals);
ticketsRouter.put('/update/ticket', validateBody(updateTicketSchema), /* authenticateToken, */ updateTicket);
ticketsRouter.put('/update/optional', validateBody(updateOptionaltSchema), /* authenticateToken,  */ updateOptional);
ticketsRouter.get('/userTicket/:userId', validateParams(userIdtSchema), /* authenticateToken,  */ getUserTicket);

export { ticketsRouter };
