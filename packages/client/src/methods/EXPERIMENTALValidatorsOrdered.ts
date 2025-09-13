import type { ApiParams, ApiResponse } from '@space-rock/jsonrpc-types';
import {
  JsonRpcRequestForExperimentalValidatorsOrderedSchema,
  JsonRpcResponseForArrayOfValidatorStakeViewAndRpcErrorSchema,
} from '@space-rock/jsonrpc-types';
import type { RequestOptions, RpcClient } from '../client';

export async function EXPERIMENTALValidatorsOrdered(
  client: RpcClient,
  params: ApiParams<'EXPERIMENTAL_validators_ordered'>,
  options?: RequestOptions,
): Promise<ApiResponse<'EXPERIMENTAL_validators_ordered'>> {
  return client.call(
    'EXPERIMENTAL_validators_ordered',
    params,
    JsonRpcRequestForExperimentalValidatorsOrderedSchema,
    JsonRpcResponseForArrayOfValidatorStakeViewAndRpcErrorSchema,
    options,
  );
}
