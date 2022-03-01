/* eslint-disable no-underscore-dangle */
const EventEmitter = require('events');

const googleEmitter = new EventEmitter();

const { User } = require('../../models');

const MongooseService = require('../Mongoose');

class GoogleRegister {
  constructor() {
    this.mongooseUser = new MongooseService(User);
  }

  async Register(email, name, imageUrl) {
    const user = new User({ email, username: name, profileUrl: imageUrl });
    const code = Math.floor(1000 + Math.random() * 9000);

    const expireDate = new Date();
    expireDate.setHours(expireDate.getHours() + 24);

    user.activation = {
      isActived: false,
      code,
      expireDate,
    };

    try {
      const result = await this.mongooseUser.save(user);

      googleEmitter.emit('google-auth', email, name, code);

      return { success: true, result };
    } catch (err) {
      return { success: false, error: err };
    }
  }
}

module.exports = { GoogleRegister, googleEmitter };
