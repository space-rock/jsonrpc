import { type RpcClient } from '../client';
import {
  type JsonRpcRequest_for_EXPERIMENTAL_changes_in_block,
  type JsonRpcResponse_for_RpcStateChangesInBlockByTypeResponse_and_RpcError,
  JsonRpcRequest_for_EXPERIMENTAL_changes_in_blockSchema,
  JsonRpcResponse_for_RpcStateChangesInBlockByTypeResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';

export async function EXPERIMENTALChangesInBlock(
  client: RpcClient,
  params: JsonRpcRequest_for_EXPERIMENTAL_changes_in_block['params'],
): Promise<JsonRpcResponse_for_RpcStateChangesInBlockByTypeResponse_and_RpcError> {
  return await client.call(
    'EXPERIMENTAL_changes_in_block',
    params,
    JsonRpcRequest_for_EXPERIMENTAL_changes_in_blockSchema,
    JsonRpcResponse_for_RpcStateChangesInBlockByTypeResponse_and_RpcErrorSchema,
  );
}
