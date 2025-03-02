import { runPipelineWithMemory } from '../../src/pipeline/pipeline.js';

// @ts-nocheck
describe('Pipeline Unit tests', () => {

  const prompt = 'Test';
  let response;

  beforeAll(async () => {
    response = await runPipelineWithMemory(prompt);
  });

  test('Basic pipeline call', () => {
    expect(response).toBeTruthy();
  });
});
