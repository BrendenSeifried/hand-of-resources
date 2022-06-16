const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router()
  .delete('/:id', async (req, res, next) => {
    try {
      const remove = await Book.delete(req.params.id);
      res.json(remove);
    } catch (e) {
      next(e);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const update = await Book.updateById(req.params.id, req.body);
      res.json(update);
    } catch (e) {
      next(e);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const addition = await Book.create(req.body);
      res.json(addition);
    } catch (e) {
      next(e);
    }
  })

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
