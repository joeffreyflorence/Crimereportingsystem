import Joi from "joi";

const createAccidentValidation = Joi.object({
  date: Joi.date().iso().options({ convert: true }).required(),
  location: Joi.string().max(255).required(),
  description: Joi.string().required(),
  fatalities: Joi.number().required(),
  injured: Joi.number().required(),
  vehicle_type: Joi.string().max(100).required(),
});

const getAccidentValidation = Joi.number().positive().required();

const updateAccidentValidation = Joi.object({
  id: Joi.number().positive().required(),
  date: Joi.date().iso().options({ convert: true }).optional(),
  location: Joi.string().max(255).optional(),
  description: Joi.string().optional(),
  fatalities: Joi.number().optional(),
  injured: Joi.number().optional(),
  vehicle_type: Joi.string().max(100).optional(),
});

const searchAccidentValidation = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
  date: Joi.date().iso().options({ convert: true }).optional(),
  location: Joi.string().max(255).optional(),
  description: Joi.string().optional(),
  fatalities: Joi.number().optional(),
  injured: Joi.number().optional(),
  vehicle_type: Joi.string().max(100).optional(),
});

export {
  createAccidentValidation,
  getAccidentValidation,
  updateAccidentValidation,
  searchAccidentValidation,
};
