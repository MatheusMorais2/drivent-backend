import Joi from 'joi';

export const eventIdSchema = Joi.object({
  eventId: Joi.number().required(),
});
