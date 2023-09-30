import {validate} from "../validation/validation.js";
import {
  createAccidentValidation,
  getAccidentValidation,
  searchAccidentValidation,
  updateAccidentValidation,
} from "../validation/accident-validation.js";
import {prismaClient} from "../app/database.js";
import {ResponseError} from "../error/response-error.js";

const create = async (user, request) => {
  const accident = validate(createAccidentValidation, request);
  accident.username = user.username;

  return prismaClient.accident.create({
    data: accident,
    select: {
      id: true,
      date: true,
      location: true,
      description: true,
      fatalities: true,
      injured: true,
      vehicle_type: true,
    },
  });
};

const get = async (user, accidentId) => {
  accidentId = validate(getAccidentValidation, accidentId);

  const accidents = await prismaClient.accident.findFirst({
    where: {
      username: user.username,
      id: accidentId,
    },
    select: {
      id: true,
      date: true,
      location: true,
      description: true,
      fatalities: true,
      injured: true,
      vehicle_type: true,
    },
  });
  if (!accidents) {
    throw new ResponseError(404, "Accident is not found");
  }
  return accidents;
};

const update = async (user, request) => {
  const accident = validate(updateAccidentValidation, request);

  const totalAccidentInDatabase = await prismaClient.accident.count({
    where: {
      username: user.username,
      id: accident.id,
    },
  });

  if (totalAccidentInDatabase !== 1) {
    throw new ResponseError(404, "Accident is not found");
  }

  return prismaClient.accident.update({
    where: {
      id: accident.id,
    },
    data: {
      date: accident.date,
      location: accident.location,
      description: accident.description,
      fatalities: accident.fatalities,
      injured: accident.injured,
      vehicle_type: accident.vehicle_type,
    },
    select: {
      id: true,
      date: true,
      location: true,
      description: true,
      fatalities: true,
      injured: true,
      vehicle_type: true,
    },
  });
};

const remove = async (user, accidentId) => {
  accidentId = validate(getAccidentValidation, accidentId);

  const totalInDatabase = await prismaClient.accident.count({
    where: {
      username: user.username,
      id: accidentId,
    },
  });

  if (totalInDatabase !== 1) {
    throw new ResponseError(404, "Accident is not found");
  }

  return prismaClient.accident.delete({
    where: {
      id: accidentId,
    },
  });
};

const search = async (user, request) => {
  request = validate(searchAccidentValidation, request);

  const skip = (request.page - 1) * request.size;

  const filters = [];

  filters.push({
    username: user.username,
  });

  if (request.date) {
    const date = new Date(request.date);
    filters.push({
      date: {
        contains: date,
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
  if (request.description) {
    filters.push({
      description: {
        contains: request.description,
      },
    });
  }
  if (request.fatalities) {
    const fatal = Number(request.fatalities);
    filters.push({
      fatalities: {
        contains: fatal,
      },
    });
  }
  if (request.injured) {
    const injured = Number(request.injured);
    filters.push({
      injured: {
        contains: injured,
      },
    });
  }
  if (request.vehicle_type) {
    filters.push({
      vehicle_type: {
        contains: request.vehicle_type,
      },
    });
  }

  const accidents = await prismaClient.accident.findMany({
    where: {
      AND: filters,
    },
    take: request.size,
    skip: skip,
  });

  const totalItems = await prismaClient.accident.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: accidents,
    paging: {
      page: request.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / request.size),
    },
  };
};

export default {create, get, update, remove, search};

