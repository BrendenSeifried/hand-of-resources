const { Router } = require('express');
const Game = require('../models/Game');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const list = await Game.getAll();
    res.json(list);
  } catch (e) {
    next(e);
  }
});
