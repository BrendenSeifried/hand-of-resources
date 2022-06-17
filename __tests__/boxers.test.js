const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('Boxers test', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('Test that list of seven boxers renders', async () => {
    // const resp = await request(app).get('/boxers');
    // expect(resp.body.length).toEqual(7)
  });
  expect();
});
