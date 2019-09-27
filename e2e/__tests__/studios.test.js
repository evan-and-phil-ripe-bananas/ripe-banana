const request = require('../request');
const db = require('../db');

describe('Studio api', () => {
  beforeEach(() => {
    return db.dropCollection('studios');
  });

  const hbo = {
    name: 'HBO',
    address: {
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
  it('gets all studios', () => {
    return Promise.all([postStudio(hbo), postStudio(hbo), postStudio(hbo)])
      .then(() => {
        return request.get('/api/studios').expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(3);
        expect(body[0]).toEqual({
          _id: expect.any(String),
          __v: 0,
          ...hbo
        });
      });
  });
  it('gets a studio by id', () => {
    return postStudio(hbo).then(studio => {
      return request
        .get(`/api/studios/${studio._id}`)
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchInlineSnapshot(
            {
              _id: expect.any(String)
            },
            `
            Object {
              "__v": 0,
              "_id": Any<String>,
              "address": Object {
                "city": "New York",
                "country": "United States",
                "state": "New York",
              },
              "name": "HBO",
            }
          `
          );
        });
    });
  });
});
