/* eslint-disable consistent-return */
const { StatusCodes } = require('http-status-codes');

const ApiErrorService = require('../../services/ApiError');

const { ForgetPassword } = require('../../services/auth');

const MongooseService = require('../../services/Mongoose');

const ForgetPasswordService = new ForgetPassword(MongooseService);

const forgetPassword = async (req, res, next) => {
  try {
    const result = await ForgetPasswordService.ForgetPassword(req.body);

    if (result.success) {
      return res.status(StatusCodes.OK).send({
        result,
      });
    }
    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(ApiErrorService.badRequest(` Request is wrong. Error:${err}`));
  }
};

module.exports = forgetPassword;
