import Joi = require('joi')
import { AllPriorities, AllStates } from '../../models'

export const CreateTaskValidator = Joi.object({
  endAt: Joi.date().required(),
  startAt: Joi.date().required(),
  name: Joi.string().min(3).required(),
  state: Joi.string().valid(...AllStates),
  description: Joi.string().min(6).required(),
  priority: Joi.string().valid(...AllPriorities),
})
export const SearchTaskValidator = Joi.object({
  search: Joi.string().allow(''),
  state: Joi.array()
    .items(Joi.string().valid(...AllStates))
    .default([]),
  priority: Joi.array()
    .items(Joi.string().valid(...AllPriorities))
    .default([]),
})

export const UpdateTaskValidator = Joi.object({
  endAt: Joi.date(),
  startAt: Joi.date(),
  name: Joi.string().min(3),
  description: Joi.string().min(6),
  state: Joi.string().valid(...AllStates),
  priority: Joi.string().valid(...AllPriorities),
})

export const DeleteManyTaskValidator = Joi.object({
  ids: Joi.array().items(Joi.string()).min(1).required(),
})
