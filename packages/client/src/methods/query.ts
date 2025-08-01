import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequest_for_querySchema,
  JsonRpcResponse_for_RpcQueryResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RpcClient } from '../client';

export async function query(
  client: RpcClient,
  params: ApiParams<'query'>,
): Promise<ApiResponse<'query'>> {
  return client.call(
    'query',
    params,
    JsonRpcRequest_for_querySchema,
    JsonRpcResponse_for_RpcQueryResponse_and_RpcErrorSchema,
  );
}
