import { Router } from 'express';
import {
  getOptionals,
  getTicketsTypes,
  getUserTicket,
  updateOptional,
  updateTicket,
} from '@/controllers/tickets-controller';
import { authenticateToken, validateBody, validateParams } from '@/middlewares';
import { updateTicketSchema, updateOptionaltSchema } from '@/schemas';
import { eventIdSchema } from '@/schemas/event-params-schema';
import { ticketIdSchema } from '@/schemas/ticket-params-schema';

const ticketsRouter = Router();

ticketsRouter.get('/:eventId', validateParams(eventIdSchema), authenticateToken, getTicketsTypes);
ticketsRouter.get('/optionals/:ticketId', validateParams(ticketIdSchema), authenticateToken, getOptionals);
ticketsRouter.put('/update/ticket', validateBody(updateTicketSchema), authenticateToken, updateTicket);
ticketsRouter.put('/update/optional', validateBody(updateOptionaltSchema), authenticateToken, updateOptional);
ticketsRouter.get('/', authenticateToken, getUserTicket);

export { ticketsRouter };
