import type { BaseIssue, BaseSchema } from 'valibot';
import type {
  ApiParams,
  ApiResponse,
  RpcMethod,
} from '@space-rock/jsonrpc-types';
import { safeParse } from 'valibot';
import { formatError, toCamelCase, toSnakeCase } from './utils';

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

export interface RequestOptions extends RequestInit {
  disableValidation?: boolean;
}

export function createRpcClient(baseUrl: string, options: RequestOptions = {}) {
  return {
    async call<M extends RpcMethod>(
      method: M,
      params: ApiParams<M>,
      requestSchema: BaseSchema<unknown, unknown, BaseIssue<unknown>>,
      responseSchema: BaseSchema<unknown, unknown, BaseIssue<unknown>>,
      callOptions?: RequestOptions,
    ): Promise<ApiResponse<M>> {
      // Merge options: callOptions override createRpcClient options
      const mergedOptions = { ...options, ...callOptions };
      let { disableValidation = false, ...fetchOptions } = mergedOptions;

      let request = {
        jsonrpc: '2.0' as const,
        method,
        params,
        id: Math.random().toString(36).substring(7),
      };

      // Validate the request if validation is enabled
      let snakeCaseRequest: unknown;
      if (!disableValidation) {
        const validatedRequest = safeParse(requestSchema, request);

        if (!validatedRequest.success) {
          throw new Error(
            `Invalid request:\n${JSON.stringify(formatError(validatedRequest), null, 2)}`,
          );
        }

        // Convert to snake_case for the API
        snakeCaseRequest = toSnakeCase(validatedRequest.output);
      } else {
        // Skip validation and convert directly
        snakeCaseRequest = toSnakeCase(request);
      }

      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(fetchOptions?.headers || {}),
        },
        body: JSON.stringify(snakeCaseRequest),
        signal: fetchOptions?.signal,
        ...fetchOptions,
      });

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

      // Validate the response if validation is enabled
      if (!disableValidation) {
        const validatedResponse = safeParse(responseSchema, camelCaseResponse);

        if (!validatedResponse.success) {
          throw new Error(
            `Invalid response:\n${JSON.stringify(formatError(validatedResponse), null, 2)}`,
          );
        }

        return validatedResponse.output as ApiResponse<M>;
      } else {
        // Skip validation and return response directly
        return camelCaseResponse as ApiResponse<M>;
      }
    },
  };
}
