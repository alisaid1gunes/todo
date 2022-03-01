const { Task } = require('../../models');

const MongooseService = require('../Mongoose');

const { getOneValidation } = require('../../validations/task');

const RedisCache = require('../redis/RedisCache');

const keyFormat = 'task.id=';

const expirationTime = 300;
class GetOne {
  constructor() {
    this.mongooseTask = new MongooseService(Task);
    this.redisCacheService = new RedisCache(keyFormat, expirationTime);
  }

  async GetTask(id) {
    const { error } = getOneValidation(id);
    if (error) return { success: false, error: error.details[0].message };

    (async () => {
      const data = await this.redisCacheService.getCache(id);
      if (data != null) return { data, success: true };
    })();

    try {
      const result = await this.mongooseTask.get({ _id: id });

      if (result) {
        this.redisCacheService.setCache(id, result);
        return { result, success: true };
      }

      return { success: false, error: 'kayıt bulunamadı' };
    } catch (err) {
      return { success: false, error: `Kayıt bulunamadı. Hata:${err}` };
    }
  }
}
module.exports = GetOne;
