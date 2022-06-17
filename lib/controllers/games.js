const { Router } = require('express');
const { getMaxListeners } = require('../app');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const list = await Game.getAll();
    res.json(list);
  } catch (e) {
    next(e);
  }
});
