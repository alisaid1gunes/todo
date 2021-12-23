const { StatusCodes } = require('http-status-codes');

const TaskService = require('../services/TaskService');

const ApiErrorService = require('../services/ApiErrorService').default;

const TaskServiceInstance = new TaskService();

const get = async (req, res, next) => {
  try {
    const result = await TaskServiceInstance.GetId(req.params.id);
    res.json(result);
  } catch (err) {
    next(
      ApiErrorService.notFound(`Kayıt bulunamadı. İstek yanlış. Hata:${err}`)
    );
  }
};

const getAll = async (req, res, next) => {
  try {
    const result = await TaskServiceInstance.GetAll();
    res.json(result);
  } catch (err) {
    ApiErrorService.notFound(`Kayıtlar bulunamadı. İstek yanlış. Hata:${err}`);
  }
};

const save = async (req, res, next) => {
  try {
    const result = await TaskServiceInstance.Save(req.body);
    res.status(StatusCodes.OK).json(result);
  } catch (err) {
    next(
      ApiErrorService.notFound(`Kayıt yapılamdı. İstek yanlış. Hata:${err}`)
    );
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await TaskServiceInstance.Update(req.body, id);
    res.status(StatusCodes.OK).json(result);
  } catch (err) {
    next(
      ApiErrorService.notFound(
        `Kayıt güncellenemedi. İstek yanlış. Hata:${err}`
      )
    );
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await TaskServiceInstance.Delete(id);
    res.status(StatusCodes.OK).json(result);
  } catch (err) {
    next(
      ApiErrorService.notFound(`Kayıt silinemedi. İstek yanlış. Hata:${err}`)
    );
  }
};

module.exports = {
  get,
  getAll,
  save,
  update,
  remove,
};
