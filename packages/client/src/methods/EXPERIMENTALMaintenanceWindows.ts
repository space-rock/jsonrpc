import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequest_for_EXPERIMENTAL_maintenance_windowsSchema,
  JsonRpcResponse_for_Array_of_Range_of_uint64_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RpcClient } from '../client';

export async function EXPERIMENTALMaintenanceWindows(
  client: RpcClient,
  params: ApiParams<'EXPERIMENTAL_maintenance_windows'>,
): Promise<ApiResponse<'EXPERIMENTAL_maintenance_windows'>> {
  return client.call(
    'EXPERIMENTAL_maintenance_windows',
    params,
    JsonRpcRequest_for_EXPERIMENTAL_maintenance_windowsSchema,
    JsonRpcResponse_for_Array_of_Range_of_uint64_and_RpcErrorSchema,
  );
}
