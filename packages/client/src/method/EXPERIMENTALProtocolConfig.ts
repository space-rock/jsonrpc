import { type RpcClient } from '../client';
import {
  type JsonRpcRequest_for_EXPERIMENTAL_protocol_config,
  type JsonRpcResponse_for_RpcProtocolConfigResponse_and_RpcError,
  JsonRpcRequest_for_EXPERIMENTAL_protocol_configSchema,
  JsonRpcResponse_for_RpcProtocolConfigResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';

export async function EXPERIMENTALProtocolConfig(
  client: RpcClient,
  params: JsonRpcRequest_for_EXPERIMENTAL_protocol_config['params'],
): Promise<JsonRpcResponse_for_RpcProtocolConfigResponse_and_RpcError> {
  return await client.call(
    'EXPERIMENTAL_protocol_config',
    params,
    JsonRpcRequest_for_EXPERIMENTAL_protocol_configSchema,
    JsonRpcResponse_for_RpcProtocolConfigResponse_and_RpcErrorSchema,
  );
}
