import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequestForMaintenanceWindowsSchema,
  JsonRpcResponseForArrayOfRangeOfUint64AndRpcErrorSchema,
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
    JsonRpcRequestForMaintenanceWindowsSchema,
    JsonRpcResponseForArrayOfRangeOfUint64AndRpcErrorSchema,
    options,
  );
}
