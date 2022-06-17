const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('Games Table Tests', () => {
  it('Test to confirm a list of games are rendered', async () => {
    const resp = await request(app).get('/games');
    expect(resp.status).toEqual(200);
    expect(resp.body.length).toEqual(5);
    const select = resp.body.find((item) => item.title === 'Road Rash64');
    expect(select).toHaveProperty('title', 'Road Rash64');
  });

  afterAll(() => {
    pool.end();
  });
});
