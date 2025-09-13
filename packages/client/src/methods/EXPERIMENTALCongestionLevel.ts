import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequestForExperimentalCongestionLevelSchema,
  JsonRpcResponseForRpcCongestionLevelResponseAndRpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RequestOptions, RpcClient } from '../client';

export async function EXPERIMENTALCongestionLevel(
  client: RpcClient,
  params: ApiParams<'EXPERIMENTAL_congestion_level'>,
  options?: RequestOptions,
): Promise<ApiResponse<'EXPERIMENTAL_congestion_level'>> {
  return client.call(
    'EXPERIMENTAL_congestion_level',
    params,
    JsonRpcRequestForExperimentalCongestionLevelSchema,
    JsonRpcResponseForRpcCongestionLevelResponseAndRpcErrorSchema,
    options,
  );
}
