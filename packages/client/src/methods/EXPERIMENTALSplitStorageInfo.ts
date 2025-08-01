import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequest_for_EXPERIMENTAL_split_storage_infoSchema,
  JsonRpcResponse_for_RpcSplitStorageInfoResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RpcClient } from '../client';

export async function EXPERIMENTALSplitStorageInfo(
  client: RpcClient,
  params: ApiParams<'EXPERIMENTAL_split_storage_info'>,
): Promise<ApiResponse<'EXPERIMENTAL_split_storage_info'>> {
  return client.call(
    'EXPERIMENTAL_split_storage_info',
    params,
    JsonRpcRequest_for_EXPERIMENTAL_split_storage_infoSchema,
    JsonRpcResponse_for_RpcSplitStorageInfoResponse_and_RpcErrorSchema,
  );
}
