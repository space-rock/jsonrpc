import { type RpcClient } from '../client';
import {
  type JsonRpcRequest_for_EXPERIMENTAL_genesis_config,
  type JsonRpcResponse_for_GenesisConfig_and_RpcError,
  JsonRpcRequest_for_EXPERIMENTAL_genesis_configSchema,
  JsonRpcResponse_for_GenesisConfig_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';

export async function EXPERIMENTALGenesisConfig(
  client: RpcClient,
  params: JsonRpcRequest_for_EXPERIMENTAL_genesis_config['params'],
): Promise<JsonRpcResponse_for_GenesisConfig_and_RpcError> {
  return await client.call(
    'EXPERIMENTAL_genesis_config',
    params,
    JsonRpcRequest_for_EXPERIMENTAL_genesis_configSchema,
    JsonRpcResponse_for_GenesisConfig_and_RpcErrorSchema,
  );
}
