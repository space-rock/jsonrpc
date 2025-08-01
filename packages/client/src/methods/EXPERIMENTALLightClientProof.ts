import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequest_for_EXPERIMENTAL_light_client_proofSchema,
  JsonRpcResponse_for_RpcLightClientExecutionProofResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RpcClient } from '../client';

export async function EXPERIMENTALLightClientProof(
  client: RpcClient,
  params: ApiParams<'EXPERIMENTAL_light_client_proof'>,
): Promise<ApiResponse<'EXPERIMENTAL_light_client_proof'>> {
  return client.call(
    'EXPERIMENTAL_light_client_proof',
    params,
    JsonRpcRequest_for_EXPERIMENTAL_light_client_proofSchema,
    JsonRpcResponse_for_RpcLightClientExecutionProofResponse_and_RpcErrorSchema,
  );
}
