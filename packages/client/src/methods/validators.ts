import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequest_for_validatorsSchema,
  JsonRpcResponse_for_RpcValidatorResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RpcClient } from '../client';

export async function validators(
  client: RpcClient,
  params: ApiParams<'validators'>,
): Promise<ApiResponse<'validators'>> {
  return client.call(
    'validators',
    params,
    JsonRpcRequest_for_validatorsSchema,
    JsonRpcResponse_for_RpcValidatorResponse_and_RpcErrorSchema,
  );
}
