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

  it('Test to find a single game via ID', async () => {
    const resp = await request(app).get('/games/4');
    expect(resp.status).toEqual(200);
    const oneGame = {
      id: '4',
      title: 'Blitz the League 2',
      release: 2008,
      genre: 'Football',
      console: 'Xbox360',
    };
    expect(resp.body).toEqual(oneGame);
  });

  it('Test for updating a game with new parameters', async () => {
    const resp = await request(app).put('/games/1').send({
      title: 'Testing: The Video Game',
      release: 2022,
      genre: 'Testing',
      console: 'PC',
    });

    expect(resp.body).toHaveProperty('title', 'Testing: The Video Game');
    expect(resp.body).toHaveProperty('release', 2022);
    expect(resp.body).toHaveProperty('genre', 'Testing');
    expect(resp.body).toHaveProperty('console', 'PC');
  });

  afterAll(() => {
    pool.end();
  });
});
