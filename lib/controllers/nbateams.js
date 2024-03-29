const { Router } = require('express');
const NBA = require('../models/NBA');

module.exports = Router()
  .delete('/:id', async (req, res, next) => {
    try {
      const remove = await NBA.deleteTeam(req.params.id);
      res.json(remove);
    } catch (e) {
      next(e);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const resp = await NBA.replaceTeam(req.params.id, req.body);
      res.json(resp);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const create = await NBA.newTeam(req.body);
      res.json(create);
    } catch (e) {
      next(e);
    }
  })

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
