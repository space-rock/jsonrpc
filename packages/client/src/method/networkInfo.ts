import { type RpcClient } from '../client';
import {
  type JsonRpcRequest_for_network_info,
  type JsonRpcResponse_for_RpcNetworkInfoResponse_and_RpcError,
  JsonRpcRequest_for_network_infoSchema,
  JsonRpcResponse_for_RpcNetworkInfoResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';

export async function networkInfo(
  client: RpcClient,
  params: JsonRpcRequest_for_network_info['params'],
): Promise<JsonRpcResponse_for_RpcNetworkInfoResponse_and_RpcError> {
  return await client.call(
    'network_info',
    params,
    JsonRpcRequest_for_network_infoSchema,
    JsonRpcResponse_for_RpcNetworkInfoResponse_and_RpcErrorSchema,
  );
}
