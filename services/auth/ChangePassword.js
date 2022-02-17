/* eslint-disable no-underscore-dangle */

const bcrypt = require('bcryptjs');

const { User } = require('../../models');

const MongooseService = require('../Mongoose');

const { changePasswordValidation } = require('../../validations/auth');

class ChangePassword {
  constructor() {
    this.mongooseUser = new MongooseService(User);
  }

  async ChangePassword(body) {
    const { error } = changePasswordValidation(body);
    if (error) return { success: false, error: error.details[0].message };

    const user = await this.mongooseUser.get({ _id: body.id });

    if (!user) return { error: 'user not found', success: false };

    const validPass = await bcrypt.compare(body.oldPassword, user.password);
    if (!validPass) return { error: 'old password is wrong', success: false };

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(body.newPassword, salt);

    try {
      await this.mongooseUser.update(user._id, user);
      return { success: true, message: 'password changed' };
    } catch (err) {
      return { error: err, success: false };
    }
  }
}

module.exports = ChangePassword;
