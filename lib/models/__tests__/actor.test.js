const Actor = require('../actor');

describe('Actor model', () => {
  
  it('valid model all properties', () => {
    
    const data = {
      name: 'Brad Pitt',
      dob: new Date(12/18/1963),
      pob: 'Shawnee, OK'
    };
  
    const actor = new Actor(data);
    const errors = actor.validateSync();
    expect(errors).toBeUndefined();

    const json = actor.toJSON();

    expect(json).toEqual({
      ...data,
      _id: expect.any(Object),
    });
  });

  it('validates required properties', () => {
    const data = {};
    const actor = new Actor(data);
    const { errors } = actor.validateSync();
    expect(errors.name.kind).toBe('required');
  })
});