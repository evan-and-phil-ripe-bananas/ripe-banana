const request = require('../request');
const db = require('../db');

describe('Studio api', () => {
  beforeEach(() => {
    return db.dropCollection('studios');
  });

  const hbo = {
    name: 'HBO',
    address:{
      city: 'New York',
      state: 'New York',
      country: 'United States'
    }
  };

  function postStudio(studio) {
    return request
      .post('/api/studios')
      .send(studio)
      .expect(200)
      .then(({ body }) => body);
  }
  it('posts a studio', () => {
    return postStudio(hbo).then(studio => {
      expect(studio).toEqual({
        _id: expect.any(String),
        __v: 0,
        ...hbo
      });
    });
  });
});