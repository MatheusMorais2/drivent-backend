import { Router } from 'express';
import {
  deleteUserTicket,
  getTicketsOptionals,
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

ticketsRouter.get('/', authenticateToken, getUserTicket);
ticketsRouter.delete('/', authenticateToken, deleteUserTicket);
ticketsRouter.get('/:eventId', validateParams(eventIdSchema), authenticateToken, getTicketsTypes);
ticketsRouter.get('/optionals/:ticketId', validateParams(ticketIdSchema), authenticateToken, getTicketsOptionals);
ticketsRouter.put('/update/ticket', validateBody(updateTicketSchema), authenticateToken, updateTicket);
ticketsRouter.put('/update/optional', validateBody(updateOptionaltSchema), authenticateToken, updateOptional);

export { ticketsRouter };
