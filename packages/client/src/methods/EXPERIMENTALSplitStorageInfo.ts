import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequestForExperimentalSplitStorageInfoSchema,
  JsonRpcResponseForRpcSplitStorageInfoResponseAndRpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RequestOptions, RpcClient } from '../client';

export async function EXPERIMENTALSplitStorageInfo(
  client: RpcClient,
  params: ApiParams<'EXPERIMENTAL_split_storage_info'>,
  options?: RequestOptions,
): Promise<ApiResponse<'EXPERIMENTAL_split_storage_info'>> {
  return client.call(
    'EXPERIMENTAL_split_storage_info',
    params,
    JsonRpcRequestForExperimentalSplitStorageInfoSchema,
    JsonRpcResponseForRpcSplitStorageInfoResponseAndRpcErrorSchema,
    options,
  );
}
