const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { util } = require('prettier');

describe('Book tests', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('Should render a list of books', async () => {
    const resp = await request(app).get('/books');
    expect(resp.body.length).toEqual(7);
    const singleEntity = resp.body.find(
      (item) => item.title === 'Spice and Wolf'
    );
    expect(singleEntity).toHaveProperty('title', 'Spice and Wolf');
  });

  it('Should render a single book with the id of 3', async () => {
    const resp = await request(app).get('/books/3');
    const keeper = {
      title: 'My Sisters Keeper',
      release: 2004,
      author: 'Jodi Picoult',
    };
    expect(resp.body).toEqual(keeper);
  });

  it('Should create a new Book', async () => {
    const resp = await request(app).post('/books').send({
      title: 'Testing for Dummies',
      release: 2022,
      author: 'Yours Truly',
    });
    expect(resp.status).toEqual(200);
    expect(resp.body).toHaveProperty('title', 'Testing for Dummies');
    expect(resp.body).toHaveProperty('release', 2022);
    expect(resp.body).toHaveProperty('author', 'Yours Truly');
    expect(resp.body.id).not.toBeUndefined();
  });

  it('Should update existing book', async () => {
    const resp = await request(app).put('/books/1').send({
      title: 'Book has been updated',
      release: 2050,
      author: 'Future Person',
    });
    expect(resp.status).toEqual(200);
    expect(resp.body).toHaveProperty('title', 'Book has been updated');
    expect(resp.body).toHaveProperty('release', 2050),
      expect(resp.body).toHaveProperty('author', 'Future Person');
    expect(resp.body.id).not.toBeUndefined();
  });

  it('Should Delete a book', async () => {
    const resp = await request(app).delete('/books/1');
    expect(resp.status).toEqual(200);

    const { body } = await request(app).get('/books/1');
    expect(body).toEqual(null);
  });

  afterAll(() => {
    pool.end();
  });
});
