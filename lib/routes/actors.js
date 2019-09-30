const router = require('express').Router();
const Actor = require('../models/actor');
const Film = require('../models/film')

router
  .post('/', (req, res, next) => {
    Actor.create(req.body)
      .then(actor => res.json(actor))
      .catch(next)
  })

  .get('/', (req, res, next) => {
    Actor.find()
      .then(actors => res.json(actors))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Promise.all([
      Actor.findById(req.params.id)
      .lean(),
      // Film.find({ "cast": { actor: req.params.id } })
      Film.find( { 'cast.actor':req.params.id } )
      .select('title released')
      .lean()
    ])
      .then(([actor, films]) => {
        console.log(films);
        actor.films = films;
        res.json(actor);
      })
      .catch(next); 
  });

  module.exports = router;