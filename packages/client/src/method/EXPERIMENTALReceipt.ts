import { type RpcClient } from '../client';
import {
  type JsonRpcRequest_for_EXPERIMENTAL_receipt,
  type JsonRpcResponse_for_RpcReceiptResponse_and_RpcError,
  JsonRpcRequest_for_EXPERIMENTAL_receiptSchema,
  JsonRpcResponse_for_RpcReceiptResponse_and_RpcErrorSchema,
} from '@space-rock/jsonrpc-types';

export async function EXPERIMENTALReceipt(
  client: RpcClient,
  params: JsonRpcRequest_for_EXPERIMENTAL_receipt['params'],
): Promise<JsonRpcResponse_for_RpcReceiptResponse_and_RpcError> {
  return await client.call(
    'EXPERIMENTAL_receipt',
    params,
    JsonRpcRequest_for_EXPERIMENTAL_receiptSchema,
    JsonRpcResponse_for_RpcReceiptResponse_and_RpcErrorSchema,
  );
}
