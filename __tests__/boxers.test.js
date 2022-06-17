const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('Boxers test', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('Test that list of seven boxers renders', async () => {
    const resp = await request(app).get('/boxers');
    expect(resp.body.length).toEqual(10);
    const oneBoxer = resp.body.find((data) => data.name === 'Rocky Marciano');
    expect(oneBoxer).toHaveProperty('name', 'Rocky Marciano');
  });

  it('Test that new Boxer is created', async () => {
    const resp = await request(app).post('/boxers').send({
      name: 'Rocky Balboa',
      dob: 'July 6, 1945',
      wins: 57,
      losses: 23,
    });
    expect(resp.status).toEqual(200);
    expect(resp.body).toHaveProperty('name', 'Rocky Balboa');
    expect(resp.body).toHaveProperty('dob', 'July 6, 1945');
    expect(resp.body).toHaveProperty('wins', 57);
    expect(resp.body).toHaveProperty('losses', 23);
  });

  afterAll(() => {
    pool.end();
  });
});
