const request = require('../request');
const db = require('../db');
const mongoose = require('mongoose');

describe('films api', () => {
  beforeEach(() => {
    return db.dropCollection('films');
  });

  const data = {
    title: 'The Matrix',
    studio: new mongoose.Types.ObjectId(),
    released: 1999,
    cast: [
      {
        role: 'wizard',
        actor: new mongoose.Types.ObjectId()
      }
    ]
  };

  function postFilm(obj) {
    return request
      .post('/api/films')
      .send(obj)
      .expect(200)
      .then(({ body }) => body);
  }

  it('posts a film', () => {
    return postFilm(data).then(film => {
      expect(film).toEqual({
        _id: expect.any(String),
        __v: 0,
        title: 'The Matrix',
        studio: expect.any(String),
        released: 1999,
        cast: [
          {
            _id: expect.any(String),
            role: 'wizard',
            actor: expect.any(String)
          }
        ]
      });
    });
  });

  it('gets all films', () => {
    return Promise.all([postFilm(data), postFilm(data), postFilm(data)])
      .then(() => {
        return request.get('/api/films').expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(3);
        expect(body[0]).toEqual({
          _id: expect.any(String),
          __v: 0,
          title: 'The Matrix',
          studio: expect.any(String),
          released: 1999,
          cast: [
            {
              _id: expect.any(String),
              role: 'wizard',
              actor: expect.any(String)
            }
          ]
        });
      });
  });
  it('gets a film by id', () => {
  //   return postFilm(data).then(film => {
  //     return request
  //       .post(`/api/actors`)
  //       .send({
  //         name: 'Brad Pitt',
  //         dob: new Date(12 / 18 / 1963),
  //         pob: 'Shawnee, OK'
  //       })
  //       .expect(200)
  //       .then(() => {
  //         return request.get(`/api/films/${film._id}`).expect(200);
  //       })
  //       .then(({ body }) => {
  //         console.log(body);
  //         expect(body).toMatchInlineSnapshot(
  //           {
  //             _id: expect.any(String),
  //             cast: [
  //               // {
  //               //   _id: expect.any(String)
  //               // }
  //             ]
  //           },
  //           `
  //           Object {
  //             "__v": 0,
  //             "_id": Any<String>,
  //             "cast": Array [],
  //             "released": 1999,
  //             "studio": "5d8e9b422b20505223c485ef",
  //             "title": "The Matrix",
  //           }
  //         `
  //         );
  //       });
  //   });
  // });
});
