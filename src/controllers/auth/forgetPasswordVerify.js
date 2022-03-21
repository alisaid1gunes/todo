/* eslint-disable consistent-return */
const { StatusCodes } = require('http-status-codes');

const ApiErrorService = require('../../services/ApiError');

const { ForgetPasswordVerify } = require('../../services/auth');

const MongooseService = require('../../services/Mongoose');

const { User } = require('../../models');

const ForgetPasswordVerifyService = new ForgetPasswordVerify(new MongooseService(User));

const forgetPasswordVerify = async (req, res, next) => {
  try {
    const result = await ForgetPasswordVerifyService.ForgetPasswordVerify(
      req.body
    );

    if (result.success) {
      return res.status(StatusCodes.OK).send({
        result,
      });
    }
    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(ApiErrorService.badRequest(`Request is wrong. Error:${err}`));
  }
};

module.exports = forgetPasswordVerify;
