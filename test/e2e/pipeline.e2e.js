/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/app.js';

describe('Pipeline Unit e2e test', () => {
  let server;

  beforeAll(async () => {
    server = await app();
  });

  // test('Successful POST /pipeline response', async () => {
  //   const requestBody = {
  //     sessionId: '1234567890',
  //     prompt: 'Hello world',
  //   };

  //   const response = await request(server)
  //     .post('/pipeline')
  //     .send(requestBody)
  //     // .set('Accept', 'application/json')
  //     // .expect('Content-Type', /json/)
  //     .expect(200);

  //   expect(response.body).toBeDefined();
  // });

  test('Unsuccessful POST /pipeline response: Bad RequestBody ', async () => {
    const requestBody = { something: 'something' };

    const response = await request(server)
      .post('/pipeline')
      .send(requestBody)
      // .set('Accept', 'application/json')
      // .expect('Content-Type', /json/)
      .expect(400); // FIXME in the source app code: this should be 400

    expect(response.body).toBeDefined();
  });
});
