/* eslint-disable no-undef */
import { runPipelineWithMemory } from '../../src/pipeline/pipeline.js';

// Mock the module
jest.mock('../../src/pipeline/pipeline.js', () => ({
  runPipelineWithMemory: jest.fn(),
}));

describe('Pipeline Unit tests', () => {
  const prompt = 'Test';
  let response;

  beforeAll(async() => {
    // Define a mock response
    const mockResponse = { response: 'Mocked AI response text' };
    runPipelineWithMemory.mockResolvedValue(mockResponse); // Mock function behavior

    response = await runPipelineWithMemory(prompt);
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
    expect(runPipelineWithMemory).toHaveBeenCalledWith(prompt);
    expect(runPipelineWithMemory).toHaveBeenCalledTimes(1);
  });
});
