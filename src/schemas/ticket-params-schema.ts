import Joi from 'joi';

export const ticketIdSchema = Joi.object({
  ticketId: Joi.number().required(),
});
