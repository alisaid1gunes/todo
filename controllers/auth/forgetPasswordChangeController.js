/* eslint-disable consistent-return */
const { StatusCodes } = require('http-status-codes');

const ApiErrorService = require('../../services/ApiErrorService');

const ForgetPasswordChangeService = require('../../services/auth/ForgetPasswordChangeService');

const ForgetPasswordChangeServiceInstance = new ForgetPasswordChangeService();

const forgetPasswordChange = async (req, res, next) => {
  try {
    const result = await ForgetPasswordChangeServiceInstance.ForgetPasswordChange(
      req.body
    );

    if (result.success) {
      return res.status(StatusCodes.OK).send({
        result,
      });
    }
    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(ApiErrorService.badRequest(`İşlem gerçekleştirilemedi.${err}`));
  }
};

module.exports = { forgetPasswordChange };
