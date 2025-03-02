import { runPipelineWithMemory } from '../../src/pipeline/pipeline.js';

// @ts-nocheck
describe('Pipeline Unit tests', () => {

  const prompt = 'Test';
  let response;

  beforeAll(async () => {
    // FIXME: Mock object response and test schema contract instead
    response = await runPipelineWithMemory(prompt);
  });

  test('Basic pipeline call', () => {
    expect(response).toBeTruthy();
  });
});
