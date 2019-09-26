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
});