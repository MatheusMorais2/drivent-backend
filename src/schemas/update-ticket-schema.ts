import Joi from 'joi';

export const updateTicketSchema = Joi.object({
  ticketId: Joi.number().required(),
  userId: Joi.number().required(),
});
