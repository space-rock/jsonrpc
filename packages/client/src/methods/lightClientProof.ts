import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequestForLightClientProofSchema,
  JsonRpcResponseForRpcLightClientExecutionProofResponseAndRpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RequestOptions, RpcClient } from '../client';

export async function lightClientProof(
  client: RpcClient,
  params: ApiParams<'light_client_proof'>,
  options?: RequestOptions,
): Promise<ApiResponse<'light_client_proof'>> {
  return client.call(
    'light_client_proof',
    params,
    JsonRpcRequestForLightClientProofSchema,
    JsonRpcResponseForRpcLightClientExecutionProofResponseAndRpcErrorSchema,
    options,
  );
}
