import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequest_for_next_light_client_blockSchema,
  JsonRpcResponse_for_RpcLightClientNextBlockResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RequestOptions, RpcClient } from '../client';

export async function nextLightClientBlock(
  client: RpcClient,
  params: ApiParams<'next_light_client_block'>,
  options?: RequestOptions,
): Promise<ApiResponse<'next_light_client_block'>> {
  return client.call(
    'next_light_client_block',
    params,
    JsonRpcRequest_for_next_light_client_blockSchema,
    JsonRpcResponse_for_RpcLightClientNextBlockResponse_and_RpcErrorSchema,
    options,
  );
}
