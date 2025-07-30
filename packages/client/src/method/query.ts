import { type RpcClient } from '../client';
import {
  type JsonRpcRequest_for_query,
  type JsonRpcResponse_for_RpcQueryResponse_and_RpcError,
  JsonRpcRequest_for_querySchema,
  JsonRpcResponse_for_RpcQueryResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';

export async function query(
  client: RpcClient,
  params: JsonRpcRequest_for_query['params'],
): Promise<JsonRpcResponse_for_RpcQueryResponse_and_RpcError> {
  return await client.call(
    'query',
    params,
    JsonRpcRequest_for_querySchema,
    JsonRpcResponse_for_RpcQueryResponse_and_RpcErrorSchema,
  );
}
