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

  it('Test to render a single team by Id', async () => {
    const resp = await request(app).get('/nbaTeams/1');
    expect(resp.status).toEqual(200);
    const oneTeam = {
      id: '1',
      name: 'Bulls',
      city: 'Chicago',
      state: 'illinois',
    };
    expect(resp.body).toEqual(oneTeam);
  });

  it('Test to create a new NBA Team', async () => {
    const resp = await request(app).post('/nbateams').send({
      name: 'Lakers',
      city: 'Los Angeles',
      state: 'California',
    });
    expect(resp.status).toEqual(200);
    expect(resp.body).toHaveProperty('name', 'Lakers');
    expect(resp.body).toHaveProperty('city', 'Los Angeles');
    expect(resp.body).toHaveProperty('state', 'California');
  });
  afterAll(() => {
    pool.end();
  });
});
