const { Router } = require('express');
const Boxer = require('../models/Boxer');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const everyBoxer = await Boxer.getAll();
    res.json(everyBoxer);
  } catch (e) {
    next(e);
  }
});
