/**
 * Integration tests for broadcast_tx_commit RPC method.
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

describe('broadcast_tx_commit - Integration Tests', () => {
  const server = setupServer();
  const endpoint = 'https://mock-rpc-server.test';

  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  afterAll(() => server.close());
  beforeEach(() => server.resetHandlers());

  describe('Mock RPC Tests', () => {
    it('should handle broadcast_tx_commit request with mock response', async () => {
      // Pre-generate test data to ensure consistency
      const mockParams = generateDeterministicMockParams(
        'broadcast_tx_commit',
        'test-1',
      );
      const mockResult = generateDeterministicMockResponse(
        'broadcast_tx_commit',
        'test-1',
      );
      const mockRequest = createJsonRpcRequest(
        'broadcast_tx_commit',
        mockParams,
        'test-1',
      );
      const mockResponse = createJsonRpcResponse(mockResult, 'test-1');

      server.use(
        http.post(endpoint, async ({ request }) => {
          const body = (await request.json()) as any;
          expect(body?.method).toBe('broadcast_tx_commit');
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

    it('should validate broadcast_tx_commit request structure', async () => {
      const mockParams = generateDeterministicMockParams(
        'broadcast_tx_commit',
        'test-2',
      );
      const validRequest = createJsonRpcRequest(
        'broadcast_tx_commit',
        mockParams,
        'test-2',
      );
      const isValid = validateRequest('broadcast_tx_commit', validRequest);
      expect(isValid).toBe(true);
    });

    it('should handle broadcast_tx_commit server error response', async () => {
      const mockParams = generateDeterministicMockParams(
        'broadcast_tx_commit',
        'test-3',
      );
      const mockRequest = createJsonRpcRequest(
        'broadcast_tx_commit',
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
          expect(body?.method).toBe('broadcast_tx_commit');
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

    it('should handle broadcast_tx_commit network error', async () => {
      const mockParams = generateDeterministicMockParams(
        'broadcast_tx_commit',
        'test-4',
      );
      const mockRequest = createJsonRpcRequest(
        'broadcast_tx_commit',
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

    it('should reject invalid broadcast_tx_commit request', async () => {
      const invalidRequest = {
        jsonrpc: '2.0',
        method: 'broadcast_tx_commit',
        id: 'test-5',
        // Missing required 'params' field
      };

      const isValid = validateRequest('broadcast_tx_commit', invalidRequest);
      expect(isValid).toBe(false);
    });

    it('should handle broadcast_tx_commit request with timeout simulation', async () => {
      // Pre-generate test data to ensure consistency
      const mockParams = generateDeterministicMockParams(
        'broadcast_tx_commit',
        'test-6',
      );
      const mockResult = generateDeterministicMockResponse(
        'broadcast_tx_commit',
        'test-6',
      );
      const mockRequest = createJsonRpcRequest(
        'broadcast_tx_commit',
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
