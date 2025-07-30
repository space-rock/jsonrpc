import { type RpcClient } from '../client';
import {
  type JsonRpcRequest_for_validators,
  type JsonRpcResponse_for_RpcValidatorResponse_and_RpcError,
  JsonRpcRequest_for_validatorsSchema,
  JsonRpcResponse_for_RpcValidatorResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';

export async function validators(
  client: RpcClient,
  params: JsonRpcRequest_for_validators['params'],
): Promise<JsonRpcResponse_for_RpcValidatorResponse_and_RpcError> {
  return await client.call(
    'validators',
    params,
    JsonRpcRequest_for_validatorsSchema,
    JsonRpcResponse_for_RpcValidatorResponse_and_RpcErrorSchema,
  );
}
