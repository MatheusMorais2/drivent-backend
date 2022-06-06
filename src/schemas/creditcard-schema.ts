import Joi from 'joi';

interface creditCard {
  number: number;
  name: string;
  expiry: string;
  cvc: number;
}

export const creditCardSchema = Joi.object<creditCard>({
  number: Joi.string()
    .pattern(/^(\d{16,22})$/)
    .required(),
  name: Joi.string().required(),
  expiry: Joi.string()
    .pattern(/^(([0-9]){2})\/(([0-9]){2})$/)
    .required(),
  cvc: Joi.string()
    .pattern(/^(\d{3,4})$/)
    .required(),
});
