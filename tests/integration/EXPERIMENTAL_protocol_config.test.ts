/**
 * Integration tests for EXPERIMENTAL_protocol_config RPC method.
 * This file was auto-generated - do not edit manually.
 */

import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import {
  createJsonRpcRequest,
  createJsonRpcResponse,
  createJsonRpcError,
  generateDeterministicMockParams,
  generateDeterministicMockResponse,
  validateRequest,
  delay,
} from '../test-utils';

describe('EXPERIMENTAL_protocol_config - Integration Tests', () => {
  const server = setupServer();
  const endpoint = 'https://mock-rpc-server.test';

  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  afterAll(() => server.close());
  beforeEach(() => server.resetHandlers());

  describe('Mock RPC Tests', () => {
    it('should handle EXPERIMENTAL_protocol_config request with mock response', async () => {
      // Pre-generate test data to ensure consistency
      const mockParams = generateDeterministicMockParams(
        'EXPERIMENTAL_protocol_config',
        'test-1',
      );
      const mockResult = generateDeterministicMockResponse(
        'EXPERIMENTAL_protocol_config',
        'test-1',
      );
      const mockRequest = createJsonRpcRequest(
        'EXPERIMENTAL_protocol_config',
        mockParams,
        'test-1',
      );
      const mockResponse = createJsonRpcResponse(mockResult, 'test-1');

      server.use(
        http.post(endpoint, async ({ request }) => {
          const body = (await request.json()) as any;
          expect(body?.method).toBe('EXPERIMENTAL_protocol_config');
          expect(body?.jsonrpc).toBe('2.0');
          expect(body?.id).toBe('test-1');
          return HttpResponse.json(mockResponse);
        }),
      );

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockRequest),
      });

      expect(response.ok).toBe(true);
      const result = await response.json();
      expect(result.jsonrpc).toBe('2.0');
      expect(result.id).toBe('test-1');
      expect(result.result).not.toBeUndefined();
    });

    it('should validate EXPERIMENTAL_protocol_config request structure', async () => {
      const mockParams = generateDeterministicMockParams(
        'EXPERIMENTAL_protocol_config',
        'test-2',
      );
      const validRequest = createJsonRpcRequest(
        'EXPERIMENTAL_protocol_config',
        mockParams,
        'test-2',
      );
      const isValid = validateRequest(
        'EXPERIMENTAL_protocol_config',
        validRequest,
      );
      expect(isValid).toBe(true);
    });

    it('should handle EXPERIMENTAL_protocol_config server error response', async () => {
      const mockParams = generateDeterministicMockParams(
        'EXPERIMENTAL_protocol_config',
        'test-3',
      );
      const mockRequest = createJsonRpcRequest(
        'EXPERIMENTAL_protocol_config',
        mockParams,
        'test-3',
      );
      const errorResponse = createJsonRpcError(
        -32603,
        'Internal error',
        'test-3',
      );

      server.use(
        http.post(endpoint, async ({ request }) => {
          const body = (await request.json()) as any;
          expect(body?.method).toBe('EXPERIMENTAL_protocol_config');
          return HttpResponse.json(errorResponse);
        }),
      );

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockRequest),
      });

      expect(response.ok).toBe(true);
      const result = await response.json();
      expect(result.jsonrpc).toBe('2.0');
      expect(result.id).toBe('test-3');
      expect(result.error).toBeDefined();
      expect(result.error.code).toBe(-32603);
      expect(result.error.message).toBe('Internal error');
    });

    it('should handle EXPERIMENTAL_protocol_config network error', async () => {
      const mockParams = generateDeterministicMockParams(
        'EXPERIMENTAL_protocol_config',
        'test-4',
      );
      const mockRequest = createJsonRpcRequest(
        'EXPERIMENTAL_protocol_config',
        mockParams,
        'test-4',
      );

      server.use(
        http.post(endpoint, () => {
          return HttpResponse.error();
        }),
      );

      await expect(
        fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(mockRequest),
        }),
      ).rejects.toThrow();
    });

    it('should reject invalid EXPERIMENTAL_protocol_config request', async () => {
      const invalidRequest = {
        jsonrpc: '2.0',
        method: 'EXPERIMENTAL_protocol_config',
        id: 'test-5',
        // Missing required 'params' field
      };

      const isValid = validateRequest(
        'EXPERIMENTAL_protocol_config',
        invalidRequest,
      );
      expect(isValid).toBe(false);
    });

    it('should handle EXPERIMENTAL_protocol_config request with timeout simulation', async () => {
      // Pre-generate test data to ensure consistency
      const mockParams = generateDeterministicMockParams(
        'EXPERIMENTAL_protocol_config',
        'test-6',
      );
      const mockResult = generateDeterministicMockResponse(
        'EXPERIMENTAL_protocol_config',
        'test-6',
      );
      const mockRequest = createJsonRpcRequest(
        'EXPERIMENTAL_protocol_config',
        mockParams,
        'test-6',
      );
      const mockResponse = createJsonRpcResponse(mockResult, 'test-6');

      server.use(
        http.post(endpoint, async () => {
          await delay(50); // Simulate network delay
          return HttpResponse.json(mockResponse);
        }),
      );

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockRequest),
      });

      expect(response.ok).toBe(true);
      const result = await response.json();
      expect(result.result).not.toBeUndefined();
      // Result can be any valid JSON type: object, array, string, number, boolean, null
    });
  });
});
