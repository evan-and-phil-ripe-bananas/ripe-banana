const router = require('express').Router();
const Film = require('../models/film');
const Actor = require('../models/actor');

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
    Promise.all([
      Film.findById(req.params.id)
        .lean(),
      Actor.find({ film: req.params.id })
        .select('name')
        .lean()
    ])
      .then(([film, actors]) => {
        console.log(film);
        console.log(actors);
        film.cast = actors
        res.json(film);
      })
      .catch(next); 
  })
  
module.exports = router