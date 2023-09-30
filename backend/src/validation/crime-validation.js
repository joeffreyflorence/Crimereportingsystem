import Joi from "joi";

const createCrimeValidation = Joi.object({
  type_crime: Joi.string().max(255).required(),
  name_crime: Joi.string().max(255).required(),
  location: Joi.string().max(100).required(),
  incident_date: Joi.date().iso().options({ convert: true }).required(),
});
const getCrimeValidation = Joi.number().positive().required();

const updateCrimeValidation = Joi.object({
  id: Joi.number().positive().required(),
  type_crime: Joi.string().max(255).optional(),
  name_crime: Joi.string().max(255).optional(),
  location: Joi.string().max(100).optional(),
  incident_date: Joi.date().optional(),
});

const searchCrimeValidation = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
  type_crime: Joi.string().optional(),
  name_crime: Joi.string().optional(),
  location: Joi.string().optional(),
  incident_date: Joi.date().optional(),
});

export {
  createCrimeValidation,
  getCrimeValidation,
  updateCrimeValidation,
  searchCrimeValidation,
};
