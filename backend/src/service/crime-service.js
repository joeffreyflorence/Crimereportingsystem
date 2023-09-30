import { validate } from "../validation/validation.js";
import {
  createCrimeValidation,
  getCrimeValidation,
  searchCrimeValidation,
  updateCrimeValidation,
} from "../validation/crime-validation.js";
import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";

const create = async (user, request) => {
  const crime = validate(createCrimeValidation, request);
  crime.username = user.username;

  return prismaClient.crime.create({
    data: crime,
    select: {
      id: true,
      type_crime: true,
      name_crime: true,
      location: true,
      incident_date: true,
    },
  });
};

const get = async (user, crimeId) => {
  crimeId = validate(getCrimeValidation, crimeId);

  const crimes = await prismaClient.crime.findFirst({
    where: {
      username: user.username,
      id: crimeId,
    },
    select: {
      id: true,
      type_crime: true,
      name_crime: true,
      location: true,
      incident_date: true,
    },
  });

  if (!crimes) {
    throw new ResponseError(404, "Crime is not found");
  }
  return crimes;
};

const update = async (user, request) => {
  const crime = validate(updateCrimeValidation, request);

  const totalCrimeInDatabase = await prismaClient.crime.count({
    where: {
      username: user.username,
      id: crime.id,
    },
  });

  if (totalCrimeInDatabase !== 1) {
    throw new ResponseError(404, "Crime is not found");
  }

  return prismaClient.crime.update({
    where: {
      id: crime.id,
    },
    data: {
      type_crime: crime.type_crime,
      name_crime: crime.name_crime,
      location: crime.location,
      incident_date: crime.incident_date,
    },
    select: {
      id: true,
      type_crime: true,
      name_crime: true,
      location: true,
      incident_date: true,
    },
  });
};

const remove = async (user, crimeId) => {
  crimeId = validate(getCrimeValidation, crimeId);

  const totalInDatabase = await prismaClient.crime.count({
    where: {
      username: user.username,
      id: crimeId,
    },
  });

  if (totalInDatabase !== 1) {
    throw new ResponseError(404, "Crime is not found");
  }

  return prismaClient.crime.delete({
    where: {
      id: crimeId,
    },
  });
};

const search = async (user, request) => {
  request = validate(searchCrimeValidation, request);

  const skip = (request.page - 1) * request.size;

  const filters = [];

  filters.push({
    username: user.username,
  });

  if (request.type_crime) {
    filters.push({
      type_crime: {
        contains: request.type_crime,
      },
    });
  }
  if (request.name_crime) {
    filters.push({
      name_crime: {
        contains: request.name_crime,
      },
    });
  }
  if (request.location) {
    filters.push({
      location: {
        contains: request.location,
      },
    });
  }
  if (request.incident_date) {
    filters.push({
      incident_date: {
        contains: request.incident_date,
      },
    });
  }

  const crimes = await prismaClient.crime.findMany({
    where: {
      AND: filters,
    },
    take: request.size,
    skip: skip,
  });

  const totalItems = await prismaClient.crime.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: crimes,
    paging: {
      page: request.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / request.size),
    },
  };
};

export default { create, get, update, remove, search };
