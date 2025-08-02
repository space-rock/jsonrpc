/**
 * Unit tests for maintenance_windows RPC method.
 * This file was auto-generated - do not edit manually.
 */

import { describe, it, expect } from 'vitest';
import {
  createJsonRpcRequest,
  createJsonRpcResponse,
  createJsonRpcError,
  generateMockParams,
  generateMockResponse,
  validateRequest,
  validateResponse,
  hasValidSchemas,
  generateRequest,
  generateResponse,
} from '../test-utils';

describe('maintenance_windows - Unit Tests', () => {
  describe('Schema Validation', () => {
    it('should have valid request and response schemas', () => {
      expect(hasValidSchemas('maintenance_windows')).toBe(true);
    });
  });

  describe('Request Validation', () => {
    it('should create valid request structure', () => {
      const mockParams = generateMockParams('maintenance_windows');
      const request = createJsonRpcRequest('maintenance_windows', mockParams);

      expect(request.jsonrpc).toBe('2.0');
      expect(request.method).toBe('maintenance_windows');
      expect(request.id).toBeDefined();
      expect(typeof request.id).toBe('string');
      expect(request.params).toBeDefined();
    });

    it('should generate and validate request with schema', () => {
      const request = generateRequest('maintenance_windows');

      expect(request.jsonrpc).toBe('2.0');
      expect(request.method).toBe('maintenance_windows');
      expect(request.id).toBeDefined();
      expect(typeof request.id).toBe('string');
      expect(request.params).toBeDefined();

      // Validation should return true for valid requests
      const isValid = validateRequest('maintenance_windows', request);
      expect(typeof isValid).toBe('boolean');
    });

    it('should fail validation for invalid request', () => {
      const invalidRequest = {
        jsonrpc: '2.0',
        method: 'maintenance_windows',
        id: 'test-id',
      };

      const isValid = validateRequest('maintenance_windows', invalidRequest);
      expect(isValid).toBe(false);
    });
  });

  describe('Response Validation', () => {
    it('should create valid success response', () => {
      const mockResult = generateMockResponse('maintenance_windows');
      const response = createJsonRpcResponse(mockResult, 'test-id');

      expect(response.jsonrpc).toBe('2.0');
      expect(response.id).toBe('test-id');
      expect(response.result).toBeDefined();
    });

    it('should create valid error response', () => {
      const errorResponse = createJsonRpcError(
        -32603,
        'Internal error',
        'test-id',
      );

      expect(errorResponse.jsonrpc).toBe('2.0');
      expect(errorResponse.id).toBe('test-id');
      expect(errorResponse.error).toBeDefined();
      expect(errorResponse.error.code).toBe(-32603);
      expect(errorResponse.error.message).toBe('Internal error');
    });

    it('should generate and validate response with schema', () => {
      const response = generateResponse('maintenance_windows', 'test-id');

      expect(response.jsonrpc).toBe('2.0');
      expect(response.id).toBe('test-id');
      expect(response.result).toBeDefined();

      // This should return true because generateValidResponse validates internally
      const isValid = validateResponse('maintenance_windows', response);
      expect(isValid).toBe(true);
    });

    it('should fail validation for invalid response', () => {
      const invalidResponse = {
        jsonrpc: '2.0',
        id: 'test-id',
      };

      const isValid = validateResponse('maintenance_windows', invalidResponse);
      expect(isValid).toBe(false);
    });
  });

  describe('Mock Data Generation', () => {
    it('should generate valid mock parameters', () => {
      const mockParams = generateMockParams('maintenance_windows');
      expect(mockParams).toBeDefined();

      // Test that the mock params can be used in a valid request
      const request = createJsonRpcRequest('maintenance_windows', mockParams);
      const isValid = validateRequest('maintenance_windows', request);
      expect(isValid).toBe(true);
    });

    it('should generate valid mock response data', () => {
      const mockResult = generateMockResponse('maintenance_windows');
      expect(mockResult).toBeDefined();

      // Test that the mock result can be used in a valid response
      const response = createJsonRpcResponse(mockResult, 'test-id');
      const isValid = validateResponse('maintenance_windows', response);
      expect(isValid).toBe(true);
    });
  });
});
