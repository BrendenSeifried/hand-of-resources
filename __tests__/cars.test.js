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

  it('Test to render car info by ID', async () => {
    const resp = await request(app).get('/cars/4');
    expect(resp.status).toEqual(200);
    const carSpecs = {
      make: 'Pontiac',
      model: 'GTO Judge',
      year: 1969,
    };
    expect(resp.body).toEqual(carSpecs);
  });

  it('Test to create a car', async () => {
    const resp = await request(app).post('/cars').send({
      make: 'Aston Martin',
      model: 'DB5',
      year: 1964,
    });
    expect(resp.status).toEqual(200);
    expect(resp.body).toHaveProperty('make', 'Aston Martin');
    expect(resp.body).toHaveProperty('model', 'DB5');
    expect(resp.body).toHaveProperty('year', 1964);
  });

  it('Test to update car', async () => {
    const resp = await (
      await request(app).put('/cars/3')
    ).setEncoding({
      make: 'Canopysaurus',
      model: 'Flintmobile',
      year: 93,
    });
    expect(resp.status).toEqual(200);
    expect(resp.body).toHaveProperty('make', 'Canopysaurus');
    expect(resp.body).toHaveProperty('model', 'Flintmobile');
    expect(resp.body).toHaveProperty('year', 93);
  });

  afterAll(() => {
    pool.end();
  });
});
