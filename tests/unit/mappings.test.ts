/**
 * Unit tests for JSON RPC mappings.
 * Tests the mapping utility functions for schema retrieval.
 */

import { describe, it, expect } from 'vitest';
import {
  getRequestSchema,
  getResponseSchema,
  methodSchemas,
} from '@space-rock/jsonrpc-types';

describe('JSON RPC Schema Mappings', () => {
  describe('getRequestSchema', () => {
    it('should return request schema for valid method', () => {
      // Take a known method from the methodSchemas object
      const methodName = Object.keys(methodSchemas)[0]!;
      const schema = getRequestSchema(methodName);

      expect(schema).toBeDefined();
      expect(schema).toBe(
        methodSchemas[methodName as keyof typeof methodSchemas].request,
      );
    });

    it('should return undefined for unknown method', () => {
      const schema = getRequestSchema('non_existent_method');
      expect(schema).toBeUndefined();
    });
  });

  describe('getResponseSchema', () => {
    it('should return response schema for valid method', () => {
      // Take a known method from the methodSchemas object
      const methodName = Object.keys(methodSchemas)[0]!;
      const schema = getResponseSchema(methodName);

      expect(schema).toBeDefined();
      expect(schema).toBe(
        methodSchemas[methodName as keyof typeof methodSchemas].response,
      );
    });

    it('should return undefined for unknown method', () => {
      const schema = getResponseSchema('non_existent_method');
      expect(schema).toBeUndefined();
    });
  });
});
