import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequest_for_EXPERIMENTAL_light_client_block_proofSchema,
  JsonRpcResponse_for_RpcLightClientBlockProofResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RequestOptions, RpcClient } from '../client';

export async function EXPERIMENTALLightClientBlockProof(
  client: RpcClient,
  params: ApiParams<'EXPERIMENTAL_light_client_block_proof'>,
  options?: RequestOptions,
): Promise<ApiResponse<'EXPERIMENTAL_light_client_block_proof'>> {
  return client.call(
    'EXPERIMENTAL_light_client_block_proof',
    params,
    JsonRpcRequest_for_EXPERIMENTAL_light_client_block_proofSchema,
    JsonRpcResponse_for_RpcLightClientBlockProofResponse_and_RpcErrorSchema,
    options,
  );
}
