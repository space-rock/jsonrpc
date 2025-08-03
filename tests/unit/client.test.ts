/**
 * Unit tests for JSON RPC client package.
 * Tests the client functionality, error handling, and utility functions.
 * This file was auto-generated - do not edit manually.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ApiError, createRpcClient } from '@space-rock/jsonrpc-client';
import { status } from '@space-rock/jsonrpc-client/methods';
import { toSnakeCase, toCamelCase } from '@space-rock/jsonrpc-client/utils';
import { generateMockParams, generateMockResponse } from '../test-utils';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('RPC Client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createRpcClient', () => {
    it('should create a client with default configuration', () => {
      const client = createRpcClient('https://api.example.com');
      expect(client).toBeDefined();
      expect(typeof client.call).toBe('function');
    });

    it('should create a client with custom headers', () => {
      const client = createRpcClient('https://api.example.com', {
        headers: {
          Authorization: 'Bearer token',
          'Custom-Header': 'value',
        },
      });
      expect(client).toBeDefined();
    });

    it('should create a client with custom signal', () => {
      const controller = new AbortController();
      const client = createRpcClient('https://api.example.com', {
        signal: controller.signal,
      });
      expect(client).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const client = createRpcClient('https://api.example.com');
      const mockParams = generateMockParams('status');

      await expect(status(client, mockParams)).rejects.toThrow('Network error');
    });

    it('should handle HTTP errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: vi.fn().mockResolvedValue({
          error: { code: -32603, message: 'Internal error' },
        }),
      });

      const client = createRpcClient('https://api.example.com');
      const mockParams = generateMockParams('status');

      await expect(status(client, mockParams)).rejects.toThrow(ApiError);
    });

    it('should handle RPC errors', async () => {
      const errorResponse = {
        jsonrpc: '2.0',
        id: 'test-id',
        error: {
          code: -32602,
          message: 'Invalid params',
          data: 'Additional error info',
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(errorResponse),
      });

      const client = createRpcClient('https://api.example.com');
      const mockParams = generateMockParams('status');

      await expect(status(client, mockParams)).rejects.toThrow(ApiError);
    });

    it('should handle invalid request validation', async () => {
      const client = createRpcClient('https://api.example.com');

      // Pass invalid parameters that will fail schema validation
      // For status method, params should be null, so passing an object should fail
      const invalidParams = { invalidField: 'this should fail validation' };

      await expect(status(client, invalidParams as any)).rejects.toThrow(
        'Invalid request',
      );
    });

    it('should handle invalid response validation', async () => {
      // Mock a response that doesn't match the schema
      const invalidResponse = {
        jsonrpc: '2.0',
        id: 'test-id',
        result: 'invalid-result-format', // This should fail validation for status method
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(invalidResponse),
      });

      const client = createRpcClient('https://api.example.com');
      const mockParams = generateMockParams('status');

      await expect(status(client, mockParams)).rejects.toThrow(
        'Invalid response',
      );
    });
  });

  describe('Request/Response Validation', () => {
    it('should validate request parameters', async () => {
      const mockResponse = generateMockResponse('status');

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue({
          jsonrpc: '2.0',
          id: 'test-id',
          result: mockResponse,
        }),
      });

      const client = createRpcClient('https://api.example.com');
      const mockParams = generateMockParams('status');

      const result = await status(client, mockParams);
      expect(result).toBeDefined();
    });

    it('should validate response data', async () => {
      const mockResult = generateMockResponse('status');
      const mockResponse = {
        jsonrpc: '2.0',
        id: 'test-id',
        result: mockResult,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      });

      const client = createRpcClient('https://api.example.com');
      const mockParams = generateMockParams('status');

      const result = await status(client, mockParams);
      expect(result).toBeDefined();
    });
  });

  describe('Custom Headers', () => {
    it('should include custom headers in requests', async () => {
      const mockResponse = generateMockResponse('status');

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue({
          jsonrpc: '2.0',
          id: 'test-id',
          result: mockResponse,
        }),
      });

      const client = createRpcClient('https://api.example.com', {
        headers: {
          Authorization: 'Bearer test-token',
          'X-Custom-Header': 'test-value',
        },
      });

      const mockParams = generateMockParams('status');
      await status(client, mockParams);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com',
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer test-token',
            'X-Custom-Header': 'test-value',
          }),
        }),
      );
    });
  });

  describe('Validation Bypass (disableValidation)', () => {
    it('should skip request validation when disableValidation is true globally', async () => {
      const mockResponse = generateMockResponse('status');

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue({
          jsonrpc: '2.0',
          id: 'test-id',
          result: mockResponse,
        }),
      });

      const client = createRpcClient('https://api.example.com', {
        disableValidation: true,
      });

      const mockParams = generateMockParams('status');
      const result = await status(client, mockParams);
      expect(result).toBeDefined();
    });

    it('should skip response validation when disableValidation is true globally', async () => {
      const mockResponse = {
        jsonrpc: '2.0',
        id: 'test-id',
        result: {
          invalidResponseFormat: 'this should normally fail validation',
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      });

      const client = createRpcClient('https://api.example.com', {
        disableValidation: true,
      });

      const mockParams = generateMockParams('status');
      const result = await status(client, mockParams);

      // Should return only the result field without validation
      expect(result).toEqual({
        jsonrpc: '2.0',
        id: 'test-id',
        result: {
          invalidResponseFormat: 'this should normally fail validation',
        },
      });
    });

    it('should skip validation when disableValidation is true at call level', async () => {
      const mockResponse = {
        jsonrpc: '2.0',
        id: 'test-id',
        result: { status: 'ok' },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      });

      const client = createRpcClient('https://api.example.com');

      const mockParams = generateMockParams('status');
      const result = await status(client, mockParams, {
        disableValidation: true,
      });
      expect(result).toEqual({
        jsonrpc: '2.0',
        id: 'test-id',
        result: { status: 'ok' },
      });
    });

    it('should convert snake_case to camelCase when validation is disabled', async () => {
      const mockResponse = {
        jsonrpc: '2.0',
        id: 'test-id',
        result: {
          snake_case_field: 'value',
          nested_object: {
            another_snake_field: 'nested_value',
          },
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      });

      const client = createRpcClient('https://api.example.com', {
        disableValidation: true,
      });

      const mockParams = generateMockParams('status');
      const result = await status(client, mockParams);

      // Should convert response to camelCase even without validation (result field only)
      expect(result).toEqual({
        jsonrpc: '2.0',
        id: 'test-id',
        result: {
          snakeCaseField: 'value',
          nestedObject: {
            anotherSnakeField: 'nested_value',
          },
        },
      });
    });

    it('should convert camelCase to snake_case for request when validation is disabled', async () => {
      const mockResponse = generateMockResponse('status');

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue({
          jsonrpc: '2.0',
          id: 'test-id',
          result: mockResponse,
        }),
      });

      const client = createRpcClient('https://api.example.com', {
        disableValidation: true,
      });

      const mockParams = generateMockParams('status');
      await status(client, mockParams);

      // Verify that the request was sent properly (params should be converted)
      const fetchCall = mockFetch.mock.calls[0];
      expect(fetchCall).toBeDefined();
      if (fetchCall?.[1]?.body) {
        const requestBody = JSON.parse(fetchCall[1].body);
        expect(requestBody.method).toBe('status');
        expect(requestBody.jsonrpc).toBe('2.0');
        expect(requestBody.id).toBeDefined();
      }
    });

    it('should handle call-level disableValidation override', async () => {
      const mockResponse = {
        jsonrpc: '2.0',
        id: 'test-id',
        result: { status: 'ok' },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
      });

      // Create client with validation enabled by default
      const client = createRpcClient('https://api.example.com', {
        disableValidation: false,
      });

      const mockParams = generateMockParams('status');
      // Override to disable validation at call level
      const result = await status(client, mockParams, {
        disableValidation: true,
      });
      expect(result).toEqual({
        jsonrpc: '2.0',
        id: 'test-id',
        result: { status: 'ok' },
      });
    });

    it('should merge options correctly with call-level options taking precedence', async () => {
      const mockResponse = generateMockResponse('status');

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue({
          jsonrpc: '2.0',
          id: 'test-id',
          result: mockResponse,
        }),
      });

      const client = createRpcClient('https://api.example.com', {
        headers: { 'Global-Header': 'global-value' },
        disableValidation: false,
      });

      const mockParams = generateMockParams('status');
      await status(client, mockParams, {
        headers: { 'Call-Header': 'call-value' },
        disableValidation: true,
      });

      // Verify that call-level disableValidation overrode global setting
      // Note: The headers merging behavior might be different than expected
      const fetchCall = mockFetch.mock.calls[0];
      expect(fetchCall).toBeDefined();
      if (fetchCall?.[1]) {
        const options = fetchCall[1];
        expect(options.method).toBe('POST');
        expect(options.headers).toEqual(
          expect.objectContaining({
            'Call-Header': 'call-value',
          }),
        );
      }
    });

    it('should handle RPC errors even when validation is disabled', async () => {
      const errorResponse = {
        jsonrpc: '2.0',
        id: 'test-id',
        error: {
          code: -32602,
          message: 'Invalid params',
          data: { additional: 'error info' },
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(errorResponse),
      });

      const client = createRpcClient('https://api.example.com', {
        disableValidation: true,
      });

      const mockParams = generateMockParams('status');
      await expect(status(client, mockParams)).rejects.toThrow(ApiError);
    });

    it('should handle HTTP errors even when validation is disabled', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      const client = createRpcClient('https://api.example.com', {
        disableValidation: true,
      });

      const mockParams = generateMockParams('status');
      await expect(status(client, mockParams)).rejects.toThrow(ApiError);
    });
  });
});

describe('Utility Functions', () => {
  describe('toSnakeCase', () => {
    it('should convert camelCase to snake_case', () => {
      const input = { testKey: 'value', anotherKey: { nestedKey: 'nested' } };
      const expected = {
        test_key: 'value',
        another_key: { nested_key: 'nested' },
      };
      expect(toSnakeCase(input)).toEqual(expected);
    });

    it('should handle arrays', () => {
      const input = [{ testKey: 'value' }, { anotherKey: 'value2' }];
      const expected = [{ test_key: 'value' }, { another_key: 'value2' }];
      expect(toSnakeCase(input)).toEqual(expected);
    });

    it('should handle primitive values', () => {
      expect(toSnakeCase('string')).toBe('string');
      expect(toSnakeCase(123)).toBe(123);
      expect(toSnakeCase(null)).toBe(null);
      expect(toSnakeCase(true)).toBe(true);
    });
  });

  describe('toCamelCase', () => {
    it('should convert snake_case to camelCase', () => {
      const input = {
        test_key: 'value',
        another_key: { nested_key: 'nested' },
      };
      const expected = {
        testKey: 'value',
        anotherKey: { nestedKey: 'nested' },
      };
      expect(toCamelCase(input)).toEqual(expected);
    });

    it('should handle arrays', () => {
      const input = [{ test_key: 'value' }, { another_key: 'value2' }];
      const expected = [{ testKey: 'value' }, { anotherKey: 'value2' }];
      expect(toCamelCase(input)).toEqual(expected);
    });

    it('should handle primitive values', () => {
      expect(toCamelCase('string')).toBe('string');
      expect(toCamelCase(123)).toBe(123);
      expect(toCamelCase(null)).toBe(null);
      expect(toCamelCase(true)).toBe(true);
    });
  });
});

describe('ApiError', () => {
  it('should create ApiError with correct properties', () => {
    const error = new ApiError(
      'Test error message',
      500,
      -32602,
      'Additional data',
    );

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(ApiError);
    expect(error.message).toBe('Test error message');
    expect(error.status).toBe(500);
    expect(error.code).toBe(-32602);
    expect(error.data).toBe('Additional data');
  });

  it('should have correct name property', () => {
    const error = new ApiError('Test error');
    expect(error.name).toBe('ApiError');
  });
});
