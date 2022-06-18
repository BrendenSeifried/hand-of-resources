const { Router } = require('express');
const CAR = require('../models/CAR');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const list = await CAR.getAll();
    res.json(list);
  } catch (e) {
    next(e);
  }
});
