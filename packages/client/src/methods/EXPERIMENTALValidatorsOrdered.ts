import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequest_for_EXPERIMENTAL_validators_orderedSchema,
  JsonRpcResponse_for_Array_of_ValidatorStakeView_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RpcClient } from '../client';

export async function EXPERIMENTALValidatorsOrdered(
  client: RpcClient,
  params: ApiParams<'EXPERIMENTAL_validators_ordered'>,
): Promise<ApiResponse<'EXPERIMENTAL_validators_ordered'>> {
  return client.call(
    'EXPERIMENTAL_validators_ordered',
    params,
    JsonRpcRequest_for_EXPERIMENTAL_validators_orderedSchema,
    JsonRpcResponse_for_Array_of_ValidatorStakeView_and_RpcErrorSchema,
  );
}
