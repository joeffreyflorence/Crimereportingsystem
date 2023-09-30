import crimeService from "../service/crime-service.js";

const create = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    const result = await crimeService.create(user, request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const user = req.user;
    const crimeId = req.params.crimeId;
    const result = await crimeService.get(user, crimeId);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const user = req.user;
    const crimeId = req.params.crimeId;
    const request = req.body;
    request.id = crimeId;
    const result = await crimeService.update(user, request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const user = req.user;
    const crimeId = req.params.crimeId;
    await crimeService.remove(user, crimeId);
    res.status(200).json({
      data: "OK",
    });
  } catch (e) {
    next(e);
  }
};

const search = async (req, res, next) => {
  try {
    const user = req.user;
    const request = {
      type_crime: req.query.type_crime,
	  name_crime: req.query.name_crime,
      location: req.query.location,
      incident_date: req.query.incident_date,
      page: req.query.page,
      size: req.query.size,
    };

    const result = await crimeService.search(user, request);
    res.status(200).json({
      data: result.data,
      paging: result.paging,
    });
  } catch (e) {
    next(e);
  }
};

export default { create, get, update, remove, search };
