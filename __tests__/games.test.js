const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('Games Table Tests', () => {
  it('Test to confirm a list of games are rendered', async () => {
    const resp = await require(app).get('/games');
    expect(resp.status).toEqual(200);
    expect(resp.body.length).toEqual(7);
    const select = resp.body.find((item) => item.name === 'Road Rash64');
    expect(select).toHaveProperty('name', 'Road Rash64');
  });
});
