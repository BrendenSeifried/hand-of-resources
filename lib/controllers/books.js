const { Router } = require('express');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const data = await Book.getAll();
    res.json(data);
  } catch (e) {
    next(e);
  }
});
