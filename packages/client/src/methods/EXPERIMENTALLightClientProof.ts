import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequestForExperimentalLightClientProofSchema,
  JsonRpcResponseForRpcLightClientExecutionProofResponseAndRpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RequestOptions, RpcClient } from '../client';

export async function EXPERIMENTALLightClientProof(
  client: RpcClient,
  params: ApiParams<'EXPERIMENTAL_light_client_proof'>,
  options?: RequestOptions,
): Promise<ApiResponse<'EXPERIMENTAL_light_client_proof'>> {
  return client.call(
    'EXPERIMENTAL_light_client_proof',
    params,
    JsonRpcRequestForExperimentalLightClientProofSchema,
    JsonRpcResponseForRpcLightClientExecutionProofResponseAndRpcErrorSchema,
    options,
  );
}
