const { Router } = require('express');
const CAR = require('../models/CAR');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const newCar = await CAR.create(req.body);
      res.json(newCar);
    } catch (e) {
      next(e);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const oneCar = await CAR.getById(id);
      res.json(oneCar);
    } catch (e) {
      next(e);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const list = await CAR.getAll();
      res.json(list);
    } catch (e) {
      next(e);
    }
  });
