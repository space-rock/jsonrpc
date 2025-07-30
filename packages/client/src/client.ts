import { z } from 'zod/mini';
import type {
  ApiRequest,
  ApiResponse,
  RpcMethod,
} from '@space-rock/jsonrpc-types';
import { toCamelCase, toSnakeCase } from './utils';

export type RpcClient = ReturnType<typeof createRpcClient>;

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: number,
    public data?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export interface RpcClientOptions {
  headers?: HeadersInit;
  signal?: AbortSignal;
  [key: string]: any;
}

export function createRpcClient(baseUrl: string, options?: RpcClientOptions) {
  return {
    async call<M extends RpcMethod>(
      method: M,
      params: ApiRequest<M>['params'],
      requestSchema: z.ZodMiniType<any>,
      responseSchema: z.ZodMiniType<any>,
    ): Promise<ApiResponse<M>> {
      const request = {
        jsonrpc: '2.0' as const,
        method,
        params,
        id: Math.random().toString(36).substring(7),
      };

      // Validate the request
      const validatedRequest = requestSchema.safeParse(request);
      if (!validatedRequest.success) {
        throw new Error(
          `Invalid request:\n${z.prettifyError(validatedRequest.error)}`,
        );
      }

      // Convert to snake_case for the API
      const snakeCaseRequest = toSnakeCase(validatedRequest.data);

      const fetchOptions: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(options?.headers || {}),
        },
        body: JSON.stringify(snakeCaseRequest),
        signal: options?.signal,
        ...options,
      };

      const response = await fetch(baseUrl, fetchOptions);

      if (!response.ok) {
        throw new ApiError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status,
        );
      }

      const data = await response.json();

      // Check for JSON-RPC error
      if (data.error) {
        throw new ApiError(
          data.error.message,
          undefined,
          data.error.code,
          data.error.data,
        );
      }

      // Convert response to camelCase
      const camelCaseResponse = toCamelCase(data);

      // Validate the response
      const validatedResponse = responseSchema.safeParse(camelCaseResponse);
      if (!validatedResponse.success) {
        throw new Error(
          `Invalid response:\n${z.prettifyError(validatedResponse.error)}`,
        );
      }

      return validatedResponse.data as ApiResponse<M>;
    },
  };
}
