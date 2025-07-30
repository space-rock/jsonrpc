import { type RpcClient } from '../client';
import {
  type JsonRpcRequest_for_EXPERIMENTAL_maintenance_windows,
  type JsonRpcResponse_for_Array_of_Range_of_uint64_and_RpcError,
  JsonRpcRequest_for_EXPERIMENTAL_maintenance_windowsSchema,
  JsonRpcResponse_for_Array_of_Range_of_uint64_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';

export async function EXPERIMENTALMaintenanceWindows(
  client: RpcClient,
  params: JsonRpcRequest_for_EXPERIMENTAL_maintenance_windows['params'],
): Promise<JsonRpcResponse_for_Array_of_Range_of_uint64_and_RpcError> {
  return await client.call(
    'EXPERIMENTAL_maintenance_windows',
    params,
    JsonRpcRequest_for_EXPERIMENTAL_maintenance_windowsSchema,
    JsonRpcResponse_for_Array_of_Range_of_uint64_and_RpcErrorSchema,
  );
}
