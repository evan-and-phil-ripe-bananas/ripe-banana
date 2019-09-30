const Review = require('../review');
const mongoose = require('mongoose');

describe('Review model', () => {

  it('valid model all properties', ( )=> {

    const data = {
      rating: 5,
      reviewer: new mongoose.Types.ObjectId,
      review: 'It\'s great!',
      film: new mongoose.Types.ObjectId
    }

    const review = new Review(data);
    const errors = review.validateSync();
    expect(errors).toBeUndefined();

    const json = review.toJSON();
    expect(json).toEqual({
      rating: 5,
      reviewer: expect.any(Object),
      review: 'It\'s great!',
      film: expect.any(Object),
      _id: expect.any(Object)
    });
  });

  it('validates required properties', () => {
    const data = {};
    const review = new Review(data);
    const { errors } = review.validateSync();
    expect(errors.rating.kind).toBe('required');
    expect(errors.reviewer.kind).toBe('required');
    expect(errors.review.kind).toBe('required');
    expect(errors.film.kind).toBe('required');

  });
});