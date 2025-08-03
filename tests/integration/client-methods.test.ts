/**
 * Integration tests for all client method functions.
 * Tests that each method function correctly calls the client.
 * This file was auto-generated - do not edit manually.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createRpcClient } from '@space-rock/jsonrpc-client';
import {
  // Import all method functions
  EXPERIMENTALChanges,
  EXPERIMENTALChangesInBlock,
  EXPERIMENTALCongestionLevel,
  EXPERIMENTALGenesisConfig,
  EXPERIMENTALLightClientBlockProof,
  EXPERIMENTALLightClientProof,
  EXPERIMENTALMaintenanceWindows,
  EXPERIMENTALProtocolConfig,
  EXPERIMENTALReceipt,
  EXPERIMENTALSplitStorageInfo,
  EXPERIMENTALTxStatus,
  EXPERIMENTALValidatorsOrdered,
  block,
  blockEffects,
  broadcastTxAsync,
  broadcastTxCommit,
  changes,
  chunk,
  clientConfig,
  gasPrice,
  genesisConfig,
  health,
  lightClientProof,
  maintenanceWindows,
  networkInfo,
  nextLightClientBlock,
  query,
  sendTx,
  status,
  tx,
  validators,
} from '@space-rock/jsonrpc-client/methods';
import { generateMockParams, generateMockResponse } from '../test-utils';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('Client Method Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call EXPERIMENTALChanges method correctly', async () => {
    const mockResult = generateMockResponse('EXPERIMENTAL_changes');
    const mockResponse = {
      jsonrpc: '2.0',
      id: 'test-id',
      result: mockResult,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const client = createRpcClient('https://api.example.com');
    const mockParams = generateMockParams('EXPERIMENTAL_changes');

    const result = await EXPERIMENTALChanges(client, mockParams);
    expect(result).toBeDefined();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should call EXPERIMENTALChangesInBlock method correctly', async () => {
    const mockResult = generateMockResponse('EXPERIMENTAL_changes_in_block');
    const mockResponse = {
      jsonrpc: '2.0',
      id: 'test-id',
      result: mockResult,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const client = createRpcClient('https://api.example.com');
    const mockParams = generateMockParams('EXPERIMENTAL_changes_in_block');

    const result = await EXPERIMENTALChangesInBlock(client, mockParams);
    expect(result).toBeDefined();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should call EXPERIMENTALCongestionLevel method correctly', async () => {
    const mockResult = generateMockResponse('EXPERIMENTAL_congestion_level');
    const mockResponse = {
      jsonrpc: '2.0',
      id: 'test-id',
      result: mockResult,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const client = createRpcClient('https://api.example.com');
    const mockParams = generateMockParams('EXPERIMENTAL_congestion_level');

    const result = await EXPERIMENTALCongestionLevel(client, mockParams);
    expect(result).toBeDefined();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should call EXPERIMENTALGenesisConfig method correctly', async () => {
    const mockResult = generateMockResponse('EXPERIMENTAL_genesis_config');
    const mockResponse = {
      jsonrpc: '2.0',
      id: 'test-id',
      result: mockResult,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const client = createRpcClient('https://api.example.com');
    const mockParams = generateMockParams('EXPERIMENTAL_genesis_config');

    const result = await EXPERIMENTALGenesisConfig(client, mockParams);
    expect(result).toBeDefined();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should call EXPERIMENTALLightClientBlockProof method correctly', async () => {
    const mockResult = generateMockResponse(
      'EXPERIMENTAL_light_client_block_proof',
    );
    const mockResponse = {
      jsonrpc: '2.0',
      id: 'test-id',
      result: mockResult,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const client = createRpcClient('https://api.example.com');
    const mockParams = generateMockParams(
      'EXPERIMENTAL_light_client_block_proof',
    );

    const result = await EXPERIMENTALLightClientBlockProof(client, mockParams);
    expect(result).toBeDefined();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should call EXPERIMENTALLightClientProof method correctly', async () => {
    const mockResult = generateMockResponse('EXPERIMENTAL_light_client_proof');
    const mockResponse = {
      jsonrpc: '2.0',
      id: 'test-id',
      result: mockResult,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const client = createRpcClient('https://api.example.com');
    const mockParams = generateMockParams('EXPERIMENTAL_light_client_proof');

    const result = await EXPERIMENTALLightClientProof(client, mockParams);
    expect(result).toBeDefined();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should call EXPERIMENTALMaintenanceWindows method correctly', async () => {
    const mockResult = generateMockResponse('EXPERIMENTAL_maintenance_windows');
    const mockResponse = {
      jsonrpc: '2.0',
      id: 'test-id',
      result: mockResult,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const client = createRpcClient('https://api.example.com');
    const mockParams = generateMockParams('EXPERIMENTAL_maintenance_windows');

    const result = await EXPERIMENTALMaintenanceWindows(client, mockParams);
    expect(result).toBeDefined();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should call EXPERIMENTALProtocolConfig method correctly', async () => {
    const mockResult = generateMockResponse('EXPERIMENTAL_protocol_config');
    const mockResponse = {
      jsonrpc: '2.0',
      id: 'test-id',
      result: mockResult,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const client = createRpcClient('https://api.example.com');
    const mockParams = generateMockParams('EXPERIMENTAL_protocol_config');

    const result = await EXPERIMENTALProtocolConfig(client, mockParams);
    expect(result).toBeDefined();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should call EXPERIMENTALReceipt method correctly', async () => {
    const mockResult = generateMockResponse('EXPERIMENTAL_receipt');
    const mockResponse = {
      jsonrpc: '2.0',
      id: 'test-id',
      result: mockResult,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const client = createRpcClient('https://api.example.com');
    const mockParams = generateMockParams('EXPERIMENTAL_receipt');

    const result = await EXPERIMENTALReceipt(client, mockParams);
    expect(result).toBeDefined();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should call EXPERIMENTALSplitStorageInfo method correctly', async () => {
    const mockResult = generateMockResponse('EXPERIMENTAL_split_storage_info');
    const mockResponse = {
      jsonrpc: '2.0',
      id: 'test-id',
      result: mockResult,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const client = createRpcClient('https://api.example.com');
    const mockParams = generateMockParams('EXPERIMENTAL_split_storage_info');

    const result = await EXPERIMENTALSplitStorageInfo(client, mockParams);
    expect(result).toBeDefined();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should call EXPERIMENTALTxStatus method correctly', async () => {
    const mockResult = generateMockResponse('EXPERIMENTAL_tx_status');
    const mockResponse = {
      jsonrpc: '2.0',
      id: 'test-id',
      result: mockResult,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const client = createRpcClient('https://api.example.com');
    const mockParams = generateMockParams('EXPERIMENTAL_tx_status');

    const result = await EXPERIMENTALTxStatus(client, mockParams);
    expect(result).toBeDefined();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should call EXPERIMENTALValidatorsOrdered method correctly', async () => {
    const mockResult = generateMockResponse('EXPERIMENTAL_validators_ordered');
    const mockResponse = {
      jsonrpc: '2.0',
      id: 'test-id',
      result: mockResult,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const client = createRpcClient('https://api.example.com');
    const mockParams = generateMockParams('EXPERIMENTAL_validators_ordered');

    const result = await EXPERIMENTALValidatorsOrdered(client, mockParams);
    expect(result).toBeDefined();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should call block method correctly', async () => {
    const mockResult = generateMockResponse('block');
    const mockResponse = {
      jsonrpc: '2.0',
      id: 'test-id',
      result: mockResult,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const client = createRpcClient('https://api.example.com');
    const mockParams = generateMockParams('block');

    const result = await block(client, mockParams);
    expect(result).toBeDefined();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should call blockEffects method correctly', async () => {
    const mockResult = generateMockResponse('block_effects');
    const mockResponse = {
      jsonrpc: '2.0',
      id: 'test-id',
      result: mockResult,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const client = createRpcClient('https://api.example.com');
    const mockParams = generateMockParams('block_effects');

    const result = await blockEffects(client, mockParams);
    expect(result).toBeDefined();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should call broadcastTxAsync method correctly', async () => {
    const mockResult = generateMockResponse('broadcast_tx_async');
    const mockResponse = {
      jsonrpc: '2.0',
      id: 'test-id',
      result: mockResult,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const client = createRpcClient('https://api.example.com');
    const mockParams = generateMockParams('broadcast_tx_async');

    const result = await broadcastTxAsync(client, mockParams);
    expect(result).toBeDefined();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should call broadcastTxCommit method correctly', async () => {
    const mockResult = generateMockResponse('broadcast_tx_commit');
    const mockResponse = {
      jsonrpc: '2.0',
      id: 'test-id',
      result: mockResult,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const client = createRpcClient('https://api.example.com');
    const mockParams = generateMockParams('broadcast_tx_commit');

    const result = await broadcastTxCommit(client, mockParams);
    expect(result).toBeDefined();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should call changes method correctly', async () => {
    const mockResult = generateMockResponse('changes');
    const mockResponse = {
      jsonrpc: '2.0',
      id: 'test-id',
      result: mockResult,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const client = createRpcClient('https://api.example.com');
    const mockParams = generateMockParams('changes');

    const result = await changes(client, mockParams);
    expect(result).toBeDefined();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should call chunk method correctly', async () => {
    const mockResult = generateMockResponse('chunk');
    const mockResponse = {
      jsonrpc: '2.0',
      id: 'test-id',
      result: mockResult,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const client = createRpcClient('https://api.example.com');
    const mockParams = generateMockParams('chunk');

    const result = await chunk(client, mockParams);
    expect(result).toBeDefined();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should call clientConfig method correctly', async () => {
    const mockResult = generateMockResponse('client_config');
    const mockResponse = {
      jsonrpc: '2.0',
      id: 'test-id',
      result: mockResult,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const client = createRpcClient('https://api.example.com');
    const mockParams = generateMockParams('client_config');

    const result = await clientConfig(client, mockParams);
    expect(result).toBeDefined();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should call gasPrice method correctly', async () => {
    const mockResult = generateMockResponse('gas_price');
    const mockResponse = {
      jsonrpc: '2.0',
      id: 'test-id',
      result: mockResult,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const client = createRpcClient('https://api.example.com');
    const mockParams = generateMockParams('gas_price');

    const result = await gasPrice(client, mockParams);
    expect(result).toBeDefined();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should call genesisConfig method correctly', async () => {
    const mockResult = generateMockResponse('genesis_config');
    const mockResponse = {
      jsonrpc: '2.0',
      id: 'test-id',
      result: mockResult,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const client = createRpcClient('https://api.example.com');
    const mockParams = generateMockParams('genesis_config');

    const result = await genesisConfig(client, mockParams);
    expect(result).toBeDefined();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should call health method correctly', async () => {
    const mockResult = generateMockResponse('health');
    const mockResponse = {
      jsonrpc: '2.0',
      id: 'test-id',
      result: mockResult,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const client = createRpcClient('https://api.example.com');
    const mockParams = generateMockParams('health');

    const result = await health(client, mockParams);
    expect(result).toBeDefined();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should call lightClientProof method correctly', async () => {
    const mockResult = generateMockResponse('light_client_proof');
    const mockResponse = {
      jsonrpc: '2.0',
      id: 'test-id',
      result: mockResult,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const client = createRpcClient('https://api.example.com');
    const mockParams = generateMockParams('light_client_proof');

    const result = await lightClientProof(client, mockParams);
    expect(result).toBeDefined();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should call maintenanceWindows method correctly', async () => {
    const mockResult = generateMockResponse('maintenance_windows');
    const mockResponse = {
      jsonrpc: '2.0',
      id: 'test-id',
      result: mockResult,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const client = createRpcClient('https://api.example.com');
    const mockParams = generateMockParams('maintenance_windows');

    const result = await maintenanceWindows(client, mockParams);
    expect(result).toBeDefined();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should call networkInfo method correctly', async () => {
    const mockResult = generateMockResponse('network_info');
    const mockResponse = {
      jsonrpc: '2.0',
      id: 'test-id',
      result: mockResult,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const client = createRpcClient('https://api.example.com');
    const mockParams = generateMockParams('network_info');

    const result = await networkInfo(client, mockParams);
    expect(result).toBeDefined();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should call nextLightClientBlock method correctly', async () => {
    const mockResult = generateMockResponse('next_light_client_block');
    const mockResponse = {
      jsonrpc: '2.0',
      id: 'test-id',
      result: mockResult,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const client = createRpcClient('https://api.example.com');
    const mockParams = generateMockParams('next_light_client_block');

    const result = await nextLightClientBlock(client, mockParams);
    expect(result).toBeDefined();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should call query method correctly', async () => {
    const mockResult = generateMockResponse('query');
    const mockResponse = {
      jsonrpc: '2.0',
      id: 'test-id',
      result: mockResult,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const client = createRpcClient('https://api.example.com');
    const mockParams = generateMockParams('query');

    const result = await query(client, mockParams);
    expect(result).toBeDefined();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should call sendTx method correctly', async () => {
    const mockResult = generateMockResponse('send_tx');
    const mockResponse = {
      jsonrpc: '2.0',
      id: 'test-id',
      result: mockResult,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const client = createRpcClient('https://api.example.com');
    const mockParams = generateMockParams('send_tx');

    const result = await sendTx(client, mockParams);
    expect(result).toBeDefined();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should call status method correctly', async () => {
    const mockResult = generateMockResponse('status');
    const mockResponse = {
      jsonrpc: '2.0',
      id: 'test-id',
      result: mockResult,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const client = createRpcClient('https://api.example.com');
    const mockParams = generateMockParams('status');

    const result = await status(client, mockParams);
    expect(result).toBeDefined();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should call tx method correctly', async () => {
    const mockResult = generateMockResponse('tx');
    const mockResponse = {
      jsonrpc: '2.0',
      id: 'test-id',
      result: mockResult,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const client = createRpcClient('https://api.example.com');
    const mockParams = generateMockParams('tx');

    const result = await tx(client, mockParams);
    expect(result).toBeDefined();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should call validators method correctly', async () => {
    const mockResult = generateMockResponse('validators');
    const mockResponse = {
      jsonrpc: '2.0',
      id: 'test-id',
      result: mockResult,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const client = createRpcClient('https://api.example.com');
    const mockParams = generateMockParams('validators');

    const result = await validators(client, mockParams);
    expect(result).toBeDefined();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
