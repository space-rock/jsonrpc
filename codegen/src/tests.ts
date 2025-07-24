import fs from 'fs/promises';
import path from 'path';

/**
 * Main function that generates comprehensive test suites for JSON RPC methods.
 * Reads the generated mappings and creates unit tests, integration tests, and type tests
 * for all available RPC methods. Handles errors and missing dependencies gracefully.
 */
async function generateJsonRpcTests() {
  try {
    const outputDir = path.join(process.cwd(), '../tests');
    const typesPath = path.join(
      process.cwd(),
      '../packages/types/src/mappings.ts',
    );

    console.log('🚀 Generating JSON RPC test suites...');

    // Read the mappings file to get available methods
    const mappingsContent = await fs.readFile(typesPath, 'utf-8');

    // Extract available methods from the mappings
    const availableMethods = extractAvailableMethods(mappingsContent);

    console.log(`📋 Found ${availableMethods.length} RPC methods to test`);

    // Ensure output directories exist
    await createTestDirectories(outputDir);

    // Generate test utilities
    await generateTestUtilities(outputDir);

    // Generate unit tests for each method
    await generateUnitTests(outputDir, availableMethods);

    // Generate integration tests for each method
    await generateIntegrationTests(outputDir, availableMethods);

    // Generate TypeScript type tests
    await generateTypeTests(outputDir, availableMethods);

    // Generate client package tests
    await generateClientTests(outputDir);

    // Generate mapping tests
    await generateMappingTests(outputDir);

    console.log('✅ Successfully generated all test files');
    console.log(`📊 Generated tests for ${availableMethods.length} methods`);
    console.log(`📁 Test files created in: ${outputDir}`);
  } catch (error) {
    console.error('❌ Error generating JSON RPC tests:', error);
    process.exit(1);
  }
}

/**
 * Extracts available RPC methods from the mappings file content.
 * Parses the MethodMap type to determine which methods are available.
 * @param mappingsContent - The content of the mappings.ts file
 * @returns Array of available RPC method names
 */
function extractAvailableMethods(mappingsContent: string): string[] {
  const methods: string[] = [];

  // Extract methods from the MethodMap type definition by finding all quoted method names
  const methodMapStart = mappingsContent.indexOf('export type MethodMap = {');

  let methodMapEnd = -1;
  if (methodMapStart !== -1) {
    // Find the matching closing brace by counting braces
    let braceCount = 0;
    let inString = false;
    let stringChar = '';

    for (let i = methodMapStart; i < mappingsContent.length; i++) {
      const char = mappingsContent[i];
      const prevChar = i > 0 ? mappingsContent[i - 1] : '';

      if (!inString) {
        if (char === '"' || char === "'") {
          inString = true;
          stringChar = char;
        } else if (char === '{') {
          braceCount++;
        } else if (char === '}') {
          braceCount--;
          if (braceCount === 0) {
            methodMapEnd = i + 1;
            break;
          }
        }
      } else {
        if (char === stringChar && prevChar !== '\\') {
          inString = false;
        }
      }
    }
  }

  if (methodMapStart !== -1 && methodMapEnd !== -1) {
    const methodMapSection = mappingsContent.substring(
      methodMapStart,
      methodMapEnd,
    );

    const regex = /"([^"]+)":\s*{/g;
    let match;
    while ((match = regex.exec(methodMapSection)) !== null) {
      if (match[1]) {
        methods.push(match[1]);
      }
    }
  }

  // Fallback: extract from methodSchemas object
  if (methods.length === 0) {
    const methodSchemasStart = mappingsContent.indexOf(
      'export const methodSchemas = {',
    );

    let methodSchemasEnd = -1;
    if (methodSchemasStart !== -1) {
      // Find the matching closing brace by counting braces
      let braceCount = 0;
      let inString = false;
      let stringChar = '';

      for (let i = methodSchemasStart; i < mappingsContent.length; i++) {
        const char = mappingsContent[i];
        const prevChar = i > 0 ? mappingsContent[i - 1] : '';

        if (!inString) {
          if (char === '"' || char === "'") {
            inString = true;
            stringChar = char;
          } else if (char === '{') {
            braceCount++;
          } else if (char === '}') {
            braceCount--;
            if (braceCount === 0) {
              // Look for ' as const;' after the closing brace
              const remainingText = mappingsContent.substring(i);
              if (remainingText.startsWith('} as const;')) {
                methodSchemasEnd = i + 11; // include '} as const;'
              } else {
                methodSchemasEnd = i + 1;
              }
              break;
            }
          }
        } else {
          if (char === stringChar && prevChar !== '\\') {
            inString = false;
          }
        }
      }
    }

    if (methodSchemasStart !== -1 && methodSchemasEnd !== -1) {
      const methodSchemasSection = mappingsContent.substring(
        methodSchemasStart,
        methodSchemasEnd,
      );

      const regex = /"([^"]+)":\s*{/g;
      let match;
      while ((match = regex.exec(methodSchemasSection)) !== null) {
        if (match[1]) {
          methods.push(match[1]);
        }
      }
    }
  }

  return methods.sort();
}

/**
 * Creates the necessary test directory structure.
 * Ensures all required directories exist for organizing test files.
 * @param outputDir - The root output directory for test files
 */
async function createTestDirectories(outputDir: string): Promise<void> {
  const directories = [
    outputDir,
    path.join(outputDir, 'unit'),
    path.join(outputDir, 'integration'),
    path.join(outputDir, 'types'),
  ];

  for (const dir of directories) {
    await fs.mkdir(dir, { recursive: true });
  }
}

/**
 * Generates test utility functions and helpers.
 * Creates reusable utilities for mock data generation and common test patterns.
 * @param outputDir - The output directory for test files
 */
async function generateTestUtilities(outputDir: string): Promise<void> {
  const utilsContent = createTestUtilitiesContent();
  await fs.writeFile(path.join(outputDir, 'test-utils.ts'), utilsContent);
}

/**
 * Creates the content for test utilities file.
 * Includes mock data generation and common test helper functions.
 * @returns The complete test utilities file content
 */
function createTestUtilitiesContent(): string {
  return `/**
 * Test utilities for JSON RPC test generation.
 * This file was auto-generated - do not edit manually.
 */

import type { RpcMethod, ApiRequest } from '@space-rock/jsonrpc-types';
import { fake, install, setFaker } from 'zod-schema-faker';
import { methodSchemas } from '@space-rock/jsonrpc-types';
import { z } from 'zod';
import { fakerEN, FakerError } from '@faker-js/faker';

// Custom faker instance
const customFaker = fakerEN;

// Override arrayElement
customFaker.helpers.arrayElement = function<T>(array: readonly T[]) {
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
  id?: string | number
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
  data?: any
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
    throw new Error(\`No request schema found for method: \${method}\`);
  }

  // Set seed for deterministic generation if provided
  if (seed !== undefined) {
    customFaker.seed(seed);
  }

  // Register fakers
  install();
  // Generate a full request and extract just the params
  const fullRequest = fake(requestSchema);
  return fullRequest.params
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
    throw new Error(\`No response schema found for method: \${method}\`);
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
export function generateDeterministicMockParams(method: RpcMethod, testId: string): any {
  const cacheKey = \`\${method}-\${testId}-params\`;

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
export function generateDeterministicMockResponse(method: RpcMethod, testId: string): any {
  const cacheKey = \`\${method}-\${testId}-response\`;

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
    hash = ((hash << 5) - hash) + char;
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
    throw new Error(\`No request schema found for method: \${method}\`);
  }

  const result = requestSchema.safeParse(request);

  return result.success
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
    throw new Error(\`No response schema found for method: \${method}\`);
  }

  const result = responseSchema.safeParse(response);

  return result.success
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
    throw new Error(\`No request schema found for method: \${method}\`);
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
    throw new Error(\`No response schema found for method: \${method}\`);
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
  id?: string | number
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
  id: string | number
): any {
  const mockResult = generateMockResponse(method);
  const response = createJsonRpcResponse(mockResult, id);

  return response;
}
`;
}

/**
 * Generates unit tests for all available RPC methods.
 * Creates comprehensive unit tests focusing on schema validation and type checking.
 * @param outputDir - The output directory for test files
 * @param methods - Array of available RPC methods
 */
async function generateUnitTests(
  outputDir: string,
  methods: string[],
): Promise<void> {
  for (const method of methods) {
    const testContent = createUnitTestContent(method);
    await fs.writeFile(
      path.join(outputDir, 'unit', `${method}.test.ts`),
      testContent,
    );
  }
}

/**
 * Creates the content for a unit test file.
 * @param method - The RPC method being tested
 * @returns The complete unit test file content
 */
function createUnitTestContent(method: string): string {
  return `/**
 * Unit tests for ${method} RPC method.
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
  generateResponse
} from '../test-utils';

describe('${method} - Unit Tests', () => {
  describe('Schema Validation', () => {
    it('should have valid request and response schemas', () => {
      expect(hasValidSchemas('${method}')).toBe(true);
      expect(methodSchemas['${method}']?.request).toBeDefined();
      expect(methodSchemas['${method}']?.response).toBeDefined();
    });
  });

  describe('Request Validation', () => {
    it('should create valid request structure', () => {
      const mockParams = generateMockParams('${method}');
      const request = createJsonRpcRequest('${method}', mockParams);

      expect(request.jsonrpc).toBe('2.0');
      expect(request.method).toBe('${method}');
      expect(request.id).toBeDefined();
      expect(typeof request.id).toBe('string');
      expect(request.params).toBeDefined();
    });

    it('should generate and validate request with schema', () => {
      const request = generateRequest('${method}');

      expect(request.jsonrpc).toBe('2.0');
      expect(request.method).toBe('${method}');
      expect(request.id).toBeDefined();
      expect(typeof request.id).toBe('string');
      expect(request.params).toBeDefined();

      // Validation should return true for valid requests
      const isValid = validateRequest('${method}', request);
      expect(typeof isValid).toBe('boolean');
    });

    it('should fail validation for invalid request', () => {
      const invalidRequest = {
        jsonrpc: '2.0',
        method: '${method}',
        id: 'test-id'
      };

      const isValid = validateRequest('${method}', invalidRequest);
      expect(isValid).toBe(false);
    });
  });

  describe('Response Validation', () => {
    it('should create valid success response', () => {
      const mockResult = generateMockResponse('${method}');
      const response = createJsonRpcResponse(mockResult, 'test-id');

      expect(response.jsonrpc).toBe('2.0');
      expect(response.id).toBe('test-id');
      expect(response.result).toBeDefined();
    });

    it('should create valid error response', () => {
      const errorResponse = createJsonRpcError(-32603, 'Internal error', 'test-id');

      expect(errorResponse.jsonrpc).toBe('2.0');
      expect(errorResponse.id).toBe('test-id');
      expect(errorResponse.error).toBeDefined();
      expect(errorResponse.error.code).toBe(-32603);
      expect(errorResponse.error.message).toBe('Internal error');
    });

    it('should generate and validate response with schema', () => {
      const response = generateResponse('${method}', 'test-id');

      expect(response.jsonrpc).toBe('2.0');
      expect(response.id).toBe('test-id');
      expect(response.result).toBeDefined();

      // This should return true because generateValidResponse validates internally
      const isValid = validateResponse('${method}', response);
      expect(isValid).toBe(true);
    });

    it('should fail validation for invalid response', () => {
      const invalidResponse = {
        jsonrpc: '2.0',
        id: 'test-id'
      };

      const isValid = validateResponse('${method}', invalidResponse);
      expect(isValid).toBe(false);
    });
  });

  describe('Mock Data Generation', () => {
    it('should generate valid mock parameters', () => {
      const mockParams = generateMockParams('${method}');
      expect(mockParams).toBeDefined();

      // Test that the mock params can be used in a valid request
      const request = createJsonRpcRequest('${method}', mockParams);
      const isValid = validateRequest('${method}', request);
      expect(isValid).toBe(true);
    });

    it('should generate valid mock response data', () => {
      const mockResult = generateMockResponse('${method}');
      expect(mockResult).toBeDefined();

      // Test that the mock result can be used in a valid response
      const response = createJsonRpcResponse(mockResult, 'test-id');
      const isValid = validateResponse('${method}', response);
      expect(isValid).toBe(true);
    });
  });
});
`;
}

/**
 * Generates integration tests for all available RPC methods.
 * Creates integration tests that simulate actual RPC calls with HTTP mocking.
 * @param outputDir - The output directory for test files
 * @param methods - Array of available RPC methods
 */
async function generateIntegrationTests(
  outputDir: string,
  methods: string[],
): Promise<void> {
  for (const method of methods) {
    const testContent = createIntegrationTestContent(method);
    await fs.writeFile(
      path.join(outputDir, 'integration', `${method}.test.ts`),
      testContent,
    );
  }
}

/**
 * Creates the content for an integration test file.
 * @param method - The RPC method being tested
 * @returns The complete integration test file content
 */
function createIntegrationTestContent(method: string): string {
  return `/**
 * Integration tests for ${method} RPC method.
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
  delay
} from '../test-utils';

describe('${method} - Integration Tests', () => {
  const server = setupServer();
  const endpoint = 'https://mock-rpc-server.test';

  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  afterAll(() => server.close());
  beforeEach(() => server.resetHandlers());

  describe('Mock RPC Tests', () => {
    it('should handle ${method} request with mock response', async () => {
      // Pre-generate test data to ensure consistency
      const mockParams = generateDeterministicMockParams('${method}', 'test-1');
      const mockResult = generateDeterministicMockResponse('${method}', 'test-1');
      const mockRequest = createJsonRpcRequest('${method}', mockParams, 'test-1');
      const mockResponse = createJsonRpcResponse(mockResult, 'test-1');

      server.use(
        http.post(endpoint, async ({ request }) => {
          const body = await request.json() as any;
          expect(body?.method).toBe('${method}');
          expect(body?.jsonrpc).toBe('2.0');
          expect(body?.id).toBe('test-1');
          return HttpResponse.json(mockResponse);
        })
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

    it('should validate ${method} request structure', async () => {
      const mockParams = generateDeterministicMockParams('${method}', 'test-2');
      const validRequest = createJsonRpcRequest('${method}', mockParams, 'test-2');
      const isValid = validateRequest('${method}', validRequest);
      expect(isValid).toBe(true);
    });

    it('should handle ${method} server error response', async () => {
      const mockParams = generateDeterministicMockParams('${method}', 'test-3');
      const mockRequest = createJsonRpcRequest('${method}', mockParams, 'test-3');
      const errorResponse = createJsonRpcError(-32603, 'Internal error', 'test-3');

      server.use(
        http.post(endpoint, async ({ request }) => {
          const body = await request.json() as any;
          expect(body?.method).toBe('${method}');
          return HttpResponse.json(errorResponse);
        })
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

    it('should handle ${method} network error', async () => {
      const mockParams = generateDeterministicMockParams('${method}', 'test-4');
      const mockRequest = createJsonRpcRequest('${method}', mockParams, 'test-4');

      server.use(
        http.post(endpoint, () => {
          return HttpResponse.error();
        })
      );

      await expect(
        fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(mockRequest),
        })
      ).rejects.toThrow();
    });

    it('should reject invalid ${method} request', async () => {
      const invalidRequest = {
        jsonrpc: '2.0',
        method: '${method}',
        id: 'test-5'
        // Missing required 'params' field
      };

      const isValid = validateRequest('${method}', invalidRequest);
      expect(isValid).toBe(false);
    });

    it('should handle ${method} request with timeout simulation', async () => {
      // Pre-generate test data to ensure consistency
      const mockParams = generateDeterministicMockParams('${method}', 'test-6');
      const mockResult = generateDeterministicMockResponse('${method}', 'test-6');
      const mockRequest = createJsonRpcRequest('${method}', mockParams, 'test-6');
      const mockResponse = createJsonRpcResponse(mockResult, 'test-6');

      server.use(
        http.post(endpoint, async () => {
          await delay(50); // Simulate network delay
          return HttpResponse.json(mockResponse);
        })
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
`;
}

/**
 * Generates TypeScript type tests for all available RPC methods.
 * Creates type tests that ensure proper type inference and compile-time checking.
 * @param outputDir - The output directory for test files
 * @param methods - Array of available RPC methods
 */
async function generateTypeTests(
  outputDir: string,
  methods: string[],
): Promise<void> {
  const testContent = createTypeTestContent(methods);
  await fs.writeFile(
    path.join(outputDir, 'types', 'type-safety.test-d.ts'),
    testContent,
  );

  // Create index.d.ts for type tests
  const indexDtsContent = `/**
 * Type definitions for test files
 * This file was auto-generated - do not edit manually.
 */

// Re-export all types from the main packages for testing
export * from '@space-rock/jsonrpc-types';
export * from '@space-rock/jsonrpc-client';
`;

  await fs.writeFile(
    path.join(outputDir, 'types', 'index.d.ts'),
    indexDtsContent,
  );
}

/**
 * Creates the content for TypeScript type tests.
 * @param methods - Array of RPC methods to generate type tests for
 * @returns The complete type test file content
 */
function createTypeTestContent(methods: string[]): string {
  return `/**
 * TypeScript type tests for JSON RPC methods.
 * This file was auto-generated - do not edit manually.
 */

import { expectType, expectAssignable } from 'tsd';
import type {
  RpcMethod,
  ApiRequest,
  ApiResponse,
  MethodMap,
} from '@space-rock/jsonrpc-types';
import { methodSchemas } from '@space-rock/jsonrpc-types';
import { z } from 'zod';

// Test that all methods are properly typed as RpcMethod
${methods.map(method => `expectAssignable<RpcMethod>('${method}');`).join('\n')}

// Test that methodSchemas contains all methods with correct structure
${methods.map(method => `expectAssignable<{ request: z.ZodSchema; response: z.ZodSchema }>(methodSchemas['${method}']);`).join('\n')}

// Test request/response type inference
${methods
  .map(
    method => `
// ${method} type tests
{
  type Req = ApiRequest<'${method}'>;
  type Res = ApiResponse<'${method}'>;

  // Test request structure
  expectType<string>({} as Req['jsonrpc']);
  expectType<'${method}'>({} as Req['method']);
  expectType<string>({} as Req['id']);

  // Test response structure
  expectType<string>({} as Res['jsonrpc']);
  expectType<string>({} as Res['id']);

  // Test that schemas exist and are ZodSchemas
  expectAssignable<z.ZodSchema>(methodSchemas['${method}'].request);
  expectAssignable<z.ZodSchema>(methodSchemas['${method}'].response);
}`,
  )
  .join('\n')}

// Test MethodMap structure for each method
${methods
  .map(
    method => `expectType<{
  request: ApiRequest<'${method}'>;
  response: ApiResponse<'${method}'>;
}>(({} as MethodMap)['${method}']);`,
  )
  .join('\n')}

// Compile-time verification that methods extend RpcMethod
${methods
  .map(method => {
    const typeName = method.replace(/[^a-zA-Z0-9_]/g, '_');
    return `export type ${typeName}_extends_RpcMethod = '${method}' extends RpcMethod ? true : never;`;
  })
  .join('\n')}

// Test generic method handling
{
  function handleMethod<M extends RpcMethod>(_method: M): {
    request: ApiRequest<M>;
    response: ApiResponse<M>;
  } {
    return {} as any;
  }

  // Test with sample methods
${methods
  .slice(0, 5)
  .map(
    method =>
      `  expectType<ApiRequest<'${method}'>>(handleMethod('${method}').request);
  expectType<ApiResponse<'${method}'>>(handleMethod('${method}').response);`,
  )
  .join('\n')}
}

// Verify that MethodMap keys match RpcMethod union
expectAssignable<RpcMethod>('' as keyof MethodMap);
expectAssignable<keyof MethodMap>('' as RpcMethod);
`;
}

/**
 * Generates tests for the client package functionality.
 * Creates comprehensive tests for the RPC client, error handling, and utilities.
 * @param outputDir - Directory to write client test files
 */
async function generateClientTests(outputDir: string): Promise<void> {
  const clientTestContent = `/**
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
    safeParse: vi.fn().mockImplementation((input) => ({
      success: true,
      data: input // Return the actual input instead of the mock data
    }))
  };
}

function createMockResponseSchema(data: any) {
  return {
    parse: vi.fn().mockReturnValue(data),
    safeParse: vi.fn().mockReturnValue({
      success: true,
      data: data
    })
  };
}

// Mock the types package
vi.mock('@space-rock/jsonrpc-types', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@space-rock/jsonrpc-types')>();
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
      const error = new ApiError('Test error', 500, -32603, { details: 'error data' });

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
          message: 'Required'
        }
      ]);

      const formatted = formatZodError(zodError);

      expect(formatted).toEqual({
        'params.account_id': 'Required'
      });
    });

    it('should format multiple validation errors', () => {
      const zodError = new ZodError([
        {
          code: 'invalid_type',
          expected: 'string',
          received: 'undefined',
          path: ['params', 'account_id'],
          message: 'Required'
        },
        {
          code: 'invalid_type',
          expected: 'number',
          received: 'string',
          path: ['params', 'block_height'],
          message: 'Expected number, received string'
        }
      ]);

      const formatted = formatZodError(zodError);

      expect(formatted).toEqual({
        'params.account_id': 'Required',
        'params.block_height': 'Expected number, received string'
      });
    });

    it('should handle nested object validation errors', () => {
      const zodError = new ZodError([
        {
          code: 'invalid_type',
          expected: 'string',
          received: 'undefined',
          path: ['params', 'request', 'account_id'],
          message: 'Required'
        },
        {
          code: 'invalid_literal',
          expected: '2.0',
          received: '1.0',
          path: ['jsonrpc'],
          message: 'Invalid literal value, expected "2.0"'
        }
      ]);

      const formatted = formatZodError(zodError);

      expect(formatted).toEqual({
        'params.request.account_id': 'Required',
        'jsonrpc': 'Invalid literal value, expected "2.0"'
      });
    });

    it('should handle array index validation errors', () => {
      const zodError = new ZodError([
        {
          code: 'invalid_type',
          expected: 'string',
          received: 'number',
          path: ['params', 'keys', 0],
          message: 'Expected string, received number'
        },
        {
          code: 'too_small',
          minimum: 1,
          type: 'array',
          inclusive: true,
          path: ['params', 'keys'],
          message: 'Array must contain at least 1 element(s)'
        }
      ]);

      const formatted = formatZodError(zodError);

      expect(formatted).toEqual({
        'params.keys.0': 'Expected string, received number',
        'params.keys': 'Array must contain at least 1 element(s)'
      });
    });

    it('should handle empty path', () => {
      const zodError = new ZodError([
        {
          code: 'invalid_type',
          expected: 'object',
          received: 'string',
          path: [],
          message: 'Expected object, received string'
        }
      ]);

      const formatted = formatZodError(zodError);

      expect(formatted).toEqual({
        '': 'Expected object, received string'
      });
    });

    it('should handle single path element', () => {
      const zodError = new ZodError([
        {
          code: 'invalid_type',
          expected: 'string',
          received: 'undefined',
          path: ['method'],
          message: 'Required'
        }
      ]);

      const formatted = formatZodError(zodError);

      expect(formatted).toEqual({
        'method': 'Required'
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
      const { getRequestSchema, getResponseSchema } = await import('@space-rock/jsonrpc-types');

      // Generate dynamic mock data for status method
      const mockParams = generateMockParams('status');
      const mockResult = generateMockResponse('status');

      // Mock schema validation
      const mockRequestSchema = createMockRequestSchema({
        jsonrpc: '2.0',
        method: 'status',
        params: mockParams,
        id: 'test'
      });
      const mockResponseSchema = createMockResponseSchema({
        jsonrpc: '2.0',
        id: 'test',
        result: mockResult
      });

      vi.mocked(getRequestSchema).mockReturnValue(mockRequestSchema as any);
      vi.mocked(getResponseSchema).mockReturnValue(mockResponseSchema as any);

      // Mock successful fetch
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          jsonrpc: '2.0',
          id: 'test',
          result: mockResult
        })
      } as Response);

      const request = {
        jsonrpc: '2.0' as const,
        method: 'status' as const,
        params: mockParams,
        id: 'test'
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
          id: 'test'
        })
      });
      expect(response).toEqual({
        jsonrpc: '2.0',
        id: 'test',
        result: mockResult
      });
    });

    it('should throw error when request schema not found', async () => {
      const { getRequestSchema } = await import('@space-rock/jsonrpc-types');
      vi.mocked(getRequestSchema).mockReturnValue(undefined);

      const request = {
        jsonrpc: '2.0' as const,
        method: 'invalid_method' as any,
        params: {},
        id: 'test'
      };

      await expect(client.call(request)).rejects.toThrow('No request schema found for method: invalid_method');
    });

    it('should throw error when response schema not found', async () => {
      const { getRequestSchema, getResponseSchema } = await import('@space-rock/jsonrpc-types');

      // Generate dynamic mock data for status method
      const mockParams = generateMockParams('status');

      const mockRequestSchema = createMockRequestSchema({
        jsonrpc: '2.0',
        method: 'status',
        params: mockParams,
        id: 'test'
      });

      vi.mocked(getRequestSchema).mockReturnValue(mockRequestSchema as any);
      vi.mocked(getResponseSchema).mockReturnValue(undefined);

      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          jsonrpc: '2.0',
          id: 'test',
          result: { chainId: 'testnet' }
        })
      } as Response);

      const request = {
        jsonrpc: '2.0' as const,
        method: 'status' as const,
        params: mockParams,
        id: 'test'
      };

      await expect(client.call(request)).rejects.toThrow('No response schema found for method: status');
    });

    it('should throw ApiError for HTTP errors', async () => {
      const { getRequestSchema } = await import('@space-rock/jsonrpc-types');

      // Generate dynamic mock data for status method
      const mockParams = generateMockParams('status');

      const mockRequestSchema = createMockRequestSchema({
        jsonrpc: '2.0',
        method: 'status',
        params: mockParams,
        id: 'test'
      });

      vi.mocked(getRequestSchema).mockReturnValue(mockRequestSchema as any);

      vi.mocked(fetch).mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      } as Response);

      const request = {
        jsonrpc: '2.0' as const,
        method: 'status' as const,
        params: mockParams,
        id: 'test'
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
        id: 'test'
      });

      vi.mocked(getRequestSchema).mockReturnValue(mockRequestSchema as any);

      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          jsonrpc: '2.0',
          id: 'test',
          error: {
            code: -32602,
            message: 'Invalid params',
            data: { details: 'Parameter validation failed' }
          }
        })
      } as Response);

      const request = {
        jsonrpc: '2.0' as const,
        method: 'status' as const,
        params: mockParams,
        id: 'test'
      };

      await expect(client.call(request)).rejects.toThrow(ApiError);
      try {
        await client.call(request);
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        if (error instanceof ApiError) {
          expect(error.message).toBe('Invalid params');
          expect(error.code).toBe(-32602);
          expect(error.data).toEqual({ details: 'Parameter validation failed' });
        }
      }
    });

    it('should use custom fetch options', async () => {
      const customClient = createRpcClient(mockBaseUrl, {
        headers: { 'Authorization': 'Bearer token' },
        timeout: 5000
      } as any);

      const { getRequestSchema, getResponseSchema } = await import('@space-rock/jsonrpc-types');

      // Generate dynamic mock data for status method
      const mockParams = generateMockParams('status');
      const mockResult = generateMockResponse('status');

      const mockRequestSchema = createMockRequestSchema({
        jsonrpc: '2.0',
        method: 'status',
        params: mockParams,
        id: 'test'
      });
      const mockResponseSchema = createMockResponseSchema({
        jsonrpc: '2.0',
        id: 'test',
        result: mockResult
      });

      vi.mocked(getRequestSchema).mockReturnValue(mockRequestSchema as any);
      vi.mocked(getResponseSchema).mockReturnValue(mockResponseSchema as any);

      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          jsonrpc: '2.0',
          id: 'test',
          result: mockResult
        })
      } as Response);

      const request = {
        jsonrpc: '2.0' as const,
        method: 'status' as const,
        params: mockParams,
        id: 'test'
      };

      await customClient.call(request);

      expect(fetch).toHaveBeenCalledWith(mockBaseUrl, expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Authorization': 'Bearer token'
        }),
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'status',
          params: mockParams,
          id: 'test'
        }),
        timeout: 5000
      }));
    });

    it('should handle case conversion properly', async () => {
      const { getRequestSchema, getResponseSchema } = await import('@space-rock/jsonrpc-types');

      // Generate dynamic mock data for status method
      const mockParams = generateMockParams('status');
      const mockResult = generateMockResponse('status');

      const mockRequestSchema = createMockRequestSchema({
        jsonrpc: '2.0',
        method: 'status',
        params: mockParams,
        id: 'test'
      });
      const mockResponseSchema = createMockResponseSchema({
        jsonrpc: '2.0',
        id: 'test',
        result: mockResult
      });

      vi.mocked(getRequestSchema).mockReturnValue(mockRequestSchema as any);
      vi.mocked(getResponseSchema).mockReturnValue(mockResponseSchema as any);

      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          jsonrpc: '2.0',
          id: 'test',
          result: mockResult
        })
      } as Response);

      const request = {
        jsonrpc: '2.0' as const,
        method: 'status' as const,
        params: mockParams,
        id: 'test'
      };

      const response = await client.call(request);

      // Verify response structure
      expect(response).toEqual({
        jsonrpc: '2.0',
        id: 'test',
        result: mockResult
      });
    });

    describe('request method', () => {
      it('should successfully make RPC request using request method', async () => {
        const { getRequestSchema, getResponseSchema } = await import('@space-rock/jsonrpc-types');

        // Generate dynamic mock data for status method
        const mockParams = generateMockParams('status');
        const mockResult = generateMockResponse('status');

        const mockRequestSchema = createMockRequestSchema({
          jsonrpc: '2.0',
          method: 'status',
          params: mockParams,
          id: expect.any(String)
        });
        const mockResponseSchema = createMockResponseSchema({
          jsonrpc: '2.0',
          id: expect.any(String),
          result: mockResult
        });

        vi.mocked(getRequestSchema).mockReturnValue(mockRequestSchema as any);
        vi.mocked(getResponseSchema).mockReturnValue(mockResponseSchema as any);

        vi.mocked(fetch).mockResolvedValue({
          ok: true,
          json: () => Promise.resolve({
            jsonrpc: '2.0',
            id: expect.any(String),
            result: mockResult
          })
        } as Response);

        const response = await client.request('status', mockParams);

        expect(getRequestSchema).toHaveBeenCalledWith('status');
        expect(getResponseSchema).toHaveBeenCalledWith('status');
        expect(mockRequestSchema.safeParse).toHaveBeenCalled();
        expect(mockResponseSchema.safeParse).toHaveBeenCalled();
        expect(fetch).toHaveBeenCalledWith(mockBaseUrl, expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.stringContaining('"method":"status"')
        }));
        expect(response).toEqual({
          jsonrpc: '2.0',
          id: expect.any(String),
          result: mockResult
        });
      });

      it('should generate random id when using request method', async () => {
        const { getRequestSchema, getResponseSchema } = await import('@space-rock/jsonrpc-types');

        // Generate dynamic mock data for status method
        const mockParams = generateMockParams('status');
        const mockResult = generateMockResponse('status');

        const mockRequestSchema = createMockRequestSchema({
          jsonrpc: '2.0',
          method: 'status',
          params: mockParams,
          id: expect.any(String)
        });
        const mockResponseSchema = createMockResponseSchema({
          jsonrpc: '2.0',
          id: expect.any(String),
          result: mockResult
        });

        vi.mocked(getRequestSchema).mockReturnValue(mockRequestSchema as any);
        vi.mocked(getResponseSchema).mockReturnValue(mockResponseSchema as any);

        vi.mocked(fetch).mockResolvedValue({
          ok: true,
          json: () => Promise.resolve({
            jsonrpc: '2.0',
            id: expect.any(String),
            result: mockResult
          })
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
          id: 'test'
        });

        vi.mocked(getRequestSchema).mockReturnValue(mockRequestSchema as any);

        vi.mocked(fetch).mockResolvedValue({
          ok: false,
          status: 500,
          statusText: 'Internal Server Error'
        } as Response);

        await expect(client.request('status', mockParams)).rejects.toThrow(ApiError);
      });
    });
  });
});
`;

  await fs.writeFile(
    path.join(outputDir, 'unit', 'client.test.ts'),
    clientTestContent,
  );
}

/**
 * Generate tests for the mapping functions (getRequestSchema, getResponseSchema)
 * This improves coverage for the uncovered lines in mappings.ts
 */
async function generateMappingTests(outputDir: string): Promise<void> {
  const mappingTestContent = `/**
 * Unit tests for JSON RPC mappings.
 * Tests the mapping utility functions for schema retrieval.
 */

import { describe, it, expect } from 'vitest';
import { getRequestSchema, getResponseSchema, methodSchemas } from '@space-rock/jsonrpc-types';

describe('JSON RPC Schema Mappings', () => {
  describe('getRequestSchema', () => {
    it('should return request schema for valid method', () => {
      // Take a known method from the methodSchemas object
      const methodName = Object.keys(methodSchemas)[0]!;
      const schema = getRequestSchema(methodName);

      expect(schema).toBeDefined();
      expect(schema).toBe(methodSchemas[methodName as keyof typeof methodSchemas].request);
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
      expect(schema).toBe(methodSchemas[methodName as keyof typeof methodSchemas].response);
    });

    it('should return undefined for unknown method', () => {
      const schema = getResponseSchema('non_existent_method');
      expect(schema).toBeUndefined();
    });
  });
});
`;

  // Create the mapping test file
  const mappingTestFilePath = path.join(outputDir, 'unit', 'mappings.test.ts');
  await fs.writeFile(mappingTestFilePath, mappingTestContent);
  console.log(`📝 Generated mapping tests: ${mappingTestFilePath}`);
}

// Execute the test generation process
generateJsonRpcTests();
