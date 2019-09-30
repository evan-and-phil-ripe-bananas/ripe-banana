const mongoose = require('mongoose');
const { Schema } = mongoose;
const { RequiredString, RequiredNumber } = require('./required-types');

const schema = new Schema({
  title: RequiredString,
  studio: {
    type: mongoose.Types.ObjectId,
    ref: 'Studio',
    required: true
  },
  released: RequiredNumber,
  cast: [{
    role: String,
    actor: {
      type: mongoose.Types.ObjectId,
      ref: 'Actor',
      required: true
    }
  }]
});

module.exports = mongoose.model('Film', schema);