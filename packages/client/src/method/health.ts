import { type RpcClient } from '../client';
import {
  type JsonRpcRequest_for_health,
  type JsonRpcResponse_for_Nullable_RpcHealthResponse_and_RpcError,
  JsonRpcRequest_for_healthSchema,
  JsonRpcResponse_for_Nullable_RpcHealthResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';

export async function health(
  client: RpcClient,
  params: JsonRpcRequest_for_health['params'],
): Promise<JsonRpcResponse_for_Nullable_RpcHealthResponse_and_RpcError> {
  return await client.call(
    'health',
    params,
    JsonRpcRequest_for_healthSchema,
    JsonRpcResponse_for_Nullable_RpcHealthResponse_and_RpcErrorSchema,
  );
}
