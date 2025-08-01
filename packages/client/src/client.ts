import type { BaseIssue, BaseSchema } from 'valibot';
import type {
  ApiParams,
  ApiResponse,
  RpcMethod,
} from '@space-rock/jsonrpc-types';
import { safeParse, summarize } from 'valibot';
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
      params: ApiParams<M>,
      requestSchema: BaseSchema<unknown, unknown, BaseIssue<unknown>>,
      responseSchema: BaseSchema<unknown, unknown, BaseIssue<unknown>>,
    ): Promise<ApiResponse<M>> {
      const request = {
        jsonrpc: '2.0' as const,
        method,
        params,
        id: Math.random().toString(36).substring(7),
      };

      // Validate the request
      const validatedRequest = safeParse(requestSchema, request);
      if (!validatedRequest.success) {
        throw new Error(
          `Invalid request:\n${summarize(validatedRequest.issues)}`,
        );
      }

      // Convert to snake_case for the API
      const snakeCaseRequest = toSnakeCase(validatedRequest.output);

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
      const validatedResponse = safeParse(responseSchema, camelCaseResponse);
      if (!validatedResponse.success) {
        throw new Error(
          `Invalid response:\n${summarize(validatedResponse.issues)}`,
        );
      }

      return validatedResponse.output as ApiResponse<M>;
    },
  };
}
