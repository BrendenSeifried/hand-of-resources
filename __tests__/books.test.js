const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

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

  it.skip('Should render a single book with the id of 3', async () => {
    const resp = await request(app).get('books/3');
    expect(resp).toHaveProperty('title', 'Spice and Wolf');
    expect(resp).toHaveProperty('release', 2006);
    expect(resp).toHaveProperty('author', 'Isuna Hasekura');
  });

  afterAll(() => {
    pool.end();
  });
});
