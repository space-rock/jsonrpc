import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequest_for_EXPERIMENTAL_protocol_configSchema,
  JsonRpcResponse_for_RpcProtocolConfigResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RpcClient } from '../client';

export async function EXPERIMENTALProtocolConfig(
  client: RpcClient,
  params: ApiParams<'EXPERIMENTAL_protocol_config'>,
): Promise<ApiResponse<'EXPERIMENTAL_protocol_config'>> {
  return client.call(
    'EXPERIMENTAL_protocol_config',
    params,
    JsonRpcRequest_for_EXPERIMENTAL_protocol_configSchema,
    JsonRpcResponse_for_RpcProtocolConfigResponse_and_RpcErrorSchema,
  );
}
