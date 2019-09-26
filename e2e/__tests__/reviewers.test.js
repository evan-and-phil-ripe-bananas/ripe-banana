const request = require('../request');
const db = require('../db');

describe('reviewers api', () => {
  beforeEach(() => {
    return db.dropCollection('reviewers');
  });

  const gene = {
    name: 'Gene Siskel',
    company: 'HBO'
  };

  function postReviewer(obj) {
    return request
      .post('/api/reviewers')
      .send(obj)
      .expect(200)
      .then(({ body }) => body);
  }

  it('posts a reviewer', () => {
    return postReviewer(gene).then(reviewer => {
      expect(reviewer).toEqual({
        _id: expect.any(String),
        __v: 0,
        ...gene
      });
    });
  });

  it('gets a reviewer by id', () => {
    return postReviewer(gene).then(reviewer => {
      return request
        .get(`/api/reviewers/${reviewer._id}`)
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
              "company": "HBO",
              "name": "Gene Siskel",
            }
          `
          );
        });
    });
  });

  it('updates a reviewer', () => {
    return postReviewer(gene)
      .then(reviewer => {
        reviewer.company = 'Netflix';
        return request
         .put(`/api/reviewers/${reviewer._id}`)
         .send(reviewer)
         .expect(200);
      })
      .then(({ body }) => {
        expect(body.company).toBe('Netflix');
      })
  });
});
