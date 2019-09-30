const request = require('../request');
const db = require('../db');
const mongoose = require('mongoose');

describe('reviews api', () => {
  beforeEach(() => {
    return db.dropCollection('reviews');
  });

  const data = {
    rating: 5,
    reviewer: new mongoose.Types.ObjectId,
    review: 'It\'s great!',
    film: new mongoose.Types.ObjectId
  }

  function postReview(obj) {
    return request 
      .post('/api/reviews')
      .send(obj)
      .expect(200)
      .then(({ body }) => body);
  }

  it('posts a review', () => {
    return postReview(data)
      .then(review => {
        expect(review).toEqual({
          rating: 5,
          reviewer: expect.any(String),
          review: 'It\'s great!',
          film: expect.any(String),
          _id: expect.any(String),
          __v: 0
        })
      })
  })
})