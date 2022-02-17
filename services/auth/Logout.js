/* eslint-disable no-underscore-dangle */

const { User } = require('../../models');

const MongooseService = require('../Mongoose');

const { RefreshToken } = require('../../models');

const { logoutValidation } = require('../../validations/auth');

class Logout {
  constructor() {
    this.mongooseUser = new MongooseService(User);
    this.mongooseRefreshToken = new MongooseService(RefreshToken);
  }

  async LogoutUser(body) {
    const bodyIn = body;

    const { error } = logoutValidation(bodyIn);
    if (error) return { success: false, error: error.details[0].message };

    const { refreshToken } = bodyIn;

    try {
      await this.mongooseRefreshToken.delete({ token: refreshToken });

      return { success: true, message: 'user logged out' };
    } catch (err) {
      return { success: false, error: `logout error occurred${err}` };
    }
  }
}

module.exports = Logout;
