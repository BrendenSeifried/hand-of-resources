const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('Cars table tests', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('Test to render list of cars (4)', async () => {
    const resp = await request(app).get('/cars');
    expect(resp.status).toEqual(200);
    expect(resp.body.length).toEqual(4);
    const one = resp.body.find((item) => item.model === 'Civic');
    expect(one).toHaveProperty('model', 'Civic');
  });

  afterAll(() => {
    pool.end();
  });
});
