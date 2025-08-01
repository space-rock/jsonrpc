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
