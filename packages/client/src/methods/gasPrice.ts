import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequest_for_gas_priceSchema,
  JsonRpcResponse_for_RpcGasPriceResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RequestOptions, RpcClient } from '../client';

export async function gasPrice(
  client: RpcClient,
  params: ApiParams<'gas_price'>,
  options?: RequestOptions,
): Promise<ApiResponse<'gas_price'>> {
  return client.call(
    'gas_price',
    params,
    JsonRpcRequest_for_gas_priceSchema,
    JsonRpcResponse_for_RpcGasPriceResponse_and_RpcErrorSchema,
    options,
  );
}
