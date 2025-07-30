import { type RpcClient } from '../client';
import {
  type JsonRpcRequest_for_EXPERIMENTAL_light_client_block_proof,
  type JsonRpcResponse_for_RpcLightClientBlockProofResponse_and_RpcError,
  JsonRpcRequest_for_EXPERIMENTAL_light_client_block_proofSchema,
  JsonRpcResponse_for_RpcLightClientBlockProofResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';

export async function EXPERIMENTALLightClientBlockProof(
  client: RpcClient,
  params: JsonRpcRequest_for_EXPERIMENTAL_light_client_block_proof['params'],
): Promise<JsonRpcResponse_for_RpcLightClientBlockProofResponse_and_RpcError> {
  return await client.call(
    'EXPERIMENTAL_light_client_block_proof',
    params,
    JsonRpcRequest_for_EXPERIMENTAL_light_client_block_proofSchema,
    JsonRpcResponse_for_RpcLightClientBlockProofResponse_and_RpcErrorSchema,
  );
}
