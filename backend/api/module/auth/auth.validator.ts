import Joi = require('joi')

export const LoginValidator = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string()
    .regex(/\S+@\S+\.\S+/)
    .required(),
})

export const RegisterValidator = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string()
    .regex(/\S+@\S+\.\S+/)
    .required(),
  role: Joi.string().valid('USER', 'ADMIN'),
})

export const GenTokenValidator = Joi.object({
  email: Joi.string()
    .regex(/\S+@\S+\.\S+/)
    .required(),
  userId: Joi.string().required(),
})
