const router = require('express').Router();
const Review = require('../models/review');

router
.post('/', (req, res, next) => {
  Review.create(req.body)
    .then(review => res.json(review))
    .catch(next)
})
.get('/', (req, res, next) => {
  Review.find({}, { reviewer: false }).limit(100)
    .then(reviews => res.json(reviews))
    .catch(next);
})

module.exports = router