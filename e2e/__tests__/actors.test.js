const request = require('../request');
const db = require('../db');

describe('actors api', () => {
  beforeEach(() => {
    return db.dropCollection('actors');
  });

  const brad = {
    name: 'Brad Pitt',
    dob: new Date(1963,11,18),
    pob: 'Shawnee, OK'
  };

  function postActor(obj) {
    return request
      .post('/api/actors')
      .send(obj)
      .expect(200)
      .then(({ body }) => body);
  }

  it('posts an actor', () => {
    return postActor(brad).then(actor => {
      expect(actor).toEqual({
        _id: expect.any(String),
        __v: 0,
        name: 'Brad Pitt',
        dob: expect.any(String),
        pob: 'Shawnee, OK'
      });
    });
  });
})