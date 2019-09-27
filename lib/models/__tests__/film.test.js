const Film = require('../film');
const mongoose = require('mongoose');

describe('Film model', () => {
  
  it('valid model all properties', () => {
    
    const data = {
      title: 'The Matrix',
      studio: new mongoose.Types.ObjectId,
      released: 1999,
      cast: [{
        role: 'wizard',
        actor: new mongoose.Types.ObjectId
      }
      ]
    };
  
    const film = new Film(data);
    const errors = film.validateSync();
    expect(errors).toBeUndefined();

    const json = film.toJSON();
    expect(json).toEqual({
      title: 'The Matrix',
      studio: expect.any(Object),
      released: 1999,
      cast: expect.any(Array),
      _id: expect.any(Object),
    });
  });

  it('validates required properties', () => {
    const data = {cast: [{}]};
    const film = new Film(data);
    const { errors } = film.validateSync();
    expect(errors.title.kind).toBe('required');
    expect(errors.studio.kind).toBe('required');
    expect(errors.released.kind).toBe('required');
    expect(errors['cast.0.actor'].kind).toBe('required');
  })
});