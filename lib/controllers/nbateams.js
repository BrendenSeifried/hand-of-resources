const { Router } = require('express');
const NBA = require('../models/NBA');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const single = await NBA.getById(id);
      res.json(single);
    } catch (e) {
      next(e);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const list = await NBA.getAll();
      res.json(list);
    } catch (e) {
      next(e);
    }
  });