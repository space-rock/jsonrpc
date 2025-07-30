import { type RpcClient } from '../client';
import {
  type JsonRpcRequest_for_gas_price,
  type JsonRpcResponse_for_RpcGasPriceResponse_and_RpcError,
  JsonRpcRequest_for_gas_priceSchema,
  JsonRpcResponse_for_RpcGasPriceResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';

export async function gasPrice(
  client: RpcClient,
  params: JsonRpcRequest_for_gas_price['params'],
): Promise<JsonRpcResponse_for_RpcGasPriceResponse_and_RpcError> {
  return await client.call(
    'gas_price',
    params,
    JsonRpcRequest_for_gas_priceSchema,
    JsonRpcResponse_for_RpcGasPriceResponse_and_RpcErrorSchema,
  );
}
