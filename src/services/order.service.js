const {
  models: { Order, OrderProduct },
} = require('./../libs/sequelize');

class OrderService {
  async find() {
    return await Order.findAll({
      include: [{ association: 'customer', include: 'user' }, 'items'],
    });
  }

  async findByUser(userId) {
    return await Order.findAll({
      include: [{ association: 'customer', include: 'user' }],
      where: {
        '$customer.user.id$': userId,
      },
    });
  }

  async create(data) {
    const newOrder = await Order.create(data);
    return newOrder;
  }

  async addItem(data) {
    const newItem = await OrderProduct.create(data);
    return newItem;
  }
}

module.exports = { OrderService };
