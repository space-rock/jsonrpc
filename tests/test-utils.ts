/**
 * Test utilities for JSON RPC test generation.
 * This file was auto-generated - do not edit manually.
 * Generated at: 2025-07-23T01:21:07.566Z
 */

import type { RpcMethod, ApiRequest } from '@space-rock/jsonrpc-types';
import { fake, install, setFaker } from 'zod-schema-faker';
import { methodSchemas } from '@space-rock/jsonrpc-types';
import { z } from 'zod';
import { fakerEN, FakerError } from '@faker-js/faker';

// Custom faker instance
const customFaker = fakerEN;

// Override arrayElement
customFaker.helpers.arrayElement = function <T>(array: readonly T[]) {
  if (!array || array.length === 0) {
    throw new FakerError('Array is empty');
  }

  return array[0] as T;
};

// Set custom faker
setFaker(customFaker);

/**
 * Creates a mock JSON RPC request for testing.
 * @param method - The RPC method name
 * @param params - Parameters for the request
 * @param id - Optional request ID (will be converted to string)
 * @returns A properly formatted JSON RPC request
 */
export function createJsonRpcRequest<M extends RpcMethod>(
  method: M,
  params: any,
  id?: string | number,
): ApiRequest<M> {
  const requestId = id ? String(id) : Math.random().toString(36).substring(7);
  return {
    jsonrpc: '2.0' as const,
    method,
    params,
    id: requestId,
  } as ApiRequest<M>;
}

/**
 * Creates a mock JSON RPC success response for testing.
 * @param result - The result data
 * @param id - The request ID
 * @returns A properly formatted JSON RPC success response
 */
export function createJsonRpcResponse<T>(result: T, id: string | number): any {
  return {
    jsonrpc: '2.0' as const,
    result,
    id: String(id),
  };
}

/**
 * Creates a mock JSON RPC error response for testing.
 * @param code - Error code
 * @param message - Error message
 * @param id - The request ID
 * @param data - Optional error data
 * @returns A properly formatted JSON RPC error response
 */
export function createJsonRpcError(
  code: number,
  message: string,
  id: string | number,
  data?: any,
): any {
  return {
    jsonrpc: '2.0' as const,
    error: {
      code,
      message,
      data,
    },
    id: String(id),
  };
}

/**
 * Generates mock parameters based on the RPC method using schema faker.
 * @param method - The RPC method name
 * @param seed - Optional seed for deterministic generation
 * @returns Mock parameters appropriate for the method
 */
export function generateMockParams(method: RpcMethod, seed?: number): any {
  const requestSchema = methodSchemas[method]?.request;
  if (!requestSchema) {
    throw new Error(`No request schema found for method: ${method}`);
  }

  // Set seed for deterministic generation if provided
  if (seed !== undefined) {
    customFaker.seed(seed);
  }

  // Register fakers
  install();
  // Generate a full request and extract just the params
  const fullRequest = fake(requestSchema);
  return fullRequest.params;
}

/**
 * Generates mock response data based on the RPC method using schema faker.
 * @param method - The RPC method name
 * @param seed - Optional seed for deterministic generation
 * @returns Mock response data appropriate for the method
 */
export function generateMockResponse(method: RpcMethod, seed?: number): any {
  const responseSchema = methodSchemas[method]?.response;
  if (!responseSchema) {
    throw new Error(`No response schema found for method: ${method}`);
  }

  // Set seed for deterministic generation if provided
  if (seed !== undefined) {
    customFaker.seed(seed);
  }

  // Register fakers
  install();
  // Generate a full response using the schema
  const fullResponse = fake(responseSchema);
  // For success responses, extract the result property
  if ('result' in fullResponse) {
    return fullResponse.result;
  }
  // Fallback to the full response
  return fullResponse;
}

// Cache for storing generated test data to ensure consistency
const testDataCache = new Map<string, any>();

/**
 * Generates deterministic mock parameters for integration tests using cached data.
 * @param method - The RPC method name
 * @param testId - Test identifier for consistent caching
 * @returns Cached mock parameters appropriate for the method
 */
export function generateDeterministicMockParams(
  method: RpcMethod,
  testId: string,
): any {
  const cacheKey = `${method}-${testId}-params`;

  if (testDataCache.has(cacheKey)) {
    return testDataCache.get(cacheKey);
  }

  // Generate once with a fixed seed based on method name
  const seed = hashString(method);
  const data = generateMockParams(method, seed);
  testDataCache.set(cacheKey, data);
  return data;
}

/**
 * Generates deterministic mock response data for integration tests using cached data.
 * @param method - The RPC method name
 * @param testId - Test identifier for consistent caching
 * @returns Cached mock response data appropriate for the method
 */
export function generateDeterministicMockResponse(
  method: RpcMethod,
  testId: string,
): any {
  const cacheKey = `${method}-${testId}-response`;

  if (testDataCache.has(cacheKey)) {
    return testDataCache.get(cacheKey);
  }

  // Generate once with a fixed seed based on method name
  const seed = hashString(method);
  const data = generateMockResponse(method, seed);
  testDataCache.set(cacheKey, data);
  return data;
}

/**
 * Simple hash function to convert string to number for seeding.
 * @param str - String to hash
 * @returns Hash as number
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Strictly validates a request against its schema.
 * @param method - The RPC method name
 * @param request - The request to validate
 * @return True if validation is success, false otherwise
 */
export function validateRequest(method: RpcMethod, request: any): boolean {
  const requestSchema = methodSchemas[method]?.request;
  if (!requestSchema) {
    throw new Error(`No request schema found for method: ${method}`);
  }

  const result = requestSchema.safeParse(request);

  return result.success;
}

/**
 * Strictly validates a response against its schema.
 * @param method - The RPC method name
 * @param response - The response to validate
 * @return True if validation is success, false otherwise
 */
export function validateResponse(method: RpcMethod, response: any): boolean {
  const responseSchema = methodSchemas[method]?.response;
  if (!responseSchema) {
    throw new Error(`No response schema found for method: ${method}`);
  }

  const result = responseSchema.safeParse(response);

  return result.success;
}

/**
 * Checks if a method has both request and response schemas.
 * @param method - The RPC method name
 * @returns True if both schemas exist, false otherwise
 */
export function hasValidSchemas(method: RpcMethod): boolean {
  const schemas = methodSchemas[method];
  return !!(schemas?.request && schemas?.response);
}

/**
 * Gets the request schema for a method.
 * @param method - The RPC method name
 * @throws Error if schema is not found
 */
export function getRequestSchema(method: RpcMethod): z.ZodSchema {
  const schema = methodSchemas[method]?.request;
  if (!schema) {
    throw new Error(`No request schema found for method: ${method}`);
  }
  return schema;
}

/**
 * Gets the response schema for a method.
 * @param method - The RPC method name
 * @throws Error if schema is not found
 */
export function getResponseSchema(method: RpcMethod): z.ZodSchema {
  const schema = methodSchemas[method]?.response;
  if (!schema) {
    throw new Error(`No response schema found for method: ${method}`);
  }
  return schema;
}

/**
 * Test delay utility for async operations.
 * @param ms - Milliseconds to delay
 */
export const delay = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generates a valid JSON RPC request with mock data for testing.
 * @param method - The RPC method name
 * @param id - Optional request ID
 * @returns A valid JSON RPC request with generated mock parameters
 */
export function generateRequest<M extends RpcMethod>(
  method: M,
  id?: string | number,
): ApiRequest<M> {
  const mockParams = generateMockParams(method);
  const request = createJsonRpcRequest(method, mockParams, id);

  return request;
}

/**
 * Generates a valid JSON RPC success response with mock data for testing.
 * @param method - The RPC method name
 * @param id - The request ID
 * @returns A valid JSON RPC success response with generated mock data
 */
export function generateResponse<M extends RpcMethod>(
  method: M,
  id: string | number,
): any {
  const mockResult = generateMockResponse(method);
  const response = createJsonRpcResponse(mockResult, id);

  return response;
}
