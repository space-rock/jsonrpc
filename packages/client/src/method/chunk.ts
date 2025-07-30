import { type RpcClient } from '../client';
import {
  type JsonRpcRequest_for_chunk,
  type JsonRpcResponse_for_RpcChunkResponse_and_RpcError,
  JsonRpcRequest_for_chunkSchema,
  JsonRpcResponse_for_RpcChunkResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';

export async function chunk(
  client: RpcClient,
  params: JsonRpcRequest_for_chunk['params'],
): Promise<JsonRpcResponse_for_RpcChunkResponse_and_RpcError> {
  return await client.call(
    'chunk',
    params,
    JsonRpcRequest_for_chunkSchema,
    JsonRpcResponse_for_RpcChunkResponse_and_RpcErrorSchema,
  );
}
