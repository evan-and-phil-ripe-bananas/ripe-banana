const router = require('express').Router();
const Film = require('../models/film');

router
  .post('/', (req, res, next) => {
    Film.create(req.body)
      .then(film => res.json(film))
      .catch(next)
  })

  .get('/', (req, res, next) => {
    Film.find()
      .then(films => res.json(films))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Film.findById(req.params.id)
      .lean()
      .populate('studio', 'name')
      .populate('cast.actor', 'name')
      .then(film => res.json(film))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Film.findByIdAndDelete(req.params.id)
      .then(film => res.json(film))
      .catch(next);
  })
module.exports = router