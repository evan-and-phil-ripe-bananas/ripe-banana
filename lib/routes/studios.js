const router = require('express').Router();
const Studio = require('../models/studio');
const Films = require('../models/film');

router
  .post('/', (req, res, next) => {
    Studio.create(req.body)
      .then(studio => res.json(studio))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Promise.all([
      Studio.findById(req.params.id)
        .lean(),
      Films.find({ studio: req.params.id })
        .select('id')
        .lean()
    ])
      .then(([studio, films]) => {
        studio.films = films;
        res.json(studio);
      })
      .catch(next)
  })

  .get('/', (req, res, next) => {
    Studio.find()
      .then(studios => res.json(studios))
      .catch(next)
  })

  .delete('/:id', (req, res, next) => {
    Films.find({ studio: req.params.id })
      .then(films => {
        if(films.length > 0) {
          return new Error()
          .catch(next)
        }
      });
    Studio.findByIdAndDelete(req.params.id)
      .then(studio => res.json(studio))
      .catch(next);
  });
module.exports = router;