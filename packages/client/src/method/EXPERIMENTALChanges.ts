import { type RpcClient } from '../client';
import {
  type JsonRpcRequest_for_EXPERIMENTAL_changes,
  type JsonRpcResponse_for_RpcStateChangesInBlockResponse_and_RpcError,
  JsonRpcRequest_for_EXPERIMENTAL_changesSchema,
  JsonRpcResponse_for_RpcStateChangesInBlockResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';

export async function EXPERIMENTALChanges(
  client: RpcClient,
  params: JsonRpcRequest_for_EXPERIMENTAL_changes['params'],
): Promise<JsonRpcResponse_for_RpcStateChangesInBlockResponse_and_RpcError> {
  return await client.call(
    'EXPERIMENTAL_changes',
    params,
    JsonRpcRequest_for_EXPERIMENTAL_changesSchema,
    JsonRpcResponse_for_RpcStateChangesInBlockResponse_and_RpcErrorSchema,
  );
}
