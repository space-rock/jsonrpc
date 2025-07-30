import { type RpcClient } from '../client';
import {
  type JsonRpcRequest_for_block,
  type JsonRpcResponse_for_RpcBlockResponse_and_RpcError,
  JsonRpcRequest_for_blockSchema,
  JsonRpcResponse_for_RpcBlockResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';

export async function block(
  client: RpcClient,
  params: JsonRpcRequest_for_block['params'],
): Promise<JsonRpcResponse_for_RpcBlockResponse_and_RpcError> {
  return await client.call(
    'block',
    params,
    JsonRpcRequest_for_blockSchema,
    JsonRpcResponse_for_RpcBlockResponse_and_RpcErrorSchema,
  );
}
