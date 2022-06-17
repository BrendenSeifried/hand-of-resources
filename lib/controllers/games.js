const { Router } = require('express');
const Game = require('../models/Game');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const singleId = await Game.getById(id);
      res.json(singleId);
    } catch (e) {
      next(e);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const list = await Game.getAll();
      res.json(list);
    } catch (e) {
      next(e);
    }
  });
