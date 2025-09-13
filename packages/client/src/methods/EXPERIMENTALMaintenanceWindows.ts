import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequestForExperimentalMaintenanceWindowsSchema,
  JsonRpcResponseForArrayOfRangeOfUint64AndRpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RequestOptions, RpcClient } from '../client';

export async function EXPERIMENTALMaintenanceWindows(
  client: RpcClient,
  params: ApiParams<'EXPERIMENTAL_maintenance_windows'>,
  options?: RequestOptions,
): Promise<ApiResponse<'EXPERIMENTAL_maintenance_windows'>> {
  return client.call(
    'EXPERIMENTAL_maintenance_windows',
    params,
    JsonRpcRequestForExperimentalMaintenanceWindowsSchema,
    JsonRpcResponseForArrayOfRangeOfUint64AndRpcErrorSchema,
    options,
  );
}
