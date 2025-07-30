import { type RpcClient } from '../client';
import {
  type JsonRpcRequest_for_EXPERIMENTAL_split_storage_info,
  type JsonRpcResponse_for_RpcSplitStorageInfoResponse_and_RpcError,
  JsonRpcRequest_for_EXPERIMENTAL_split_storage_infoSchema,
  JsonRpcResponse_for_RpcSplitStorageInfoResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';

export async function EXPERIMENTALSplitStorageInfo(
  client: RpcClient,
  params: JsonRpcRequest_for_EXPERIMENTAL_split_storage_info['params'],
): Promise<JsonRpcResponse_for_RpcSplitStorageInfoResponse_and_RpcError> {
  return await client.call(
    'EXPERIMENTAL_split_storage_info',
    params,
    JsonRpcRequest_for_EXPERIMENTAL_split_storage_infoSchema,
    JsonRpcResponse_for_RpcSplitStorageInfoResponse_and_RpcErrorSchema,
  );
}
