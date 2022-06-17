const { Router } = require('express');
const Boxer = require('../models/Boxer');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const createBoxer = await Boxer.create(req.body);
      res.json(createBoxer);
    } catch (e) {
      next(e);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const everyBoxer = await Boxer.getAll();
      res.json(everyBoxer);
    } catch (e) {
      next(e);
    }
  });
