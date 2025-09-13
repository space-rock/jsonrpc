import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequestForGasPriceSchema,
  JsonRpcResponseForRpcGasPriceResponseAndRpcErrorSchema,
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
    JsonRpcRequestForGasPriceSchema,
    JsonRpcResponseForRpcGasPriceResponseAndRpcErrorSchema,
    options,
  );
}
