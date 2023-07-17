const { faker } = require('@faker-js/faker')

class ProductService {

  constructor() {
    this.products = [];
    this._generate()
  }

  async find() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.products)
      }, 5000)
    })
  }

  async findOne(id) {
    return this.products.find(product => product.id === id)
  }

  async create(data) {
    const { name, price, image } = data
    const newProduct = {
      id: faker.string.uuid(),
      name: name,
      price: price,
      image: image
    }
    this.products.push(newProduct)
    return newProduct
  }

  async update(id, body) {
    const index = this.products.findIndex(product => product.id === id)
    if (index === -1) {
      throw new Error('Product not found')
    }
    const product = this.products[index]
    this.products[index] = {
      ...product,
      ...body,
    }
    return this.products[index]
  }

  async delete(id) {
    const index = this.products.findIndex(product => product.id === id)
    if (index === -1) {
      throw new Error('Product not found')
    }
    const deletedProduct = this.products.splice(index, 1);
    return deletedProduct

  }

  _generate(size = 100) {
    const limit = size
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.url()
      })
    }
  }
}

module.exports = ProductService
