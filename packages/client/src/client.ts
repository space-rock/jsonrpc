import type {
  ApiRequest,
  ApiResponse,
  RpcMethod,
} from '@space-rock/jsonrpc-types';
import { getRequestSchema, getResponseSchema } from '@space-rock/jsonrpc-types';
import { formatZodError, toCamelCase, toSnakeCase } from './utils';

type JsonRpcRequest = ApiRequest<RpcMethod>;

export type RpcParams<M extends RpcMethod> = Extract<
  JsonRpcRequest,
  { method: M }
>['params'];

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

export function createRpcClient(baseUrl: string, fetchOptions?: RequestInit) {
  return {
    async call<M extends RpcMethod>(
      request: Extract<JsonRpcRequest, { method: M }>,
    ): Promise<ApiResponse<M>> {
      const requestSchema = getRequestSchema(request.method);

      if (!requestSchema) {
        throw new Error(
          `No request schema found for method: ${request.method}`,
        );
      }

      const validatedRequest = requestSchema.safeParse(request);

      if (!validatedRequest.success) {
        throw new Error(
          `Invalid request:\n${JSON.stringify(formatZodError(validatedRequest.error), null, 2)}`,
        );
      }

      const snakeCaseRequest = toSnakeCase(validatedRequest.data);

      const options: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...fetchOptions?.headers,
        },
        body: JSON.stringify(snakeCaseRequest),
        ...fetchOptions,
      };

      const response = await fetch(baseUrl, options);

      if (!response.ok) {
        throw new ApiError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status,
        );
      }

      const data = await response.json();

      if (data.error) {
        throw new ApiError(
          data.error.message,
          undefined,
          data.error.code,
          data.error.data,
        );
      }

      const responseSchema = getResponseSchema(request.method);

      if (!responseSchema) {
        throw new Error(
          `No response schema found for method: ${request.method}`,
        );
      }

      const camelCaseResponse = toCamelCase(data);

      const validatedResponse = responseSchema.safeParse(camelCaseResponse);

      if (!validatedResponse.success) {
        throw new Error(
          `Invalid response:\n${JSON.stringify(formatZodError(validatedResponse.error), null, 2)}`,
        );
      }

      return validatedResponse.data as ApiResponse<M>;
    },

    async request<M extends RpcMethod>(
      method: M,
      params: RpcParams<M>,
    ): Promise<ApiResponse<M>> {
      const id = Math.random().toString(36).substring(7);
      const request: Extract<JsonRpcRequest, { method: M }> = {
        jsonrpc: '2.0',
        method,
        params,
        id,
      } as Extract<JsonRpcRequest, { method: M }>;

      return this.call(request);
    },
  };
}
