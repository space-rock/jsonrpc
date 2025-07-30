import { type RpcClient } from '../client';
import {
  type JsonRpcRequest_for_EXPERIMENTAL_congestion_level,
  type JsonRpcResponse_for_RpcCongestionLevelResponse_and_RpcError,
  JsonRpcRequest_for_EXPERIMENTAL_congestion_levelSchema,
  JsonRpcResponse_for_RpcCongestionLevelResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';

export async function EXPERIMENTALCongestionLevel(
  client: RpcClient,
  params: JsonRpcRequest_for_EXPERIMENTAL_congestion_level['params'],
): Promise<JsonRpcResponse_for_RpcCongestionLevelResponse_and_RpcError> {
  return await client.call(
    'EXPERIMENTAL_congestion_level',
    params,
    JsonRpcRequest_for_EXPERIMENTAL_congestion_levelSchema,
    JsonRpcResponse_for_RpcCongestionLevelResponse_and_RpcErrorSchema,
  );
}
