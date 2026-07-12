import * as Joi from 'joi';

export const validationSchema = Joi.object({
  // App
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  PORT: Joi.number().port().default(8080),

  API_PREFIX: Joi.string().default('api'),

  APP_NAME: Joi.string().default('HireAI'),

  APP_URL: Joi.string().uri().required(),

  FRONTEND_URL: Joi.string().uri().required(),

  // Database
  DATABASE_URL: Joi.string().required(),
  DIRECT_URL: Joi.string().required(),

  // Better Auth
  BETTER_AUTH_SECRET: Joi.string().min(32).required(),
  BETTER_AUTH_URL: Joi.string().uri().required(),

  GOOGLE_CLIENT_ID: Joi.string(),
  GOOGLE_CLIENT_SECRET: Joi.string(),

  GITHUB_CLIENT_ID: Joi.string(),
  GITHUB_CLIENT_SECRET: Joi.string(),
  // RabbitMQ
  RABBITMQ_URI: Joi.string().required(),

  // Redis
  REDIS_URL: Joi.string().required(),

  // OpenAI
  OPENAI_API_KEY: Joi.string().required(),

  // AWS S3
  AWS_ACCESS_KEY_ID: Joi.string().required(),

  AWS_SECRET_ACCESS_KEY: Joi.string().required(),

  AWS_REGION: Joi.string().required(),

  AWS_BUCKET_NAME: Joi.string().required(),

  // Mail
  SMTP_HOST: Joi.string().required(),

  SMTP_PORT: Joi.number().default(587),

  SMTP_USER: Joi.string().required(),

  SMTP_PASSWORD: Joi.string().required(),

  SMTP_FROM: Joi.string().email().required(),

  // Stripe
  STRIPE_SECRET_KEY: Joi.string().required(),

  STRIPE_WEBHOOK_SECRET: Joi.string().required(),
});
