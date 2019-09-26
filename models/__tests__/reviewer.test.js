const Reviewer = require('../reviewer');

describe('Reviewer model', ()=> {

  it('valid model all properties', () => {
    const data = {
      name: 'Gene Siskel',
      company: 'HBO'
    };

    const reviewer = new Reviewer(data);
    const errors = reviewer.validateSync();
    expect(errors).toBeUndefined();

    const json = reviewer.toJSON();

    expect(json).toEqual({
      ...data,
      _id: expect.any(Object),
    });
    
  });
});