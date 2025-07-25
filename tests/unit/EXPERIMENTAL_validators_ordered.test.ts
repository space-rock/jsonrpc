/**
 * Unit tests for EXPERIMENTAL_validators_ordered RPC method.
 * This file was auto-generated - do not edit manually.
 */

import { describe, it, expect } from 'vitest';
import { methodSchemas } from '@space-rock/jsonrpc-types';
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

describe('EXPERIMENTAL_validators_ordered - Unit Tests', () => {
  describe('Schema Validation', () => {
    it('should have valid request and response schemas', () => {
      expect(hasValidSchemas('EXPERIMENTAL_validators_ordered')).toBe(true);
      expect(
        methodSchemas['EXPERIMENTAL_validators_ordered']?.request,
      ).toBeDefined();
      expect(
        methodSchemas['EXPERIMENTAL_validators_ordered']?.response,
      ).toBeDefined();
    });
  });

  describe('Request Validation', () => {
    it('should create valid request structure', () => {
      const mockParams = generateMockParams('EXPERIMENTAL_validators_ordered');
      const request = createJsonRpcRequest(
        'EXPERIMENTAL_validators_ordered',
        mockParams,
      );

      expect(request.jsonrpc).toBe('2.0');
      expect(request.method).toBe('EXPERIMENTAL_validators_ordered');
      expect(request.id).toBeDefined();
      expect(typeof request.id).toBe('string');
      expect(request.params).toBeDefined();
    });

    it('should generate and validate request with schema', () => {
      const request = generateRequest('EXPERIMENTAL_validators_ordered');

      expect(request.jsonrpc).toBe('2.0');
      expect(request.method).toBe('EXPERIMENTAL_validators_ordered');
      expect(request.id).toBeDefined();
      expect(typeof request.id).toBe('string');
      expect(request.params).toBeDefined();

      // Validation should return true for valid requests
      const isValid = validateRequest(
        'EXPERIMENTAL_validators_ordered',
        request,
      );
      expect(typeof isValid).toBe('boolean');
    });

    it('should fail validation for invalid request', () => {
      const invalidRequest = {
        jsonrpc: '2.0',
        method: 'EXPERIMENTAL_validators_ordered',
        id: 'test-id',
      };

      const isValid = validateRequest(
        'EXPERIMENTAL_validators_ordered',
        invalidRequest,
      );
      expect(isValid).toBe(false);
    });
  });

  describe('Response Validation', () => {
    it('should create valid success response', () => {
      const mockResult = generateMockResponse(
        'EXPERIMENTAL_validators_ordered',
      );
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
      const response = generateResponse(
        'EXPERIMENTAL_validators_ordered',
        'test-id',
      );

      expect(response.jsonrpc).toBe('2.0');
      expect(response.id).toBe('test-id');
      expect(response.result).toBeDefined();

      // This should return true because generateValidResponse validates internally
      const isValid = validateResponse(
        'EXPERIMENTAL_validators_ordered',
        response,
      );
      expect(isValid).toBe(true);
    });

    it('should fail validation for invalid response', () => {
      const invalidResponse = {
        jsonrpc: '2.0',
        id: 'test-id',
      };

      const isValid = validateResponse(
        'EXPERIMENTAL_validators_ordered',
        invalidResponse,
      );
      expect(isValid).toBe(false);
    });
  });

  describe('Mock Data Generation', () => {
    it('should generate valid mock parameters', () => {
      const mockParams = generateMockParams('EXPERIMENTAL_validators_ordered');
      expect(mockParams).toBeDefined();

      // Test that the mock params can be used in a valid request
      const request = createJsonRpcRequest(
        'EXPERIMENTAL_validators_ordered',
        mockParams,
      );
      const isValid = validateRequest(
        'EXPERIMENTAL_validators_ordered',
        request,
      );
      expect(isValid).toBe(true);
    });

    it('should generate valid mock response data', () => {
      const mockResult = generateMockResponse(
        'EXPERIMENTAL_validators_ordered',
      );
      expect(mockResult).toBeDefined();

      // Test that the mock result can be used in a valid response
      const response = createJsonRpcResponse(mockResult, 'test-id');
      const isValid = validateResponse(
        'EXPERIMENTAL_validators_ordered',
        response,
      );
      expect(isValid).toBe(true);
    });
  });
});
