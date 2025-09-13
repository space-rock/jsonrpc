import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequestForExperimentalProtocolConfigSchema,
  JsonRpcResponseForRpcProtocolConfigResponseAndRpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RequestOptions, RpcClient } from '../client';

export async function EXPERIMENTALProtocolConfig(
  client: RpcClient,
  params: ApiParams<'EXPERIMENTAL_protocol_config'>,
  options?: RequestOptions,
): Promise<ApiResponse<'EXPERIMENTAL_protocol_config'>> {
  return client.call(
    'EXPERIMENTAL_protocol_config',
    params,
    JsonRpcRequestForExperimentalProtocolConfigSchema,
    JsonRpcResponseForRpcProtocolConfigResponseAndRpcErrorSchema,
    options,
  );
}
