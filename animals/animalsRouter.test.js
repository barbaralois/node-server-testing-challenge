const server = require('../api/server.js');
const supertest = require('supertest');
const Animals = require('./animalsModel.js');
const db = require('../data/connection.js');

describe('GET /animals', () => {
  beforeEach(async () => {
    await db('animals').truncate();
    await Animals.insert({ name: 'Gorilla' });
    await Animals.insert({ name: 'Rabbit' });
  });

  it('should respond with status 200 OK', async () => {
    await supertest(server).get('/api/animals').expect(200);
  });

  it('should respond with JSON', async () => {
    await supertest(server)
      .get('/api/animals')
      .then((res) => {
        expect(res.type).toMatch(/json/i);
      });
  });

  it('should respond with an array of animals', async () => {
    await supertest(server)
      .get('/api/animals')
      .then((res) => {
        expect(res.body).toHaveLength(2);
      });
  });
});

describe('GET /animals/:id', () => {
  beforeEach(async () => {
    await db('animals').truncate();
    await Animals.insert({ name: 'Elephant' });
  });

  it('should respond with status 200 OK', async () => {
    await supertest(server).get('/api/animals/1').expect(200);
  });

  it('should respond with JSON', async () => {
    await supertest(server)
      .get('/api/animals/1')
      .then((res) => {
        expect(res.type).toMatch(/json/i);
      });
  });

  it('should respond with name: elephant', async () => {
    await supertest(server)
      .get('/api/animals/1')
      .then((res) => {
        expect(res.body.name).toBe('Elephant');
      });
  });
});

describe('POST /animals', () => {
  beforeEach(async () => {
    await db('animals').truncate();
    await Animals.insert({ name: 'Donkey' });
  });

  it('should respond with status 201 OK', async () => {
    await supertest(server)
      .post('/api/animals')
      .send({ name: 'Kangaroo' })
      .then((res) => {
        expect(res.status).toBe(201);
      });
  });

  it('should respond with JSON', async () => {
    await supertest(server)
      .post('/api/animals')
      .then((res) => {
        expect(res.type).toMatch(/json/i);
      });
  });

  it('should add a new animal to the database', async () => {
    await supertest(server)
      .post('/api/animals')
      .send({ name: 'Kangaroo' })
      .then((res) => {
        return supertest(server)
          .get('/api/animals')
          .then((res) => {
            expect(res.body).toHaveLength(2);
          });
      });
  });
});

describe('DELETE /animals/:id', () => {
  beforeEach(async () => {
    await db('animals').truncate();
    await Animals.insert({ name: 'Dog' });
    await Animals.insert({ name: 'Zebra' });
  });

  it('should respond with status 200', async () => {
    await supertest(server)
      .delete('/api/animals/1')
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it(`should respond with the deleted animal's id`, async () => {
    await supertest(server)
      .delete('/api/animals/2')
      .then((res) => {
        expect(res.body.removed).toBe('2');
      });
  });

  it('should remove an animal from the database', async () => {
    await supertest(server)
      .delete('/api/animals/1')
      .then((res) => {
        return supertest(server)
          .get('/api/animals')
          .then((res) => {
            expect(res.body).toHaveLength(10);
          });
      });
  });
});
