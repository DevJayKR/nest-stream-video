import * as Joi from 'joi';

export const validationSchema = Joi.object({
  // SERVER
  SERVER_PORT: Joi.number().required(),

  // DATABASE
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),

  // JWT
  JWT_ACCESS_KEY: Joi.string().required(),
  JWT_ACCESS_EXP_TIME: Joi.string().required(),

  JWT_REFRESH_KEY: Joi.string().required(),
  JWT_REFRESH_EXP_TIME: Joi.string().required(),

  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),
  GOOGLE_CALLBACK_URL: Joi.string().required(),
});
