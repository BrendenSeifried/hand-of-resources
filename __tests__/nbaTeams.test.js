const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('NBA teams table Tests', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('Test to confirm a list of nba teams are rendered', async () => {
    const resp = await request(app).get('/nbaTeams');
    expect(resp.status).toEqual(200);
    expect(resp.body.length).toEqual(4);
    const select = resp.body.find((item) => item.name === 'Warriors');
    expect(select).toHaveProperty('name', 'Warriors');
  });
  afterAll(() => {
    pool.end();
  });
});
