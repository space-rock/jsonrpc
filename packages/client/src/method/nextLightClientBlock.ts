import { type RpcClient } from '../client';
import {
  type JsonRpcRequest_for_next_light_client_block,
  type JsonRpcResponse_for_RpcLightClientNextBlockResponse_and_RpcError,
  JsonRpcRequest_for_next_light_client_blockSchema,
  JsonRpcResponse_for_RpcLightClientNextBlockResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';

export async function nextLightClientBlock(
  client: RpcClient,
  params: JsonRpcRequest_for_next_light_client_block['params'],
): Promise<JsonRpcResponse_for_RpcLightClientNextBlockResponse_and_RpcError> {
  return await client.call(
    'next_light_client_block',
    params,
    JsonRpcRequest_for_next_light_client_blockSchema,
    JsonRpcResponse_for_RpcLightClientNextBlockResponse_and_RpcErrorSchema,
  );
}
