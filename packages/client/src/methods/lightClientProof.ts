import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequest_for_light_client_proofSchema,
  JsonRpcResponse_for_RpcLightClientExecutionProofResponse_and_RpcErrorSchema,
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
    JsonRpcRequest_for_light_client_proofSchema,
    JsonRpcResponse_for_RpcLightClientExecutionProofResponse_and_RpcErrorSchema,
    options,
  );
}
