import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequestForValidatorsSchema,
  JsonRpcResponseForRpcValidatorResponseAndRpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RequestOptions, RpcClient } from '../client';

export async function validators(
  client: RpcClient,
  params: ApiParams<'validators'>,
  options?: RequestOptions,
): Promise<ApiResponse<'validators'>> {
  return client.call(
    'validators',
    params,
    JsonRpcRequestForValidatorsSchema,
    JsonRpcResponseForRpcValidatorResponseAndRpcErrorSchema,
    options,
  );
}
