const Studio = require('../studio');

describe('Studio model', () => {

  it('validates model with all properties', () => {
    const data = {
      name: 'HBO',
      address:{
        city: 'New York',
        state: 'New York',
        country: 'United States'
      }
    };
  
    const studio = new Studio(data);
    const errors = studio.validateSync();
    expect(errors).toBeUndefined();

    const json = studio.toJSON();

    expect(json).toEqual({
      ...data,
      _id: expect.any(Object)
    });
  });
  it('validates required fields', () => {
    const data = {};
    const studio = new Studio(data);
    const { errors } = studio.validateSync();
    expect(errors.name.kind).toBe('required');
  });
});