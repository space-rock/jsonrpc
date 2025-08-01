import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequest_for_network_infoSchema,
  JsonRpcResponse_for_RpcNetworkInfoResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RpcClient } from '../client';

export async function networkInfo(
  client: RpcClient,
  params: ApiParams<'network_info'>,
): Promise<ApiResponse<'network_info'>> {
  return client.call(
    'network_info',
    params,
    JsonRpcRequest_for_network_infoSchema,
    JsonRpcResponse_for_RpcNetworkInfoResponse_and_RpcErrorSchema,
  );
}
