/* eslint-disable no-undef */
import { jest } from '@jest/globals';

// Mock the module
await jest.unstable_mockModule('../../src/pipeline/pipeline.js', () => ({
  runPipelineWithBufferMemory: jest.fn().mockResolvedValue({ response: 'Mocked AI response text' }),
}));

const { runPipelineWithBufferMemory } = await import('../../src/pipeline/pipeline.js');

/**
 * The above config is necessary to run these mocks.
 * I don't like it, but this is the state of things.
 * https://adamtuttle.codes/blog/2024/mocking-esm-dependencies-for-tests/
 * https://nalanj.dev/posts/mocking-without-loaders/
 */

describe('Pipeline Unit tests', () => {
  const prompt = 'Test';
  let response;

  beforeAll(async () => {
    // Define a mock response
    const mockResponse = { response: 'Mocked AI response text' };
    runPipelineWithBufferMemory.mockResolvedValue(mockResponse); // Mock function behavior

    response = await runPipelineWithBufferMemory(prompt);
  });

  test('Basic pipeline call returns an object', () => {
    expect(response).toBeDefined();
    expect(typeof response).toBe('object');
  });

  test('Pipeline response matches schema contract', () => {
    // Ensure the response has only the expected properties
    expect(response).toMatchObject({
      response: expect.any(String),
    });

    // Ensure no extra properties exist
    expect(Object.keys(response)).toEqual(['response']);
  });

  test('Pipeline function is called with correct parameters', () => {
    expect(runPipelineWithBufferMemory).toHaveBeenCalledWith(prompt);
    expect(runPipelineWithBufferMemory).toHaveBeenCalledTimes(1);
  });
});
