const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Book = require('../lib/models/Book');
const Author = require('../lib/models/Author');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('GET /books should return a list of books', async () => {
    const res = await request(app).get('/books');
    expect(res.body.length).toEqual(7);
    const aNewEarth = res.body.find((char) => char.id === '1');
    expect(aNewEarth).toHaveProperty('title', 'A New Earth');
  });

  it('GET /books/:id should return the book detail', async () => {
    const res = await request(app).get('/books/1');
    expect(res.body).toEqual({
      id: '1',
      title: 'A New Earth',
      released: 2005,
      authors: expect.any(Array),
    });
  });
  it('GET /authors should return a list of authors', async () => {
    const res = await request(app).get('/authors');
    expect(res.body.length).toEqual(9);
    const eckhartTolle = res.body.find((char) => char.id === '1');
    expect(eckhartTolle).toHaveProperty('name', 'Eckhart Tolle');
  });

  it('GET /authors/:id should return the author detail', async () => {
    const res = await request(app).get('/authors/1');
    expect(res.body).toEqual({
      id: '1',
      name: 'Eckhart Tolle',
      dob: '2/16/1948',
      pob: 'Lünen, Germany',
      books: expect.any(Array),
    });
  });

  it('should add a new book', async () => {
    const book = new Book({
      title: 'Life of Jenna',
      released: 2022,
    });
    const res = await request(app).post('/books').send(book);
    expect(res.body.title).toEqual(book.title);
    expect(res.body.released).toEqual(book.released);
  });

  it('should add a new author', async () => {
    const author = new Author({
      name: 'Jenna Graham',
      dob: '1/02/1985',
      pob: 'Eugene OR',
    });
    const res = await request(app).post('/authors').send(author);
    expect(res.body.name).toEqual(author.name);
    expect(res.body.dob).toEqual(author.dob);
    expect(res.body.pob).toEqual(author.pob);
  });

  afterAll(() => {
    pool.end();
  });
});
