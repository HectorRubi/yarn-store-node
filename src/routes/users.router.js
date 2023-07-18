const express = require('express')

const router = express.Router()

router.route('/')
.get(
  async (req, res, next) => {
    try {
      const users = []
      res.json(users)
    } catch (error) {
      next(error)
    }
  }
)
.post(
  async (req, res, next) => {
    try {
      const body = req.body
      const newProduct = body
      res.status(201).json({
        message: 'created',
        data: newProduct
      })
    } catch (error) {
      next(error)
    }
  }
)

router.route('/:id')
.get(
  async (req, res, next) => {
    try {
      const { id } = req.params
      const user = {id}
      res.json(user)
    } catch (error) {
      next(error)
    }
  }
)
.patch(
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const user = {id, body}
      res.json({
        message: 'updated',
        data: user,
      })
    } catch (error) {
      next(error)
    }
  }
)
.delete(
  async (req, res, next) => {
    try {
      const { id } = req.params
      const user = {id}
      res.json({
        message: 'deleted',
        data: user,
      })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
