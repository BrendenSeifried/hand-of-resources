const { Router } = require('express');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const list = await CAR.getAll();
    res.json(list);
  } catch (e) {
    next(e);
  }
});
