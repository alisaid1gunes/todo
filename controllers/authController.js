/* eslint-disable consistent-return */
const { StatusCodes } = require('http-status-codes');

const { AuthService } = require('../services/AuthService');

const ApiErrorService = require('../services/ApiErrorService');

const AuthServiceInstance = new AuthService();

const register = async (req, res, next) => {
  try {
    const result = await AuthServiceInstance.RegisterUser(req.body);

    if (result.success) return res.status(StatusCodes.CREATED).send(result);

    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(
      ApiErrorService.badRequest(
        'Kullanıcı kayıt işlemi yapılamadı. İstek yanlış'
      )
    );
  }
};

const login = async (req, res, next) => {
  try {
    const result = await AuthServiceInstance.LoginUser(req.body);

    if (result.success) {
      const { accessToken } = result;
      const { refreshToken } = result;
      return res.header('auth-token', accessToken).status(StatusCodes.OK).send({
        accessToken,
        refreshToken,
        error: result.error,
        succes: result.success,
      });
    }
    next(ApiErrorService.unauthorized(result.error));
  } catch (err) {
    next(ApiErrorService.unauthorized(`Kullanıcı girişi yapılamadı.${err}`));
  }
};
const logout = async (req, res, next) => {
  try {
    const result = await AuthServiceInstance.LogoutUser(req.body);

    if (result.success)
      return res.header('auth-token', '').status(StatusCodes.OK).send(result);

    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(
      ApiErrorService.badRequest(
        'Kullanıcı çıkış işlemi yapılamadı. İstek yanlış'
      )
    );
  }
};
const refresh = async (req, res, next) => {
  try {
    const result = await AuthServiceInstance.Refresh(req.body);

    if (result.success) res.status(StatusCodes.OK).send(result);

    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(
      ApiErrorService.badRequest(
        'Token yenileme işlemi yapılamadı. İstek yanlış'
      )
    );
  }
};

const activate = async (req, res, next) => {
  try {
    const result = await AuthServiceInstance.Activate(req.body);

    if (result.success) return res.status(StatusCodes.OK).send(result);

    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(
      ApiErrorService.badRequest(' Aktivasyon işlemi yapılamadı. İstek yanlış')
    );
  }
};

const changePassword = async (req, res, next) => {
  try {
    const result = await AuthServiceInstance.ChangePassword(req.body);

    if (result.success) {
      return res.status(StatusCodes.OK).send({
        result,
      });
    }
    next(ApiErrorService.badRequest(result.error));
  } catch (err) {
    next(ApiErrorService.badRequest(`Kullanıcı girişi yapılamadı.${err}`));
  }
};

const forgetPassword = async (req, res, next) => {
  try {
    const result = await AuthServiceInstance.ForgetPassword(req.body);

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

const forgetPasswordVerify = async (req, res, next) => {
  try {
    const result = await AuthServiceInstance.ForgetPasswordVerify(req.body);

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

const forgetPasswordChange = async (req, res, next) => {
  try {
    const result = await AuthServiceInstance.ForgetPasswordChange(req.body);

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
module.exports = {
  register,
  login,
  refresh,
  logout,
  activate,
  changePassword,
  forgetPassword,
  forgetPasswordVerify,
  forgetPasswordChange,
};
