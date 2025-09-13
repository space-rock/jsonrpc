/**
 * Test utilities for JSON RPC test generation.
 * This file was auto-generated - do not edit manually.
 */

import type { RpcMethod, ApiRequest } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequestForBlockEffectsSchema,
  JsonRpcRequestForBlockSchema,
  JsonRpcRequestForBroadcastTxAsyncSchema,
  JsonRpcRequestForBroadcastTxCommitSchema,
  JsonRpcRequestForChangesSchema,
  JsonRpcRequestForChunkSchema,
  JsonRpcRequestForClientConfigSchema,
  JsonRpcRequestForExperimentalChangesInBlockSchema,
  JsonRpcRequestForExperimentalChangesSchema,
  JsonRpcRequestForExperimentalCongestionLevelSchema,
  JsonRpcRequestForExperimentalGenesisConfigSchema,
  JsonRpcRequestForExperimentalLightClientBlockProofSchema,
  JsonRpcRequestForExperimentalLightClientProofSchema,
  JsonRpcRequestForExperimentalMaintenanceWindowsSchema,
  JsonRpcRequestForExperimentalProtocolConfigSchema,
  JsonRpcRequestForExperimentalReceiptSchema,
  JsonRpcRequestForExperimentalSplitStorageInfoSchema,
  JsonRpcRequestForExperimentalTxStatusSchema,
  JsonRpcRequestForExperimentalValidatorsOrderedSchema,
  JsonRpcRequestForGasPriceSchema,
  JsonRpcRequestForGenesisConfigSchema,
  JsonRpcRequestForHealthSchema,
  JsonRpcRequestForLightClientProofSchema,
  JsonRpcRequestForMaintenanceWindowsSchema,
  JsonRpcRequestForNetworkInfoSchema,
  JsonRpcRequestForNextLightClientBlockSchema,
  JsonRpcRequestForQuerySchema,
  JsonRpcRequestForSendTxSchema,
  JsonRpcRequestForStatusSchema,
  JsonRpcRequestForTxSchema,
  JsonRpcRequestForValidatorsSchema,
  JsonRpcResponseForArrayOfRangeOfUint64AndRpcErrorSchema,
  JsonRpcResponseForArrayOfValidatorStakeViewAndRpcErrorSchema,
  JsonRpcResponseForCryptoHashAndRpcErrorSchema,
  JsonRpcResponseForGenesisConfigAndRpcErrorSchema,
  JsonRpcResponseForNullableRpcHealthResponseAndRpcErrorSchema,
  JsonRpcResponseForRpcBlockResponseAndRpcErrorSchema,
  JsonRpcResponseForRpcChunkResponseAndRpcErrorSchema,
  JsonRpcResponseForRpcClientConfigResponseAndRpcErrorSchema,
  JsonRpcResponseForRpcCongestionLevelResponseAndRpcErrorSchema,
  JsonRpcResponseForRpcGasPriceResponseAndRpcErrorSchema,
  JsonRpcResponseForRpcLightClientBlockProofResponseAndRpcErrorSchema,
  JsonRpcResponseForRpcLightClientExecutionProofResponseAndRpcErrorSchema,
  JsonRpcResponseForRpcLightClientNextBlockResponseAndRpcErrorSchema,
  JsonRpcResponseForRpcNetworkInfoResponseAndRpcErrorSchema,
  JsonRpcResponseForRpcProtocolConfigResponseAndRpcErrorSchema,
  JsonRpcResponseForRpcQueryResponseAndRpcErrorSchema,
  JsonRpcResponseForRpcReceiptResponseAndRpcErrorSchema,
  JsonRpcResponseForRpcSplitStorageInfoResponseAndRpcErrorSchema,
  JsonRpcResponseForRpcStateChangesInBlockByTypeResponseAndRpcErrorSchema,
  JsonRpcResponseForRpcStateChangesInBlockResponseAndRpcErrorSchema,
  JsonRpcResponseForRpcStatusResponseAndRpcErrorSchema,
  JsonRpcResponseForRpcTransactionResponseAndRpcErrorSchema,
  JsonRpcResponseForRpcValidatorResponseAndRpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import { Valimock } from '@space-rock/valimock';
import * as v from 'valibot';
import { fakerEN } from '@faker-js/faker';

// Override fakerEN's arrayElement to be deterministic for testing
fakerEN.helpers.arrayElement = function <T>(array: ReadonlyArray<T>): T {
  return array[0]!;
};

// Create valimock instance with custom faker
const valimock = new Valimock({ faker: fakerEN });

// Schema registry for runtime access
const schemaRegistry = {
  EXPERIMENTAL_changes: {
    request: JsonRpcRequestForExperimentalChangesSchema,
    response: JsonRpcResponseForRpcStateChangesInBlockResponseAndRpcErrorSchema,
  },
  EXPERIMENTAL_changes_in_block: {
    request: JsonRpcRequestForExperimentalChangesInBlockSchema,
    response:
      JsonRpcResponseForRpcStateChangesInBlockByTypeResponseAndRpcErrorSchema,
  },
  EXPERIMENTAL_congestion_level: {
    request: JsonRpcRequestForExperimentalCongestionLevelSchema,
    response: JsonRpcResponseForRpcCongestionLevelResponseAndRpcErrorSchema,
  },
  EXPERIMENTAL_genesis_config: {
    request: JsonRpcRequestForExperimentalGenesisConfigSchema,
    response: JsonRpcResponseForGenesisConfigAndRpcErrorSchema,
  },
  EXPERIMENTAL_light_client_block_proof: {
    request: JsonRpcRequestForExperimentalLightClientBlockProofSchema,
    response:
      JsonRpcResponseForRpcLightClientBlockProofResponseAndRpcErrorSchema,
  },
  EXPERIMENTAL_light_client_proof: {
    request: JsonRpcRequestForExperimentalLightClientProofSchema,
    response:
      JsonRpcResponseForRpcLightClientExecutionProofResponseAndRpcErrorSchema,
  },
  EXPERIMENTAL_maintenance_windows: {
    request: JsonRpcRequestForExperimentalMaintenanceWindowsSchema,
    response: JsonRpcResponseForArrayOfRangeOfUint64AndRpcErrorSchema,
  },
  EXPERIMENTAL_protocol_config: {
    request: JsonRpcRequestForExperimentalProtocolConfigSchema,
    response: JsonRpcResponseForRpcProtocolConfigResponseAndRpcErrorSchema,
  },
  EXPERIMENTAL_receipt: {
    request: JsonRpcRequestForExperimentalReceiptSchema,
    response: JsonRpcResponseForRpcReceiptResponseAndRpcErrorSchema,
  },
  EXPERIMENTAL_split_storage_info: {
    request: JsonRpcRequestForExperimentalSplitStorageInfoSchema,
    response: JsonRpcResponseForRpcSplitStorageInfoResponseAndRpcErrorSchema,
  },
  EXPERIMENTAL_tx_status: {
    request: JsonRpcRequestForExperimentalTxStatusSchema,
    response: JsonRpcResponseForRpcTransactionResponseAndRpcErrorSchema,
  },
  EXPERIMENTAL_validators_ordered: {
    request: JsonRpcRequestForExperimentalValidatorsOrderedSchema,
    response: JsonRpcResponseForArrayOfValidatorStakeViewAndRpcErrorSchema,
  },
  block: {
    request: JsonRpcRequestForBlockSchema,
    response: JsonRpcResponseForRpcBlockResponseAndRpcErrorSchema,
  },
  block_effects: {
    request: JsonRpcRequestForBlockEffectsSchema,
    response:
      JsonRpcResponseForRpcStateChangesInBlockByTypeResponseAndRpcErrorSchema,
  },
  broadcast_tx_async: {
    request: JsonRpcRequestForBroadcastTxAsyncSchema,
    response: JsonRpcResponseForCryptoHashAndRpcErrorSchema,
  },
  broadcast_tx_commit: {
    request: JsonRpcRequestForBroadcastTxCommitSchema,
    response: JsonRpcResponseForRpcTransactionResponseAndRpcErrorSchema,
  },
  changes: {
    request: JsonRpcRequestForChangesSchema,
    response: JsonRpcResponseForRpcStateChangesInBlockResponseAndRpcErrorSchema,
  },
  chunk: {
    request: JsonRpcRequestForChunkSchema,
    response: JsonRpcResponseForRpcChunkResponseAndRpcErrorSchema,
  },
  client_config: {
    request: JsonRpcRequestForClientConfigSchema,
    response: JsonRpcResponseForRpcClientConfigResponseAndRpcErrorSchema,
  },
  gas_price: {
    request: JsonRpcRequestForGasPriceSchema,
    response: JsonRpcResponseForRpcGasPriceResponseAndRpcErrorSchema,
  },
  genesis_config: {
    request: JsonRpcRequestForGenesisConfigSchema,
    response: JsonRpcResponseForGenesisConfigAndRpcErrorSchema,
  },
  health: {
    request: JsonRpcRequestForHealthSchema,
    response: JsonRpcResponseForNullableRpcHealthResponseAndRpcErrorSchema,
  },
  light_client_proof: {
    request: JsonRpcRequestForLightClientProofSchema,
    response:
      JsonRpcResponseForRpcLightClientExecutionProofResponseAndRpcErrorSchema,
  },
  maintenance_windows: {
    request: JsonRpcRequestForMaintenanceWindowsSchema,
    response: JsonRpcResponseForArrayOfRangeOfUint64AndRpcErrorSchema,
  },
  network_info: {
    request: JsonRpcRequestForNetworkInfoSchema,
    response: JsonRpcResponseForRpcNetworkInfoResponseAndRpcErrorSchema,
  },
  next_light_client_block: {
    request: JsonRpcRequestForNextLightClientBlockSchema,
    response:
      JsonRpcResponseForRpcLightClientNextBlockResponseAndRpcErrorSchema,
  },
  query: {
    request: JsonRpcRequestForQuerySchema,
    response: JsonRpcResponseForRpcQueryResponseAndRpcErrorSchema,
  },
  send_tx: {
    request: JsonRpcRequestForSendTxSchema,
    response: JsonRpcResponseForRpcTransactionResponseAndRpcErrorSchema,
  },
  status: {
    request: JsonRpcRequestForStatusSchema,
    response: JsonRpcResponseForRpcStatusResponseAndRpcErrorSchema,
  },
  tx: {
    request: JsonRpcRequestForTxSchema,
    response: JsonRpcResponseForRpcTransactionResponseAndRpcErrorSchema,
  },
  validators: {
    request: JsonRpcRequestForValidatorsSchema,
    response: JsonRpcResponseForRpcValidatorResponseAndRpcErrorSchema,
  },
} as const;

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
 * Generates mock parameters based on the RPC method using Valimock.
 * @param method - The RPC method name
 * @returns Mock parameters appropriate for the method
 */
export function generateMockParams(method: RpcMethod): any {
  const requestSchema = schemaRegistry[method]?.request;
  if (!requestSchema) {
    throw new Error(`No request schema found for method: ${method}`);
  }

  // Generate a full request and extract just the params
  const fullRequest = valimock.mock(requestSchema);
  return fullRequest.params;
}

/**
 * Generates mock response data based on the RPC method using Valimock.
 * @param method - The RPC method name
 * @returns Mock response data appropriate for the method
 */
export function generateMockResponse(method: RpcMethod): any {
  const responseSchema = schemaRegistry[method]?.response;
  if (!responseSchema) {
    throw new Error(`No response schema found for method: ${method}`);
  }

  // Generate a full response using the schema
  const fullResponse = valimock.mock(responseSchema);
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

  // Generate once with deterministic faker seed
  const originalSeed = fakerEN.seed();
  fakerEN.seed(hashString(`${method}-${testId}`));

  const data = generateMockParams(method);
  testDataCache.set(cacheKey, data);

  // Restore original seed
  if (originalSeed) {
    fakerEN.seed(originalSeed);
  }

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

  // Generate once with deterministic faker seed
  const originalSeed = fakerEN.seed();
  fakerEN.seed(hashString(`${method}-${testId}`));

  const data = generateMockResponse(method);
  testDataCache.set(cacheKey, data);

  // Restore original seed
  if (originalSeed) {
    fakerEN.seed(originalSeed);
  }

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
  const requestSchema = schemaRegistry[method]?.request;
  if (!requestSchema) {
    throw new Error(`No request schema found for method: ${method}`);
  }

  const result = v.safeParse(requestSchema, request);
  return result.success;
}

/**
 * Strictly validates a response against its schema.
 * @param method - The RPC method name
 * @param response - The response to validate
 * @return True if validation is success, false otherwise
 */
export function validateResponse(method: RpcMethod, response: any): boolean {
  const responseSchema = schemaRegistry[method]?.response;
  if (!responseSchema) {
    throw new Error(`No response schema found for method: ${method}`);
  }

  const result = v.safeParse(responseSchema, response);
  return result.success;
}

/**
 * Checks if a method has both request and response schemas.
 * @param method - The RPC method name
 * @returns True if both schemas exist, false otherwise
 */
export function hasValidSchemas(method: RpcMethod): boolean {
  const schemas = schemaRegistry[method];
  return !!(schemas?.request && schemas?.response);
}

/**
 * Gets the request schema for a method.
 * @param method - The RPC method name
 * @throws Error if schema is not found
 */
export function getRequestSchema(method: RpcMethod): v.GenericSchema<any> {
  const schema = schemaRegistry[method]?.request;
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
export function getResponseSchema(method: RpcMethod): v.GenericSchema<any> {
  const schema = schemaRegistry[method]?.response;
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
