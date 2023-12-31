const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

// const getConnection = require('./../libs/postgres');
// const pool = require('./../libs/postgres.pool');
const {
  models: { User },
} = require('./../libs/sequelize');

class UserService {
  async find() {
    const users = await User.findAll({
      include: ['customer'],
    });
    return users;
  }

  async findByEmail(email) {
    const user = await User.findOne({
      where: { email },
    });
    return user;
  }

  async findOne(id) {
    const user = await this._findUserById(id);
    return user;
  }

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await User.create({
      ...data,
      password: hash,
    });
    delete newUser.dataValues.password;
    return newUser;
  }

  async update(id, body) {
    const user = await this._findUserById(id);
    const updatedUser = await user.update(body);
    return updatedUser;
  }

  async delete(id) {
    const user = await this._findUserById(id);
    await user.destroy();
    return user;
  }

  async _findUserById(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }
}

module.exports = UserService;
