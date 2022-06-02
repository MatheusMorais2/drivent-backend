import Joi from 'joi';

export const userIdtSchema = Joi.object({
  userId: Joi.number().required(),
});
