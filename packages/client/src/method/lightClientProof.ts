import { type RpcClient } from '../client';
import {
  type JsonRpcRequest_for_light_client_proof,
  type JsonRpcResponse_for_RpcLightClientExecutionProofResponse_and_RpcError,
  JsonRpcRequest_for_light_client_proofSchema,
  JsonRpcResponse_for_RpcLightClientExecutionProofResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';

export async function lightClientProof(
  client: RpcClient,
  params: JsonRpcRequest_for_light_client_proof['params'],
): Promise<JsonRpcResponse_for_RpcLightClientExecutionProofResponse_and_RpcError> {
  return await client.call(
    'light_client_proof',
    params,
    JsonRpcRequest_for_light_client_proofSchema,
    JsonRpcResponse_for_RpcLightClientExecutionProofResponse_and_RpcErrorSchema,
  );
}
