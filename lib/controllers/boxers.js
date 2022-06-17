const { Router } = require('express');
const Boxer = require('../models/Boxer');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const singleBoxer = await Boxer.getById(id);
      res.json(singleBoxer);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const reformBoxer = await Boxer.updateBoxer(req.params.id, req.body);
      res.json(reformBoxer);
    } catch (e) {
      next(e);
    }
  })

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
