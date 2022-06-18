const { Router } = require('express');
const Game = require('../models/Game');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const add = await Game.newGame(req.body);
      res.json(add);
    } catch (e) {
      next(e);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const remove = await Game.deleteGame(req.params.id);
      res.json(remove);
    } catch (e) {
      next(e);
    }
  })

  .put('/:id', async (req, res, next) => {
    console.log('test', req.params.id);
    try {
      const updated = await Game.updateGame(req.params.id, req.body);
      res.json(updated);
    } catch (e) {
      next(e);
    }
  })

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
