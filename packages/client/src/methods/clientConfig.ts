import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequest_for_client_configSchema,
  JsonRpcResponse_for_RpcClientConfigResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RpcClient } from '../client';

export async function clientConfig(
  client: RpcClient,
  params: ApiParams<'client_config'>,
): Promise<ApiResponse<'client_config'>> {
  return client.call(
    'client_config',
    params,
    JsonRpcRequest_for_client_configSchema,
    JsonRpcResponse_for_RpcClientConfigResponse_and_RpcErrorSchema,
  );
}
