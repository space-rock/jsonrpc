import { type RpcClient } from '../client';
import {
  type JsonRpcRequest_for_status,
  type JsonRpcResponse_for_RpcStatusResponse_and_RpcError,
  JsonRpcRequest_for_statusSchema,
  JsonRpcResponse_for_RpcStatusResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';

export async function status(
  client: RpcClient,
  params: JsonRpcRequest_for_status['params'],
): Promise<JsonRpcResponse_for_RpcStatusResponse_and_RpcError> {
  return await client.call(
    'status',
    params,
    JsonRpcRequest_for_statusSchema,
    JsonRpcResponse_for_RpcStatusResponse_and_RpcErrorSchema,
  );
}
