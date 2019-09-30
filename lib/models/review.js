const mongoose = require('mongoose');
const { Schema } = mongoose;
const { RequiredString, RequiredNumber } = require('./required-types');

const schema = new Schema({
  rating: {
    type: Number,
    required: true,
    max: 5,
    min: 1
  },

  reviewer: {
    type: mongoose.Types.ObjectId,
    ref: 'Reviewer',
    required: true
  },

  review: {
    type: String,
    required: true,
    maxLength: 140
  },

  film: {
    type: mongoose.Types.ObjectId,
    ref: 'Film',
    required: true
  }

});

module.exports = mongoose.model('Review', schema);