import accidentService from "../service/accident-service.js";

const create = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    const result = await accidentService.create(user, request);
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
    const accidentId = req.params.accidentId;
    const result = await accidentService.get(user, accidentId);
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
    const accidentId = req.params.accidentId;
    const request = req.body;
    request.id = accidentId;
    const result = await accidentService.update(user, request);
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
    const accidentId = req.params.accidentId;
    await accidentService.remove(user, accidentId);
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
      date: req.query.date,
      location: req.query.location,
      description: req.query.description,
      fatalities: req.query.fatalities,
      injured: req.query.injured,
      vehicle_type: req.query.vehicle_type,
      page: req.query.page,
      size: req.query.size,
    };

    const result = await accidentService.search(user, request);
    res.status(200).json({
      data: result.data,
      paging: result.paging,
    });
  } catch (e) {
    next(e);
  }
};
export default { create, get, update, remove, search };
