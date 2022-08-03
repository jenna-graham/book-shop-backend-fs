const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('GET /books should return a list of books', async () => {
    const res = await request(app).get('/books');
    expect(res.body.length).toEqual(9);
    const aNewEarth = res.body.find((char) => char.id === '1');
    expect(aNewEarth).toHaveProperty('title', 'A New Earth');
  });
  it('GET /books/:id should return the book detail', async () => {
    const res = await request(app).get('/books/1');
    expect(res.body).toEqual({
      id: '1',
      title: 'A New Earth',
      released: 2005,
    });
  });

  afterAll(() => {
    pool.end();
  });
});
