import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequest_for_maintenance_windowsSchema,
  JsonRpcResponse_for_Array_of_Range_of_uint64_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RequestOptions, RpcClient } from '../client';

export async function maintenanceWindows(
  client: RpcClient,
  params: ApiParams<'maintenance_windows'>,
  options?: RequestOptions,
): Promise<ApiResponse<'maintenance_windows'>> {
  return client.call(
    'maintenance_windows',
    params,
    JsonRpcRequest_for_maintenance_windowsSchema,
    JsonRpcResponse_for_Array_of_Range_of_uint64_and_RpcErrorSchema,
    options,
  );
}
