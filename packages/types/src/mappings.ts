import { z } from 'zod';
import {
  JsonRpcRequest_for_EXPERIMENTAL_changesSchema,
  JsonRpcResponse_for_RpcStateChangesInBlockResponse_and_RpcErrorSchema,
  JsonRpcRequest_for_EXPERIMENTAL_changes_in_blockSchema,
  JsonRpcResponse_for_RpcStateChangesInBlockByTypeResponse_and_RpcErrorSchema,
  JsonRpcRequest_for_EXPERIMENTAL_congestion_levelSchema,
  JsonRpcResponse_for_RpcCongestionLevelResponse_and_RpcErrorSchema,
  JsonRpcRequest_for_EXPERIMENTAL_genesis_configSchema,
  JsonRpcResponse_for_GenesisConfig_and_RpcErrorSchema,
  JsonRpcRequest_for_EXPERIMENTAL_light_client_block_proofSchema,
  JsonRpcResponse_for_RpcLightClientBlockProofResponse_and_RpcErrorSchema,
  JsonRpcRequest_for_EXPERIMENTAL_light_client_proofSchema,
  JsonRpcResponse_for_RpcLightClientExecutionProofResponse_and_RpcErrorSchema,
  JsonRpcRequest_for_EXPERIMENTAL_maintenance_windowsSchema,
  JsonRpcResponse_for_Array_of_Range_of_uint64_and_RpcErrorSchema,
  JsonRpcRequest_for_EXPERIMENTAL_protocol_configSchema,
  JsonRpcResponse_for_RpcProtocolConfigResponse_and_RpcErrorSchema,
  JsonRpcRequest_for_EXPERIMENTAL_receiptSchema,
  JsonRpcResponse_for_RpcReceiptResponse_and_RpcErrorSchema,
  JsonRpcRequest_for_EXPERIMENTAL_split_storage_infoSchema,
  JsonRpcResponse_for_RpcSplitStorageInfoResponse_and_RpcErrorSchema,
  JsonRpcRequest_for_EXPERIMENTAL_tx_statusSchema,
  JsonRpcResponse_for_RpcTransactionResponse_and_RpcErrorSchema,
  JsonRpcRequest_for_EXPERIMENTAL_validators_orderedSchema,
  JsonRpcResponse_for_Array_of_ValidatorStakeView_and_RpcErrorSchema,
  JsonRpcRequest_for_blockSchema,
  JsonRpcResponse_for_RpcBlockResponse_and_RpcErrorSchema,
  JsonRpcRequest_for_broadcast_tx_asyncSchema,
  JsonRpcResponse_for_CryptoHash_and_RpcErrorSchema,
  JsonRpcRequest_for_broadcast_tx_commitSchema,
  JsonRpcRequest_for_changesSchema,
  JsonRpcRequest_for_chunkSchema,
  JsonRpcResponse_for_RpcChunkResponse_and_RpcErrorSchema,
  JsonRpcRequest_for_client_configSchema,
  JsonRpcResponse_for_RpcClientConfigResponse_and_RpcErrorSchema,
  JsonRpcRequest_for_gas_priceSchema,
  JsonRpcResponse_for_RpcGasPriceResponse_and_RpcErrorSchema,
  JsonRpcRequest_for_healthSchema,
  JsonRpcResponse_for_Nullable_RpcHealthResponse_and_RpcErrorSchema,
  JsonRpcRequest_for_light_client_proofSchema,
  JsonRpcRequest_for_network_infoSchema,
  JsonRpcResponse_for_RpcNetworkInfoResponse_and_RpcErrorSchema,
  JsonRpcRequest_for_next_light_client_blockSchema,
  JsonRpcResponse_for_RpcLightClientNextBlockResponse_and_RpcErrorSchema,
  JsonRpcRequest_for_querySchema,
  JsonRpcResponse_for_RpcQueryResponse_and_RpcErrorSchema,
  JsonRpcRequest_for_send_txSchema,
  JsonRpcRequest_for_statusSchema,
  JsonRpcResponse_for_RpcStatusResponse_and_RpcErrorSchema,
  JsonRpcRequest_for_txSchema,
  JsonRpcRequest_for_validatorsSchema,
  JsonRpcResponse_for_RpcValidatorResponse_and_RpcErrorSchema,
} from './schemas';
import {
  JsonRpcRequest_for_EXPERIMENTAL_changes,
  JsonRpcResponse_for_RpcStateChangesInBlockResponse_and_RpcError,
  JsonRpcRequest_for_EXPERIMENTAL_changes_in_block,
  JsonRpcResponse_for_RpcStateChangesInBlockByTypeResponse_and_RpcError,
  JsonRpcRequest_for_EXPERIMENTAL_congestion_level,
  JsonRpcResponse_for_RpcCongestionLevelResponse_and_RpcError,
  JsonRpcRequest_for_EXPERIMENTAL_genesis_config,
  JsonRpcResponse_for_GenesisConfig_and_RpcError,
  JsonRpcRequest_for_EXPERIMENTAL_light_client_block_proof,
  JsonRpcResponse_for_RpcLightClientBlockProofResponse_and_RpcError,
  JsonRpcRequest_for_EXPERIMENTAL_light_client_proof,
  JsonRpcResponse_for_RpcLightClientExecutionProofResponse_and_RpcError,
  JsonRpcRequest_for_EXPERIMENTAL_maintenance_windows,
  JsonRpcResponse_for_Array_of_Range_of_uint64_and_RpcError,
  JsonRpcRequest_for_EXPERIMENTAL_protocol_config,
  JsonRpcResponse_for_RpcProtocolConfigResponse_and_RpcError,
  JsonRpcRequest_for_EXPERIMENTAL_receipt,
  JsonRpcResponse_for_RpcReceiptResponse_and_RpcError,
  JsonRpcRequest_for_EXPERIMENTAL_split_storage_info,
  JsonRpcResponse_for_RpcSplitStorageInfoResponse_and_RpcError,
  JsonRpcRequest_for_EXPERIMENTAL_tx_status,
  JsonRpcResponse_for_RpcTransactionResponse_and_RpcError,
  JsonRpcRequest_for_EXPERIMENTAL_validators_ordered,
  JsonRpcResponse_for_Array_of_ValidatorStakeView_and_RpcError,
  JsonRpcRequest_for_block,
  JsonRpcResponse_for_RpcBlockResponse_and_RpcError,
  JsonRpcRequest_for_broadcast_tx_async,
  JsonRpcResponse_for_CryptoHash_and_RpcError,
  JsonRpcRequest_for_broadcast_tx_commit,
  JsonRpcRequest_for_changes,
  JsonRpcRequest_for_chunk,
  JsonRpcResponse_for_RpcChunkResponse_and_RpcError,
  JsonRpcRequest_for_client_config,
  JsonRpcResponse_for_RpcClientConfigResponse_and_RpcError,
  JsonRpcRequest_for_gas_price,
  JsonRpcResponse_for_RpcGasPriceResponse_and_RpcError,
  JsonRpcRequest_for_health,
  JsonRpcResponse_for_Nullable_RpcHealthResponse_and_RpcError,
  JsonRpcRequest_for_light_client_proof,
  JsonRpcRequest_for_network_info,
  JsonRpcResponse_for_RpcNetworkInfoResponse_and_RpcError,
  JsonRpcRequest_for_next_light_client_block,
  JsonRpcResponse_for_RpcLightClientNextBlockResponse_and_RpcError,
  JsonRpcRequest_for_query,
  JsonRpcResponse_for_RpcQueryResponse_and_RpcError,
  JsonRpcRequest_for_send_tx,
  JsonRpcRequest_for_status,
  JsonRpcResponse_for_RpcStatusResponse_and_RpcError,
  JsonRpcRequest_for_tx,
  JsonRpcRequest_for_validators,
  JsonRpcResponse_for_RpcValidatorResponse_and_RpcError,
} from './types';

/**
 * This file was auto-generated by a script.
 * Do not make direct changes to the file.
 * Generated at: 2025-07-23T01:20:55.442Z
 */
export type MethodMap = {
  block: {
    request: JsonRpcRequest_for_block;
    response: JsonRpcResponse_for_RpcBlockResponse_and_RpcError;
  };
  broadcast_tx_async: {
    request: JsonRpcRequest_for_broadcast_tx_async;
    response: JsonRpcResponse_for_CryptoHash_and_RpcError;
  };
  broadcast_tx_commit: {
    request: JsonRpcRequest_for_broadcast_tx_commit;
    response: JsonRpcResponse_for_RpcTransactionResponse_and_RpcError;
  };
  changes: {
    request: JsonRpcRequest_for_changes;
    response: JsonRpcResponse_for_RpcStateChangesInBlockResponse_and_RpcError;
  };
  chunk: {
    request: JsonRpcRequest_for_chunk;
    response: JsonRpcResponse_for_RpcChunkResponse_and_RpcError;
  };
  client_config: {
    request: JsonRpcRequest_for_client_config;
    response: JsonRpcResponse_for_RpcClientConfigResponse_and_RpcError;
  };
  EXPERIMENTAL_changes: {
    request: JsonRpcRequest_for_EXPERIMENTAL_changes;
    response: JsonRpcResponse_for_RpcStateChangesInBlockResponse_and_RpcError;
  };
  EXPERIMENTAL_changes_in_block: {
    request: JsonRpcRequest_for_EXPERIMENTAL_changes_in_block;
    response: JsonRpcResponse_for_RpcStateChangesInBlockByTypeResponse_and_RpcError;
  };
  EXPERIMENTAL_congestion_level: {
    request: JsonRpcRequest_for_EXPERIMENTAL_congestion_level;
    response: JsonRpcResponse_for_RpcCongestionLevelResponse_and_RpcError;
  };
  EXPERIMENTAL_genesis_config: {
    request: JsonRpcRequest_for_EXPERIMENTAL_genesis_config;
    response: JsonRpcResponse_for_GenesisConfig_and_RpcError;
  };
  EXPERIMENTAL_light_client_block_proof: {
    request: JsonRpcRequest_for_EXPERIMENTAL_light_client_block_proof;
    response: JsonRpcResponse_for_RpcLightClientBlockProofResponse_and_RpcError;
  };
  EXPERIMENTAL_light_client_proof: {
    request: JsonRpcRequest_for_EXPERIMENTAL_light_client_proof;
    response: JsonRpcResponse_for_RpcLightClientExecutionProofResponse_and_RpcError;
  };
  EXPERIMENTAL_maintenance_windows: {
    request: JsonRpcRequest_for_EXPERIMENTAL_maintenance_windows;
    response: JsonRpcResponse_for_Array_of_Range_of_uint64_and_RpcError;
  };
  EXPERIMENTAL_protocol_config: {
    request: JsonRpcRequest_for_EXPERIMENTAL_protocol_config;
    response: JsonRpcResponse_for_RpcProtocolConfigResponse_and_RpcError;
  };
  EXPERIMENTAL_receipt: {
    request: JsonRpcRequest_for_EXPERIMENTAL_receipt;
    response: JsonRpcResponse_for_RpcReceiptResponse_and_RpcError;
  };
  EXPERIMENTAL_split_storage_info: {
    request: JsonRpcRequest_for_EXPERIMENTAL_split_storage_info;
    response: JsonRpcResponse_for_RpcSplitStorageInfoResponse_and_RpcError;
  };
  EXPERIMENTAL_tx_status: {
    request: JsonRpcRequest_for_EXPERIMENTAL_tx_status;
    response: JsonRpcResponse_for_RpcTransactionResponse_and_RpcError;
  };
  EXPERIMENTAL_validators_ordered: {
    request: JsonRpcRequest_for_EXPERIMENTAL_validators_ordered;
    response: JsonRpcResponse_for_Array_of_ValidatorStakeView_and_RpcError;
  };
  gas_price: {
    request: JsonRpcRequest_for_gas_price;
    response: JsonRpcResponse_for_RpcGasPriceResponse_and_RpcError;
  };
  health: {
    request: JsonRpcRequest_for_health;
    response: JsonRpcResponse_for_Nullable_RpcHealthResponse_and_RpcError;
  };
  light_client_proof: {
    request: JsonRpcRequest_for_light_client_proof;
    response: JsonRpcResponse_for_RpcLightClientExecutionProofResponse_and_RpcError;
  };
  network_info: {
    request: JsonRpcRequest_for_network_info;
    response: JsonRpcResponse_for_RpcNetworkInfoResponse_and_RpcError;
  };
  next_light_client_block: {
    request: JsonRpcRequest_for_next_light_client_block;
    response: JsonRpcResponse_for_RpcLightClientNextBlockResponse_and_RpcError;
  };
  query: {
    request: JsonRpcRequest_for_query;
    response: JsonRpcResponse_for_RpcQueryResponse_and_RpcError;
  };
  send_tx: {
    request: JsonRpcRequest_for_send_tx;
    response: JsonRpcResponse_for_RpcTransactionResponse_and_RpcError;
  };
  status: {
    request: JsonRpcRequest_for_status;
    response: JsonRpcResponse_for_RpcStatusResponse_and_RpcError;
  };
  tx: {
    request: JsonRpcRequest_for_tx;
    response: JsonRpcResponse_for_RpcTransactionResponse_and_RpcError;
  };
  validators: {
    request: JsonRpcRequest_for_validators;
    response: JsonRpcResponse_for_RpcValidatorResponse_and_RpcError;
  };
};
export type RpcMethod = keyof MethodMap;
export type ApiRequest<M extends RpcMethod> = MethodMap[M]['request'];
export type ApiResponse<M extends RpcMethod> = MethodMap[M]['response'];

export const methodSchemas = {
  block: {
    request: JsonRpcRequest_for_blockSchema,
    response: JsonRpcResponse_for_RpcBlockResponse_and_RpcErrorSchema,
  },
  broadcast_tx_async: {
    request: JsonRpcRequest_for_broadcast_tx_asyncSchema,
    response: JsonRpcResponse_for_CryptoHash_and_RpcErrorSchema,
  },
  broadcast_tx_commit: {
    request: JsonRpcRequest_for_broadcast_tx_commitSchema,
    response: JsonRpcResponse_for_RpcTransactionResponse_and_RpcErrorSchema,
  },
  changes: {
    request: JsonRpcRequest_for_changesSchema,
    response:
      JsonRpcResponse_for_RpcStateChangesInBlockResponse_and_RpcErrorSchema,
  },
  chunk: {
    request: JsonRpcRequest_for_chunkSchema,
    response: JsonRpcResponse_for_RpcChunkResponse_and_RpcErrorSchema,
  },
  client_config: {
    request: JsonRpcRequest_for_client_configSchema,
    response: JsonRpcResponse_for_RpcClientConfigResponse_and_RpcErrorSchema,
  },
  EXPERIMENTAL_changes: {
    request: JsonRpcRequest_for_EXPERIMENTAL_changesSchema,
    response:
      JsonRpcResponse_for_RpcStateChangesInBlockResponse_and_RpcErrorSchema,
  },
  EXPERIMENTAL_changes_in_block: {
    request: JsonRpcRequest_for_EXPERIMENTAL_changes_in_blockSchema,
    response:
      JsonRpcResponse_for_RpcStateChangesInBlockByTypeResponse_and_RpcErrorSchema,
  },
  EXPERIMENTAL_congestion_level: {
    request: JsonRpcRequest_for_EXPERIMENTAL_congestion_levelSchema,
    response: JsonRpcResponse_for_RpcCongestionLevelResponse_and_RpcErrorSchema,
  },
  EXPERIMENTAL_genesis_config: {
    request: JsonRpcRequest_for_EXPERIMENTAL_genesis_configSchema,
    response: JsonRpcResponse_for_GenesisConfig_and_RpcErrorSchema,
  },
  EXPERIMENTAL_light_client_block_proof: {
    request: JsonRpcRequest_for_EXPERIMENTAL_light_client_block_proofSchema,
    response:
      JsonRpcResponse_for_RpcLightClientBlockProofResponse_and_RpcErrorSchema,
  },
  EXPERIMENTAL_light_client_proof: {
    request: JsonRpcRequest_for_EXPERIMENTAL_light_client_proofSchema,
    response:
      JsonRpcResponse_for_RpcLightClientExecutionProofResponse_and_RpcErrorSchema,
  },
  EXPERIMENTAL_maintenance_windows: {
    request: JsonRpcRequest_for_EXPERIMENTAL_maintenance_windowsSchema,
    response: JsonRpcResponse_for_Array_of_Range_of_uint64_and_RpcErrorSchema,
  },
  EXPERIMENTAL_protocol_config: {
    request: JsonRpcRequest_for_EXPERIMENTAL_protocol_configSchema,
    response: JsonRpcResponse_for_RpcProtocolConfigResponse_and_RpcErrorSchema,
  },
  EXPERIMENTAL_receipt: {
    request: JsonRpcRequest_for_EXPERIMENTAL_receiptSchema,
    response: JsonRpcResponse_for_RpcReceiptResponse_and_RpcErrorSchema,
  },
  EXPERIMENTAL_split_storage_info: {
    request: JsonRpcRequest_for_EXPERIMENTAL_split_storage_infoSchema,
    response:
      JsonRpcResponse_for_RpcSplitStorageInfoResponse_and_RpcErrorSchema,
  },
  EXPERIMENTAL_tx_status: {
    request: JsonRpcRequest_for_EXPERIMENTAL_tx_statusSchema,
    response: JsonRpcResponse_for_RpcTransactionResponse_and_RpcErrorSchema,
  },
  EXPERIMENTAL_validators_ordered: {
    request: JsonRpcRequest_for_EXPERIMENTAL_validators_orderedSchema,
    response:
      JsonRpcResponse_for_Array_of_ValidatorStakeView_and_RpcErrorSchema,
  },
  gas_price: {
    request: JsonRpcRequest_for_gas_priceSchema,
    response: JsonRpcResponse_for_RpcGasPriceResponse_and_RpcErrorSchema,
  },
  health: {
    request: JsonRpcRequest_for_healthSchema,
    response: JsonRpcResponse_for_Nullable_RpcHealthResponse_and_RpcErrorSchema,
  },
  light_client_proof: {
    request: JsonRpcRequest_for_light_client_proofSchema,
    response:
      JsonRpcResponse_for_RpcLightClientExecutionProofResponse_and_RpcErrorSchema,
  },
  network_info: {
    request: JsonRpcRequest_for_network_infoSchema,
    response: JsonRpcResponse_for_RpcNetworkInfoResponse_and_RpcErrorSchema,
  },
  next_light_client_block: {
    request: JsonRpcRequest_for_next_light_client_blockSchema,
    response:
      JsonRpcResponse_for_RpcLightClientNextBlockResponse_and_RpcErrorSchema,
  },
  query: {
    request: JsonRpcRequest_for_querySchema,
    response: JsonRpcResponse_for_RpcQueryResponse_and_RpcErrorSchema,
  },
  send_tx: {
    request: JsonRpcRequest_for_send_txSchema,
    response: JsonRpcResponse_for_RpcTransactionResponse_and_RpcErrorSchema,
  },
  status: {
    request: JsonRpcRequest_for_statusSchema,
    response: JsonRpcResponse_for_RpcStatusResponse_and_RpcErrorSchema,
  },
  tx: {
    request: JsonRpcRequest_for_txSchema,
    response: JsonRpcResponse_for_RpcTransactionResponse_and_RpcErrorSchema,
  },
  validators: {
    request: JsonRpcRequest_for_validatorsSchema,
    response: JsonRpcResponse_for_RpcValidatorResponse_and_RpcErrorSchema,
  },
} as const;

export function getRequestSchema(method: string): z.ZodSchema | undefined {
  return methodSchemas[method as keyof typeof methodSchemas]?.request;
}

export function getResponseSchema(method: string): z.ZodSchema | undefined {
  return methodSchemas[method as keyof typeof methodSchemas]?.response;
}
