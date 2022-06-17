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

  it('Test that /boxers/8 is routing correctly by id', async () => {
    const resp = await request(app).get('/boxers/8');
    expect(resp.status).toEqual(200);
    const pacMan = {
      id: '8',
      name: 'Manny Pacquiao',
      dob: 'December 17, 1978',
      wins: 62,
      losses: 8,
    };
    expect(resp.body).toEqual(pacMan);
  });

  it('Test that a fighter cant be updated with new props', async () => {
    const resp = await request(app).put('/boxers/3').send({
      name: 'Teddy Atlas',
      dob: 'July 29, 1956',
      wins: 100,
      losses: 5,
    });
    expect(resp.status).toEqual(200);
    expect(resp.body).toHaveProperty('name', 'Teddy Atlas');
    expect(resp.body).toHaveProperty('dob', 'July 29, 1956');
    expect(resp.body).toHaveProperty('wins', 100);
    expect(resp.body).toHaveProperty('losses', 5);
  });

  it('Test for the ability to delete a boxer', async () => {
    const resp = await request(app).delete('/boxers/2');
    expect(resp.status).toEqual(200);

    const { body } = await request.agent(app).get('/boxers/2');
    expect(body).toEqual(null);
  });

  afterAll(() => {
    pool.end();
  });
});
