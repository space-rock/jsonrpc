import { type RpcClient } from '../client';
import {
  type JsonRpcRequest_for_EXPERIMENTAL_validators_ordered,
  type JsonRpcResponse_for_Array_of_ValidatorStakeView_and_RpcError,
  JsonRpcRequest_for_EXPERIMENTAL_validators_orderedSchema,
  JsonRpcResponse_for_Array_of_ValidatorStakeView_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';

export async function EXPERIMENTALValidatorsOrdered(
  client: RpcClient,
  params: JsonRpcRequest_for_EXPERIMENTAL_validators_ordered['params'],
): Promise<JsonRpcResponse_for_Array_of_ValidatorStakeView_and_RpcError> {
  return await client.call(
    'EXPERIMENTAL_validators_ordered',
    params,
    JsonRpcRequest_for_EXPERIMENTAL_validators_orderedSchema,
    JsonRpcResponse_for_Array_of_ValidatorStakeView_and_RpcErrorSchema,
  );
}
