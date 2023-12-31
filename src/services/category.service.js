const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const {
  models: { Category },
} = require('./../libs/sequelize');

class CategoryService {
  constructor() {
    this.categories = [];
    this._generate();
  }

  async find() {
    return await Category.findAll();
  }

  async findOne(id) {
    const category = await Category.findByPk(id, {
      include: ['products'],
    });

    if (!category) {
      throw boom.notFound('Category not found');
    }

    return category;
  }

  async create(data) {
    const newCategory = await Category.create(data);
    return newCategory;
  }

  async update(id, data) {
    const categoryIndex = this.categories.findIndex(
      (category) => category.id === id,
    );

    if (categoryIndex === -1) {
      throw boom.notFound('Category not found');
    }

    const category = this.categories[categoryIndex];
    this.categories[categoryIndex] = {
      ...category,
      ...data,
    };

    return this.categories[categoryIndex];
  }

  async delete(id) {
    const categoryIndex = this.categories.findIndex(
      (category) => category.id === id,
    );

    if (categoryIndex === -1) {
      throw boom.notFound('Category not found');
    }

    const deletedCategory = this.categories.splice(categoryIndex, 1);

    return deletedCategory;
  }

  _generate(size = 10) {
    const limit = size;
    for (let index = 0; index < limit; index++) {
      this.categories.push({
        id: faker.string.uuid(),
        name: faker.word.noun(),
      });
    }
  }
}

module.exports = CategoryService;
