import { type RpcClient } from '../client';
import {
  type JsonRpcRequest_for_client_config,
  type JsonRpcResponse_for_RpcClientConfigResponse_and_RpcError,
  JsonRpcRequest_for_client_configSchema,
  JsonRpcResponse_for_RpcClientConfigResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';

export async function clientConfig(
  client: RpcClient,
  params: JsonRpcRequest_for_client_config['params'],
): Promise<JsonRpcResponse_for_RpcClientConfigResponse_and_RpcError> {
  return await client.call(
    'client_config',
    params,
    JsonRpcRequest_for_client_configSchema,
    JsonRpcResponse_for_RpcClientConfigResponse_and_RpcErrorSchema,
  );
}
