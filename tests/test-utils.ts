/**
 * Test utilities for JSON RPC test generation.
 * This file was auto-generated - do not edit manually.
 */

import type { RpcMethod, ApiRequest } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequest_for_EXPERIMENTAL_changesSchema,
  JsonRpcRequest_for_EXPERIMENTAL_changes_in_blockSchema,
  JsonRpcRequest_for_EXPERIMENTAL_congestion_levelSchema,
  JsonRpcRequest_for_EXPERIMENTAL_genesis_configSchema,
  JsonRpcRequest_for_EXPERIMENTAL_light_client_block_proofSchema,
  JsonRpcRequest_for_EXPERIMENTAL_light_client_proofSchema,
  JsonRpcRequest_for_EXPERIMENTAL_maintenance_windowsSchema,
  JsonRpcRequest_for_EXPERIMENTAL_protocol_configSchema,
  JsonRpcRequest_for_EXPERIMENTAL_receiptSchema,
  JsonRpcRequest_for_EXPERIMENTAL_split_storage_infoSchema,
  JsonRpcRequest_for_EXPERIMENTAL_tx_statusSchema,
  JsonRpcRequest_for_EXPERIMENTAL_validators_orderedSchema,
  JsonRpcRequest_for_blockSchema,
  JsonRpcRequest_for_block_effectsSchema,
  JsonRpcRequest_for_broadcast_tx_asyncSchema,
  JsonRpcRequest_for_broadcast_tx_commitSchema,
  JsonRpcRequest_for_changesSchema,
  JsonRpcRequest_for_chunkSchema,
  JsonRpcRequest_for_client_configSchema,
  JsonRpcRequest_for_gas_priceSchema,
  JsonRpcRequest_for_genesis_configSchema,
  JsonRpcRequest_for_healthSchema,
  JsonRpcRequest_for_light_client_proofSchema,
  JsonRpcRequest_for_maintenance_windowsSchema,
  JsonRpcRequest_for_network_infoSchema,
  JsonRpcRequest_for_next_light_client_blockSchema,
  JsonRpcRequest_for_querySchema,
  JsonRpcRequest_for_send_txSchema,
  JsonRpcRequest_for_statusSchema,
  JsonRpcRequest_for_txSchema,
  JsonRpcRequest_for_validatorsSchema,
  JsonRpcResponse_for_Array_of_Range_of_uint64_and_RpcErrorSchema,
  JsonRpcResponse_for_Array_of_ValidatorStakeView_and_RpcErrorSchema,
  JsonRpcResponse_for_CryptoHash_and_RpcErrorSchema,
  JsonRpcResponse_for_GenesisConfig_and_RpcErrorSchema,
  JsonRpcResponse_for_Nullable_RpcHealthResponse_and_RpcErrorSchema,
  JsonRpcResponse_for_RpcBlockResponse_and_RpcErrorSchema,
  JsonRpcResponse_for_RpcChunkResponse_and_RpcErrorSchema,
  JsonRpcResponse_for_RpcClientConfigResponse_and_RpcErrorSchema,
  JsonRpcResponse_for_RpcCongestionLevelResponse_and_RpcErrorSchema,
  JsonRpcResponse_for_RpcGasPriceResponse_and_RpcErrorSchema,
  JsonRpcResponse_for_RpcLightClientBlockProofResponse_and_RpcErrorSchema,
  JsonRpcResponse_for_RpcLightClientExecutionProofResponse_and_RpcErrorSchema,
  JsonRpcResponse_for_RpcLightClientNextBlockResponse_and_RpcErrorSchema,
  JsonRpcResponse_for_RpcNetworkInfoResponse_and_RpcErrorSchema,
  JsonRpcResponse_for_RpcProtocolConfigResponse_and_RpcErrorSchema,
  JsonRpcResponse_for_RpcQueryResponse_and_RpcErrorSchema,
  JsonRpcResponse_for_RpcReceiptResponse_and_RpcErrorSchema,
  JsonRpcResponse_for_RpcSplitStorageInfoResponse_and_RpcErrorSchema,
  JsonRpcResponse_for_RpcStateChangesInBlockByTypeResponse_and_RpcErrorSchema,
  JsonRpcResponse_for_RpcStateChangesInBlockResponse_and_RpcErrorSchema,
  JsonRpcResponse_for_RpcStatusResponse_and_RpcErrorSchema,
  JsonRpcResponse_for_RpcTransactionResponse_and_RpcErrorSchema,
  JsonRpcResponse_for_RpcValidatorResponse_and_RpcErrorSchema,
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
    request: JsonRpcRequest_for_EXPERIMENTAL_changesSchema,
    response:
      JsonRpcResponse_for_RpcStateChangesInBlockResponse_and_RpcErrorSchema,
  },
  EXPERIMENTAL_changes_in_block: {
    request: JsonRpcRequest_for_EXPERIMENTAL_changes_in_blockSchema,
    response:
      JsonRpcResponse_for_RpcStateChangesInBlockByTypeResponse_and_RpcErrorSchema,
  },
  EXPERIMENTAL_congestion_level: {
    request: JsonRpcRequest_for_EXPERIMENTAL_congestion_levelSchema,
    response: JsonRpcResponse_for_RpcCongestionLevelResponse_and_RpcErrorSchema,
  },
  EXPERIMENTAL_genesis_config: {
    request: JsonRpcRequest_for_EXPERIMENTAL_genesis_configSchema,
    response: JsonRpcResponse_for_GenesisConfig_and_RpcErrorSchema,
  },
  EXPERIMENTAL_light_client_block_proof: {
    request: JsonRpcRequest_for_EXPERIMENTAL_light_client_block_proofSchema,
    response:
      JsonRpcResponse_for_RpcLightClientBlockProofResponse_and_RpcErrorSchema,
  },
  EXPERIMENTAL_light_client_proof: {
    request: JsonRpcRequest_for_EXPERIMENTAL_light_client_proofSchema,
    response:
      JsonRpcResponse_for_RpcLightClientExecutionProofResponse_and_RpcErrorSchema,
  },
  EXPERIMENTAL_maintenance_windows: {
    request: JsonRpcRequest_for_EXPERIMENTAL_maintenance_windowsSchema,
    response: JsonRpcResponse_for_Array_of_Range_of_uint64_and_RpcErrorSchema,
  },
  EXPERIMENTAL_protocol_config: {
    request: JsonRpcRequest_for_EXPERIMENTAL_protocol_configSchema,
    response: JsonRpcResponse_for_RpcProtocolConfigResponse_and_RpcErrorSchema,
  },
  EXPERIMENTAL_receipt: {
    request: JsonRpcRequest_for_EXPERIMENTAL_receiptSchema,
    response: JsonRpcResponse_for_RpcReceiptResponse_and_RpcErrorSchema,
  },
  EXPERIMENTAL_split_storage_info: {
    request: JsonRpcRequest_for_EXPERIMENTAL_split_storage_infoSchema,
    response:
      JsonRpcResponse_for_RpcSplitStorageInfoResponse_and_RpcErrorSchema,
  },
  EXPERIMENTAL_tx_status: {
    request: JsonRpcRequest_for_EXPERIMENTAL_tx_statusSchema,
    response: JsonRpcResponse_for_RpcTransactionResponse_and_RpcErrorSchema,
  },
  EXPERIMENTAL_validators_ordered: {
    request: JsonRpcRequest_for_EXPERIMENTAL_validators_orderedSchema,
    response:
      JsonRpcResponse_for_Array_of_ValidatorStakeView_and_RpcErrorSchema,
  },
  block: {
    request: JsonRpcRequest_for_blockSchema,
    response: JsonRpcResponse_for_RpcBlockResponse_and_RpcErrorSchema,
  },
  block_effects: {
    request: JsonRpcRequest_for_block_effectsSchema,
    response:
      JsonRpcResponse_for_RpcStateChangesInBlockByTypeResponse_and_RpcErrorSchema,
  },
  broadcast_tx_async: {
    request: JsonRpcRequest_for_broadcast_tx_asyncSchema,
    response: JsonRpcResponse_for_CryptoHash_and_RpcErrorSchema,
  },
  broadcast_tx_commit: {
    request: JsonRpcRequest_for_broadcast_tx_commitSchema,
    response: JsonRpcResponse_for_RpcTransactionResponse_and_RpcErrorSchema,
  },
  changes: {
    request: JsonRpcRequest_for_changesSchema,
    response:
      JsonRpcResponse_for_RpcStateChangesInBlockResponse_and_RpcErrorSchema,
  },
  chunk: {
    request: JsonRpcRequest_for_chunkSchema,
    response: JsonRpcResponse_for_RpcChunkResponse_and_RpcErrorSchema,
  },
  client_config: {
    request: JsonRpcRequest_for_client_configSchema,
    response: JsonRpcResponse_for_RpcClientConfigResponse_and_RpcErrorSchema,
  },
  gas_price: {
    request: JsonRpcRequest_for_gas_priceSchema,
    response: JsonRpcResponse_for_RpcGasPriceResponse_and_RpcErrorSchema,
  },
  genesis_config: {
    request: JsonRpcRequest_for_genesis_configSchema,
    response: JsonRpcResponse_for_GenesisConfig_and_RpcErrorSchema,
  },
  health: {
    request: JsonRpcRequest_for_healthSchema,
    response: JsonRpcResponse_for_Nullable_RpcHealthResponse_and_RpcErrorSchema,
  },
  light_client_proof: {
    request: JsonRpcRequest_for_light_client_proofSchema,
    response:
      JsonRpcResponse_for_RpcLightClientExecutionProofResponse_and_RpcErrorSchema,
  },
  maintenance_windows: {
    request: JsonRpcRequest_for_maintenance_windowsSchema,
    response: JsonRpcResponse_for_Array_of_Range_of_uint64_and_RpcErrorSchema,
  },
  network_info: {
    request: JsonRpcRequest_for_network_infoSchema,
    response: JsonRpcResponse_for_RpcNetworkInfoResponse_and_RpcErrorSchema,
  },
  next_light_client_block: {
    request: JsonRpcRequest_for_next_light_client_blockSchema,
    response:
      JsonRpcResponse_for_RpcLightClientNextBlockResponse_and_RpcErrorSchema,
  },
  query: {
    request: JsonRpcRequest_for_querySchema,
    response: JsonRpcResponse_for_RpcQueryResponse_and_RpcErrorSchema,
  },
  send_tx: {
    request: JsonRpcRequest_for_send_txSchema,
    response: JsonRpcResponse_for_RpcTransactionResponse_and_RpcErrorSchema,
  },
  status: {
    request: JsonRpcRequest_for_statusSchema,
    response: JsonRpcResponse_for_RpcStatusResponse_and_RpcErrorSchema,
  },
  tx: {
    request: JsonRpcRequest_for_txSchema,
    response: JsonRpcResponse_for_RpcTransactionResponse_and_RpcErrorSchema,
  },
  validators: {
    request: JsonRpcRequest_for_validatorsSchema,
    response: JsonRpcResponse_for_RpcValidatorResponse_and_RpcErrorSchema,
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
