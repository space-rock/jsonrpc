/**
 * Unit tests for JSON RPC client package.
 * Tests the client functionality, error handling, and utility functions.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ApiError, createRpcClient } from '@space-rock/jsonrpc-client';
import { generateMockParams, generateMockResponse } from '../test-utils';
import { formatZodError } from '@space-rock/jsonrpc-client/utils';
import { ZodError } from 'zod';

// Helper function to create mock schemas that support both parse and safeParse
function createMockRequestSchema(data: any) {
  return {
    parse: vi.fn().mockReturnValue(data),
    safeParse: vi.fn().mockImplementation(input => ({
      success: true,
      data: input, // Return the actual input instead of the mock data
    })),
  };
}

function createMockResponseSchema(data: any) {
  return {
    parse: vi.fn().mockReturnValue(data),
    safeParse: vi.fn().mockReturnValue({
      success: true,
      data: data,
    }),
  };
}

// Mock the types package
vi.mock('@space-rock/jsonrpc-types', async importOriginal => {
  const actual =
    await importOriginal<typeof import('@space-rock/jsonrpc-types')>();
  return {
    ...actual,
    getRequestSchema: vi.fn(),
    getResponseSchema: vi.fn(),
  };
});

// Mock fetch
global.fetch = vi.fn();

describe('JSON RPC Client Package', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('ApiError', () => {
    it('should create ApiError with message only', () => {
      const error = new ApiError('Test error');

      expect(error.name).toBe('ApiError');
      expect(error.message).toBe('Test error');
      expect(error.status).toBeUndefined();
      expect(error.code).toBeUndefined();
      expect(error.data).toBeUndefined();
    });

    it('should create ApiError with all properties', () => {
      const error = new ApiError('Test error', 500, -32603, {
        details: 'error data',
      });

      expect(error.name).toBe('ApiError');
      expect(error.message).toBe('Test error');
      expect(error.status).toBe(500);
      expect(error.code).toBe(-32603);
      expect(error.data).toEqual({ details: 'error data' });
    });

    it('should extend Error properly', () => {
      const error = new ApiError('Test error');

      expect(error instanceof Error).toBe(true);
      expect(error instanceof ApiError).toBe(true);
    });
  });

  describe('formatZodError', () => {
    it('should format single validation error', () => {
      const zodError = new ZodError([
        {
          code: 'invalid_type',
          expected: 'string',
          received: 'undefined',
          path: ['params', 'account_id'],
          message: 'Required',
        },
      ]);

      const formatted = formatZodError(zodError);

      expect(formatted).toEqual({
        'params.account_id': 'Required',
      });
    });

    it('should format multiple validation errors', () => {
      const zodError = new ZodError([
        {
          code: 'invalid_type',
          expected: 'string',
          received: 'undefined',
          path: ['params', 'account_id'],
          message: 'Required',
        },
        {
          code: 'invalid_type',
          expected: 'number',
          received: 'string',
          path: ['params', 'block_height'],
          message: 'Expected number, received string',
        },
      ]);

      const formatted = formatZodError(zodError);

      expect(formatted).toEqual({
        'params.account_id': 'Required',
        'params.block_height': 'Expected number, received string',
      });
    });

    it('should handle nested object validation errors', () => {
      const zodError = new ZodError([
        {
          code: 'invalid_type',
          expected: 'string',
          received: 'undefined',
          path: ['params', 'request', 'account_id'],
          message: 'Required',
        },
        {
          code: 'invalid_literal',
          expected: '2.0',
          received: '1.0',
          path: ['jsonrpc'],
          message: 'Invalid literal value, expected "2.0"',
        },
      ]);

      const formatted = formatZodError(zodError);

      expect(formatted).toEqual({
        'params.request.account_id': 'Required',
        jsonrpc: 'Invalid literal value, expected "2.0"',
      });
    });

    it('should handle array index validation errors', () => {
      const zodError = new ZodError([
        {
          code: 'invalid_type',
          expected: 'string',
          received: 'number',
          path: ['params', 'keys', 0],
          message: 'Expected string, received number',
        },
        {
          code: 'too_small',
          minimum: 1,
          type: 'array',
          inclusive: true,
          path: ['params', 'keys'],
          message: 'Array must contain at least 1 element(s)',
        },
      ]);

      const formatted = formatZodError(zodError);

      expect(formatted).toEqual({
        'params.keys.0': 'Expected string, received number',
        'params.keys': 'Array must contain at least 1 element(s)',
      });
    });

    it('should handle empty path', () => {
      const zodError = new ZodError([
        {
          code: 'invalid_type',
          expected: 'object',
          received: 'string',
          path: [],
          message: 'Expected object, received string',
        },
      ]);

      const formatted = formatZodError(zodError);

      expect(formatted).toEqual({
        '': 'Expected object, received string',
      });
    });

    it('should handle single path element', () => {
      const zodError = new ZodError([
        {
          code: 'invalid_type',
          expected: 'string',
          received: 'undefined',
          path: ['method'],
          message: 'Required',
        },
      ]);

      const formatted = formatZodError(zodError);

      expect(formatted).toEqual({
        method: 'Required',
      });
    });
  });

  describe('createRpcClient', () => {
    const mockBaseUrl = 'https://rpc.testnet.near.org';
    let client: ReturnType<typeof createRpcClient>;

    beforeEach(() => {
      client = createRpcClient(mockBaseUrl);
    });

    it('should create client with base URL', () => {
      expect(client).toBeDefined();
      expect(typeof client.call).toBe('function');
    });

    it('should successfully make RPC call', async () => {
      const { getRequestSchema, getResponseSchema } = await import(
        '@space-rock/jsonrpc-types'
      );

      // Generate dynamic mock data for status method
      const mockParams = generateMockParams('status');
      const mockResult = generateMockResponse('status');

      // Mock schema validation
      const mockRequestSchema = createMockRequestSchema({
        jsonrpc: '2.0',
        method: 'status',
        params: mockParams,
        id: 'test',
      });
      const mockResponseSchema = createMockResponseSchema({
        jsonrpc: '2.0',
        id: 'test',
        result: mockResult,
      });

      vi.mocked(getRequestSchema).mockReturnValue(mockRequestSchema as any);
      vi.mocked(getResponseSchema).mockReturnValue(mockResponseSchema as any);

      // Mock successful fetch
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            jsonrpc: '2.0',
            id: 'test',
            result: mockResult,
          }),
      } as Response);

      const request = {
        jsonrpc: '2.0' as const,
        method: 'status' as const,
        params: mockParams,
        id: 'test',
      };

      const response = await client.call(request);

      expect(getRequestSchema).toHaveBeenCalledWith('status');
      expect(getResponseSchema).toHaveBeenCalledWith('status');
      expect(mockRequestSchema.safeParse).toHaveBeenCalled();
      expect(mockResponseSchema.safeParse).toHaveBeenCalled();
      expect(fetch).toHaveBeenCalledWith(mockBaseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'status',
          params: mockParams,
          id: 'test',
        }),
      });
      expect(response).toEqual({
        jsonrpc: '2.0',
        id: 'test',
        result: mockResult,
      });
    });

    it('should throw error when request schema not found', async () => {
      const { getRequestSchema } = await import('@space-rock/jsonrpc-types');
      vi.mocked(getRequestSchema).mockReturnValue(undefined);

      const request = {
        jsonrpc: '2.0' as const,
        method: 'invalid_method' as any,
        params: {},
        id: 'test',
      };

      await expect(client.call(request)).rejects.toThrow(
        'No request schema found for method: invalid_method',
      );
    });

    it('should throw error when response schema not found', async () => {
      const { getRequestSchema, getResponseSchema } = await import(
        '@space-rock/jsonrpc-types'
      );

      // Generate dynamic mock data for status method
      const mockParams = generateMockParams('status');

      const mockRequestSchema = createMockRequestSchema({
        jsonrpc: '2.0',
        method: 'status',
        params: mockParams,
        id: 'test',
      });

      vi.mocked(getRequestSchema).mockReturnValue(mockRequestSchema as any);
      vi.mocked(getResponseSchema).mockReturnValue(undefined);

      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            jsonrpc: '2.0',
            id: 'test',
            result: { chainId: 'testnet' },
          }),
      } as Response);

      const request = {
        jsonrpc: '2.0' as const,
        method: 'status' as const,
        params: mockParams,
        id: 'test',
      };

      await expect(client.call(request)).rejects.toThrow(
        'No response schema found for method: status',
      );
    });

    it('should throw ApiError for HTTP errors', async () => {
      const { getRequestSchema } = await import('@space-rock/jsonrpc-types');

      // Generate dynamic mock data for status method
      const mockParams = generateMockParams('status');

      const mockRequestSchema = createMockRequestSchema({
        jsonrpc: '2.0',
        method: 'status',
        params: mockParams,
        id: 'test',
      });

      vi.mocked(getRequestSchema).mockReturnValue(mockRequestSchema as any);

      vi.mocked(fetch).mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      } as Response);

      const request = {
        jsonrpc: '2.0' as const,
        method: 'status' as const,
        params: mockParams,
        id: 'test',
      };

      await expect(client.call(request)).rejects.toThrow(ApiError);
      try {
        await client.call(request);
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        if (error instanceof ApiError) {
          expect(error.message).toBe('HTTP 500: Internal Server Error');
          expect(error.status).toBe(500);
        }
      }
    });

    it('should throw ApiError for RPC errors', async () => {
      const { getRequestSchema } = await import('@space-rock/jsonrpc-types');

      // Generate dynamic mock data for status method
      const mockParams = generateMockParams('status');

      const mockRequestSchema = createMockRequestSchema({
        jsonrpc: '2.0',
        method: 'status',
        params: mockParams,
        id: 'test',
      });

      vi.mocked(getRequestSchema).mockReturnValue(mockRequestSchema as any);

      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            jsonrpc: '2.0',
            id: 'test',
            error: {
              code: -32602,
              message: 'Invalid params',
              data: { details: 'Parameter validation failed' },
            },
          }),
      } as Response);

      const request = {
        jsonrpc: '2.0' as const,
        method: 'status' as const,
        params: mockParams,
        id: 'test',
      };

      await expect(client.call(request)).rejects.toThrow(ApiError);
      try {
        await client.call(request);
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        if (error instanceof ApiError) {
          expect(error.message).toBe('Invalid params');
          expect(error.code).toBe(-32602);
          expect(error.data).toEqual({
            details: 'Parameter validation failed',
          });
        }
      }
    });

    it('should use custom fetch options', async () => {
      const customClient = createRpcClient(mockBaseUrl, {
        headers: { Authorization: 'Bearer token' },
        timeout: 5000,
      } as any);

      const { getRequestSchema, getResponseSchema } = await import(
        '@space-rock/jsonrpc-types'
      );

      // Generate dynamic mock data for status method
      const mockParams = generateMockParams('status');
      const mockResult = generateMockResponse('status');

      const mockRequestSchema = createMockRequestSchema({
        jsonrpc: '2.0',
        method: 'status',
        params: mockParams,
        id: 'test',
      });
      const mockResponseSchema = createMockResponseSchema({
        jsonrpc: '2.0',
        id: 'test',
        result: mockResult,
      });

      vi.mocked(getRequestSchema).mockReturnValue(mockRequestSchema as any);
      vi.mocked(getResponseSchema).mockReturnValue(mockResponseSchema as any);

      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            jsonrpc: '2.0',
            id: 'test',
            result: mockResult,
          }),
      } as Response);

      const request = {
        jsonrpc: '2.0' as const,
        method: 'status' as const,
        params: mockParams,
        id: 'test',
      };

      await customClient.call(request);

      expect(fetch).toHaveBeenCalledWith(
        mockBaseUrl,
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            Authorization: 'Bearer token',
          }),
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'status',
            params: mockParams,
            id: 'test',
          }),
          timeout: 5000,
        }),
      );
    });

    it('should handle case conversion properly', async () => {
      const { getRequestSchema, getResponseSchema } = await import(
        '@space-rock/jsonrpc-types'
      );

      // Generate dynamic mock data for status method
      const mockParams = generateMockParams('status');
      const mockResult = generateMockResponse('status');

      const mockRequestSchema = createMockRequestSchema({
        jsonrpc: '2.0',
        method: 'status',
        params: mockParams,
        id: 'test',
      });
      const mockResponseSchema = createMockResponseSchema({
        jsonrpc: '2.0',
        id: 'test',
        result: mockResult,
      });

      vi.mocked(getRequestSchema).mockReturnValue(mockRequestSchema as any);
      vi.mocked(getResponseSchema).mockReturnValue(mockResponseSchema as any);

      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            jsonrpc: '2.0',
            id: 'test',
            result: mockResult,
          }),
      } as Response);

      const request = {
        jsonrpc: '2.0' as const,
        method: 'status' as const,
        params: mockParams,
        id: 'test',
      };

      const response = await client.call(request);

      // Verify response structure
      expect(response).toEqual({
        jsonrpc: '2.0',
        id: 'test',
        result: mockResult,
      });
    });

    describe('request method', () => {
      it('should successfully make RPC request using request method', async () => {
        const { getRequestSchema, getResponseSchema } = await import(
          '@space-rock/jsonrpc-types'
        );

        // Generate dynamic mock data for status method
        const mockParams = generateMockParams('status');
        const mockResult = generateMockResponse('status');

        const mockRequestSchema = createMockRequestSchema({
          jsonrpc: '2.0',
          method: 'status',
          params: mockParams,
          id: expect.any(String),
        });
        const mockResponseSchema = createMockResponseSchema({
          jsonrpc: '2.0',
          id: expect.any(String),
          result: mockResult,
        });

        vi.mocked(getRequestSchema).mockReturnValue(mockRequestSchema as any);
        vi.mocked(getResponseSchema).mockReturnValue(mockResponseSchema as any);

        vi.mocked(fetch).mockResolvedValue({
          ok: true,
          json: () =>
            Promise.resolve({
              jsonrpc: '2.0',
              id: expect.any(String),
              result: mockResult,
            }),
        } as Response);

        const response = await client.request('status', mockParams);

        expect(getRequestSchema).toHaveBeenCalledWith('status');
        expect(getResponseSchema).toHaveBeenCalledWith('status');
        expect(mockRequestSchema.safeParse).toHaveBeenCalled();
        expect(mockResponseSchema.safeParse).toHaveBeenCalled();
        expect(fetch).toHaveBeenCalledWith(
          mockBaseUrl,
          expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: expect.stringContaining('"method":"status"'),
          }),
        );
        expect(response).toEqual({
          jsonrpc: '2.0',
          id: expect.any(String),
          result: mockResult,
        });
      });

      it('should generate random id when using request method', async () => {
        const { getRequestSchema, getResponseSchema } = await import(
          '@space-rock/jsonrpc-types'
        );

        // Generate dynamic mock data for status method
        const mockParams = generateMockParams('status');
        const mockResult = generateMockResponse('status');

        const mockRequestSchema = createMockRequestSchema({
          jsonrpc: '2.0',
          method: 'status',
          params: mockParams,
          id: expect.any(String),
        });
        const mockResponseSchema = createMockResponseSchema({
          jsonrpc: '2.0',
          id: expect.any(String),
          result: mockResult,
        });

        vi.mocked(getRequestSchema).mockReturnValue(mockRequestSchema as any);
        vi.mocked(getResponseSchema).mockReturnValue(mockResponseSchema as any);

        vi.mocked(fetch).mockResolvedValue({
          ok: true,
          json: () =>
            Promise.resolve({
              jsonrpc: '2.0',
              id: expect.any(String),
              result: mockResult,
            }),
        } as Response);

        await client.request('status', mockParams);

        const fetchCall = vi.mocked(fetch).mock.calls[0];
        const requestBody = JSON.parse(fetchCall![1]?.body as string);

        expect(typeof requestBody.id).toBe('string');
        expect(requestBody.id).toMatch(/^[a-z0-9]+$/);
        expect(requestBody.id.length).toBeGreaterThan(0);
      });

      it('should handle errors properly in request method', async () => {
        const { getRequestSchema } = await import('@space-rock/jsonrpc-types');

        // Generate dynamic mock data for status method
        const mockParams = generateMockParams('status');

        const mockRequestSchema = createMockRequestSchema({
          jsonrpc: '2.0',
          method: 'status',
          params: mockParams,
          id: 'test',
        });

        vi.mocked(getRequestSchema).mockReturnValue(mockRequestSchema as any);

        vi.mocked(fetch).mockResolvedValue({
          ok: false,
          status: 500,
          statusText: 'Internal Server Error',
        } as Response);

        await expect(client.request('status', mockParams)).rejects.toThrow(
          ApiError,
        );
      });
    });
  });
});
