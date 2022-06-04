import Joi from 'joi';

export const updateOptionaltSchema = Joi.object({
  optionalId: Joi.number().required(),
});
