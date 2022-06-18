const { Router } = require('express');
const NBA = require('../models/NBA');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const list = await NBA.getAll();
    res.json(list);
  } catch (e) {
    next(e);
  }
});
