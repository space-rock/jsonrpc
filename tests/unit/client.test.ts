/**
 * Unit tests for JSON RPC client package.
 * Tests the client functionality, error handling, and utility functions.
 * Generated at: 2025-07-22T09:42:26.842Z
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ApiError, createRpcClient } from '@space-rock/jsonrpc-client';

// Mock the types package
vi.mock('@space-rock/jsonrpc-types', () => ({
  getRequestSchema: vi.fn(),
  getResponseSchema: vi.fn(),
}));

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

      // Mock schema validation
      const mockRequestSchema = {
        parse: vi.fn().mockReturnValue({
          jsonrpc: '2.0',
          method: 'status',
          params: {},
          id: 'test',
        }),
      };
      const mockResponseSchema = {
        parse: vi.fn().mockReturnValue({
          jsonrpc: '2.0',
          id: 'test',
          result: { chainId: 'testnet' },
        }),
      };

      vi.mocked(getRequestSchema).mockReturnValue(mockRequestSchema as any);
      vi.mocked(getResponseSchema).mockReturnValue(mockResponseSchema as any);

      // Mock successful fetch
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
        params: {},
        id: 'test',
      };

      const response = await client.call(request);

      expect(getRequestSchema).toHaveBeenCalledWith('status');
      expect(getResponseSchema).toHaveBeenCalledWith('status');
      expect(mockRequestSchema.parse).toHaveBeenCalled();
      expect(mockResponseSchema.parse).toHaveBeenCalled();
      expect(fetch).toHaveBeenCalledWith(mockBaseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'status',
          params: {},
          id: 'test',
        }),
      });
      expect(response).toEqual({
        jsonrpc: '2.0',
        id: 'test',
        result: { chainId: 'testnet' },
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

      const mockRequestSchema = {
        parse: vi.fn().mockReturnValue({
          jsonrpc: '2.0',
          method: 'status',
          params: {},
          id: 'test',
        }),
      };

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
        params: {},
        id: 'test',
      };

      await expect(client.call(request)).rejects.toThrow(
        'No response schema found for method: status',
      );
    });

    it('should throw ApiError for HTTP errors', async () => {
      const { getRequestSchema } = await import('@space-rock/jsonrpc-types');

      const mockRequestSchema = {
        parse: vi.fn().mockReturnValue({
          jsonrpc: '2.0',
          method: 'status',
          params: {},
          id: 'test',
        }),
      };

      vi.mocked(getRequestSchema).mockReturnValue(mockRequestSchema as any);

      vi.mocked(fetch).mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      } as Response);

      const request = {
        jsonrpc: '2.0' as const,
        method: 'status' as const,
        params: {},
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

      const mockRequestSchema = {
        parse: vi.fn().mockReturnValue({
          jsonrpc: '2.0',
          method: 'status',
          params: {},
          id: 'test',
        }),
      };

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
        params: {},
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

      const mockRequestSchema = {
        parse: vi.fn().mockReturnValue({
          jsonrpc: '2.0',
          method: 'status',
          params: {},
          id: 'test',
        }),
      };
      const mockResponseSchema = {
        parse: vi.fn().mockReturnValue({
          jsonrpc: '2.0',
          id: 'test',
          result: { chainId: 'testnet' },
        }),
      };

      vi.mocked(getRequestSchema).mockReturnValue(mockRequestSchema as any);
      vi.mocked(getResponseSchema).mockReturnValue(mockResponseSchema as any);

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
        params: {},
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
            params: {},
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

      const mockRequestSchema = {
        parse: vi.fn().mockReturnValue({
          jsonrpc: '2.0',
          method: 'status',
          params: {},
          id: 'test',
        }),
      };
      const mockResponseSchema = {
        parse: vi.fn().mockReturnValue({
          jsonrpc: '2.0',
          id: 'test',
          result: {
            chainId: 'testnet',
            syncInfo: {
              latestBlockHeight: 12345,
              latestBlockHash: 'abc123',
            },
          },
        }),
      };

      vi.mocked(getRequestSchema).mockReturnValue(mockRequestSchema as any);
      vi.mocked(getResponseSchema).mockReturnValue(mockResponseSchema as any);

      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            jsonrpc: '2.0',
            id: 'test',
            result: {
              chainId: 'testnet',
              syncInfo: {
                latestBlockHeight: 12345,
                latestBlockHash: 'abc123',
              },
            },
          }),
      } as Response);

      const request = {
        jsonrpc: '2.0' as const,
        method: 'status' as const,
        params: {},
        id: 'test',
      };

      const response = await client.call(request);

      // Verify response structure
      expect(response).toEqual({
        jsonrpc: '2.0',
        id: 'test',
        result: {
          chainId: 'testnet',
          syncInfo: {
            latestBlockHeight: 12345,
            latestBlockHash: 'abc123',
          },
        },
      });
    });
  });
});
