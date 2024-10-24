import * as Joi from 'joi';

export const environmentSchema = Joi.object({
  NODE_ENV: Joi.string().valid('dev', 'qa', 'production').required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_PORT: Joi.number().port().default(3306).required(),
  DATABASE_DIALECT: Joi.string().required(),
  DATABASE_HOST: Joi.string().required(),
  MIGRATION_TABLE: Joi.string().required(),
  JWT_EXPIRE_TTL: Joi.number().required(),
  JWT_EXPIRE_REFRESH: Joi.number().required(),
});
