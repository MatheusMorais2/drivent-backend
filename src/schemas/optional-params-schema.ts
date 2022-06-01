import Joi from 'joi';

export const optionalIdSchema = Joi.object({
  optionalId: Joi.number().required(),
});
