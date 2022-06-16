const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const single = await Book.getById(id);
      res.json(single);
    } catch (e) {
      next(e);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const data = await Book.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
