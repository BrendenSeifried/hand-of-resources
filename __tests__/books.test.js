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
  });

  afterAll(() => {
    pool.end();
  });
});
