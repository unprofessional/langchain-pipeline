/* eslint-disable no-undef */
import { jest } from '@jest/globals';
import request from 'supertest';

describe('Pipeline Unit e2e test', () => {
  let server;
  let runPipelineWithPersistence;

  /**
   * We need to set up the mocks here for synchronous mock-to-call purposes...
   */
  beforeAll(async () => {
    // Mock module inside beforeAll to ensure it applies before importing app
    jest.unstable_mockModule('../../src/pipeline/pipeline.js', () => ({
      runPipelineWithPersistence: jest.fn().mockResolvedValue({ response: 'Mocked AI response text' }),
    }));

    // Import mocked function AFTER applying mock
    ({ runPipelineWithPersistence } = await import('../../src/pipeline/pipeline.js'));

    // Import app AFTER mock is applied
    const appModule = await import('../../src/app.js');
    server = await appModule.default();
  });

  test('Successful POST /pipeline response', async () => {
    const requestBody = {
      sessionId: '1234567890',
      prompt: 'Hello world',
    };

    const response = await request(server)
      .post('/pipeline')
      .send(requestBody)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(runPipelineWithPersistence).toHaveBeenCalledWith('Hello world', '1234567890'); // ✅ Verify mock
  });

  test('Unsuccessful POST /pipeline response: Bad RequestBody', async () => {
    const requestBody = { something: 'something' };

    const response = await request(server)
      .post('/pipeline')
      .send(requestBody)
      .expect(400);

    expect(response.body).toBeDefined();
  });
});
