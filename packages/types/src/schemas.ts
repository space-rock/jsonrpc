/**
 * This file was auto-generated from TypeScript types.
 * Do not make direct changes to the file.
 */
import * as v from 'valibot';
import type * as t from './types';

export const AccessKeySchema: v.GenericSchema<t.AccessKey> = v.lazy(() =>
  v.object({
    nonce: v.number(),
    permission: AccessKeyPermissionSchema,
  }),
);

export const AccessKeyCreationConfigViewSchema: v.GenericSchema<t.AccessKeyCreationConfigView> =
  v.lazy(() =>
    v.object({
      fullAccessCost: FeeSchema,
      functionCallCost: FeeSchema,
      functionCallCostPerByte: FeeSchema,
    }),
  );

export const AccessKeyInfoViewSchema: v.GenericSchema<t.AccessKeyInfoView> =
  v.lazy(() =>
    v.object({
      accessKey: AccessKeyViewSchema,
      publicKey: PublicKeySchema,
    }),
  );

export const AccessKeyListSchema: v.GenericSchema<t.AccessKeyList> = v.lazy(
  () =>
    v.object({
      keys: v.array(AccessKeyInfoViewSchema),
    }),
);

export const AccessKeyPermissionSchema: v.GenericSchema<t.AccessKeyPermission> =
  v.lazy(() =>
    v.union([
      v.object({
        FunctionCall: FunctionCallPermissionSchema,
      }),
      v.literal('FullAccess'),
    ]),
  );

export const AccessKeyPermissionViewSchema: v.GenericSchema<t.AccessKeyPermissionView> =
  v.lazy(() =>
    v.union([
      v.literal('FullAccess'),
      v.object({
        FunctionCall: v.object({
          allowance: v.optional(v.union([v.string(), v.null()])),
          methodNames: v.array(v.string()),
          receiverId: v.string(),
        }),
      }),
    ]),
  );

export const AccessKeyViewSchema: v.GenericSchema<t.AccessKeyView> = v.lazy(
  () =>
    v.object({
      nonce: v.number(),
      permission: AccessKeyPermissionViewSchema,
    }),
);

export const AccountCreationConfigViewSchema: v.GenericSchema<t.AccountCreationConfigView> =
  v.lazy(() =>
    v.object({
      minAllowedTopLevelAccountLength: v.number(),
      registrarAccountId: AccountIdSchema,
    }),
  );

export const AccountDataViewSchema: v.GenericSchema<t.AccountDataView> = v.lazy(
  () =>
    v.object({
      accountKey: PublicKeySchema,
      peerId: PublicKeySchema,
      proxies: v.array(Tier1ProxyViewSchema),
      timestamp: v.string(),
    }),
);

export const AccountIdSchema: v.GenericSchema<t.AccountId> = v.lazy(() =>
  v.string(),
);

export const AccountIdValidityRulesVersionSchema: v.GenericSchema<t.AccountIdValidityRulesVersion> =
  v.lazy(() => v.number());

export const AccountInfoSchema: v.GenericSchema<t.AccountInfo> = v.lazy(() =>
  v.object({
    accountId: AccountIdSchema,
    amount: v.string(),
    publicKey: PublicKeySchema,
  }),
);

export const AccountViewSchema: v.GenericSchema<t.AccountView> = v.lazy(() =>
  v.object({
    amount: v.string(),
    codeHash: CryptoHashSchema,
    globalContractAccountId: v.optional(v.union([AccountIdSchema, v.null()])),
    globalContractHash: v.optional(v.union([CryptoHashSchema, v.null()])),
    locked: v.string(),
    storagePaidAt: v.number(),
    storageUsage: v.number(),
  }),
);

export const AccountWithPublicKeySchema: v.GenericSchema<t.AccountWithPublicKey> =
  v.lazy(() =>
    v.object({
      accountId: AccountIdSchema,
      publicKey: PublicKeySchema,
    }),
  );

export const ActionSchema: v.GenericSchema<t.Action> = v.lazy(() =>
  v.union([
    v.object({
      CreateAccount: CreateAccountActionSchema,
    }),
    v.object({
      DeployContract: DeployContractActionSchema,
    }),
    v.object({
      FunctionCall: FunctionCallActionSchema,
    }),
    v.object({
      Transfer: TransferActionSchema,
    }),
    v.object({
      Stake: StakeActionSchema,
    }),
    v.object({
      AddKey: AddKeyActionSchema,
    }),
    v.object({
      DeleteKey: DeleteKeyActionSchema,
    }),
    v.object({
      DeleteAccount: DeleteAccountActionSchema,
    }),
    v.object({
      Delegate: SignedDelegateActionSchema,
    }),
    v.object({
      DeployGlobalContract: DeployGlobalContractActionSchema,
    }),
    v.object({
      UseGlobalContract: UseGlobalContractActionSchema,
    }),
  ]),
);

export const ActionCreationConfigViewSchema: v.GenericSchema<t.ActionCreationConfigView> =
  v.lazy(() =>
    v.object({
      addKeyCost: AccessKeyCreationConfigViewSchema,
      createAccountCost: FeeSchema,
      delegateCost: FeeSchema,
      deleteAccountCost: FeeSchema,
      deleteKeyCost: FeeSchema,
      deployContractCost: FeeSchema,
      deployContractCostPerByte: FeeSchema,
      functionCallCost: FeeSchema,
      functionCallCostPerByte: FeeSchema,
      stakeCost: FeeSchema,
      transferCost: FeeSchema,
    }),
  );

export const ActionErrorSchema: v.GenericSchema<t.ActionError> = v.lazy(() =>
  v.object({
    index: v.optional(v.union([v.number(), v.null()])),
    kind: ActionErrorKindSchema,
  }),
);

export const ActionErrorKindSchema: v.GenericSchema<t.ActionErrorKind> = v.lazy(
  () =>
    v.union([
      v.object({
        AccountAlreadyExists: v.object({
          accountId: AccountIdSchema,
        }),
      }),
      v.object({
        AccountDoesNotExist: v.object({
          accountId: AccountIdSchema,
        }),
      }),
      v.object({
        CreateAccountOnlyByRegistrar: v.object({
          accountId: AccountIdSchema,
          predecessorId: AccountIdSchema,
          registrarAccountId: AccountIdSchema,
        }),
      }),
      v.object({
        CreateAccountNotAllowed: v.object({
          accountId: AccountIdSchema,
          predecessorId: AccountIdSchema,
        }),
      }),
      v.object({
        ActorNoPermission: v.object({
          accountId: AccountIdSchema,
          actorId: AccountIdSchema,
        }),
      }),
      v.object({
        DeleteKeyDoesNotExist: v.object({
          accountId: AccountIdSchema,
          publicKey: PublicKeySchema,
        }),
      }),
      v.object({
        AddKeyAlreadyExists: v.object({
          accountId: AccountIdSchema,
          publicKey: PublicKeySchema,
        }),
      }),
      v.object({
        DeleteAccountStaking: v.object({
          accountId: AccountIdSchema,
        }),
      }),
      v.object({
        LackBalanceForState: v.object({
          accountId: AccountIdSchema,
          amount: v.string(),
        }),
      }),
      v.object({
        TriesToUnstake: v.object({
          accountId: AccountIdSchema,
        }),
      }),
      v.object({
        TriesToStake: v.object({
          accountId: AccountIdSchema,
          balance: v.string(),
          locked: v.string(),
          stake: v.string(),
        }),
      }),
      v.object({
        InsufficientStake: v.object({
          accountId: AccountIdSchema,
          minimumStake: v.string(),
          stake: v.string(),
        }),
      }),
      v.object({
        FunctionCallError: FunctionCallErrorSchema,
      }),
      v.object({
        NewReceiptValidationError: ReceiptValidationErrorSchema,
      }),
      v.object({
        OnlyImplicitAccountCreationAllowed: v.object({
          accountId: AccountIdSchema,
        }),
      }),
      v.object({
        DeleteAccountWithLargeState: v.object({
          accountId: AccountIdSchema,
        }),
      }),
      v.literal('DelegateActionInvalidSignature'),
      v.object({
        DelegateActionSenderDoesNotMatchTxReceiver: v.object({
          receiverId: AccountIdSchema,
          senderId: AccountIdSchema,
        }),
      }),
      v.literal('DelegateActionExpired'),
      v.object({
        DelegateActionAccessKeyError: InvalidAccessKeyErrorSchema,
      }),
      v.object({
        DelegateActionInvalidNonce: v.object({
          akNonce: v.number(),
          delegateNonce: v.number(),
        }),
      }),
      v.object({
        DelegateActionNonceTooLarge: v.object({
          delegateNonce: v.number(),
          upperBound: v.number(),
        }),
      }),
      v.object({
        GlobalContractDoesNotExist: v.object({
          identifier: GlobalContractIdentifierSchema,
        }),
      }),
    ]),
);

export const ActionViewSchema: v.GenericSchema<t.ActionView> = v.lazy(() =>
  v.union([
    v.literal('CreateAccount'),
    v.object({
      DeployContract: v.object({
        code: v.string(),
      }),
    }),
    v.object({
      FunctionCall: v.object({
        args: FunctionArgsSchema,
        deposit: v.string(),
        gas: v.number(),
        methodName: v.string(),
      }),
    }),
    v.object({
      Transfer: v.object({
        deposit: v.string(),
      }),
    }),
    v.object({
      Stake: v.object({
        publicKey: PublicKeySchema,
        stake: v.string(),
      }),
    }),
    v.object({
      AddKey: v.object({
        accessKey: AccessKeyViewSchema,
        publicKey: PublicKeySchema,
      }),
    }),
    v.object({
      DeleteKey: v.object({
        publicKey: PublicKeySchema,
      }),
    }),
    v.object({
      DeleteAccount: v.object({
        beneficiaryId: AccountIdSchema,
      }),
    }),
    v.object({
      Delegate: v.object({
        delegateAction: DelegateActionSchema,
        signature: SignatureSchema,
      }),
    }),
    v.object({
      DeployGlobalContract: v.object({
        code: v.string(),
      }),
    }),
    v.object({
      DeployGlobalContractByAccountId: v.object({
        code: v.string(),
      }),
    }),
    v.object({
      UseGlobalContract: v.object({
        codeHash: CryptoHashSchema,
      }),
    }),
    v.object({
      UseGlobalContractByAccountId: v.object({
        accountId: AccountIdSchema,
      }),
    }),
  ]),
);

export const ActionsValidationErrorSchema: v.GenericSchema<t.ActionsValidationError> =
  v.lazy(() =>
    v.union([
      v.literal('DeleteActionMustBeFinal'),
      v.object({
        TotalPrepaidGasExceeded: v.object({
          limit: v.number(),
          totalPrepaidGas: v.number(),
        }),
      }),
      v.object({
        TotalNumberOfActionsExceeded: v.object({
          limit: v.number(),
          totalNumberOfActions: v.number(),
        }),
      }),
      v.object({
        AddKeyMethodNamesNumberOfBytesExceeded: v.object({
          limit: v.number(),
          totalNumberOfBytes: v.number(),
        }),
      }),
      v.object({
        AddKeyMethodNameLengthExceeded: v.object({
          length: v.number(),
          limit: v.number(),
        }),
      }),
      v.literal('IntegerOverflow'),
      v.object({
        InvalidAccountId: v.object({
          accountId: v.string(),
        }),
      }),
      v.object({
        ContractSizeExceeded: v.object({
          limit: v.number(),
          size: v.number(),
        }),
      }),
      v.object({
        FunctionCallMethodNameLengthExceeded: v.object({
          length: v.number(),
          limit: v.number(),
        }),
      }),
      v.object({
        FunctionCallArgumentsLengthExceeded: v.object({
          length: v.number(),
          limit: v.number(),
        }),
      }),
      v.object({
        UnsuitableStakingKey: v.object({
          publicKey: PublicKeySchema,
        }),
      }),
      v.literal('FunctionCallZeroAttachedGas'),
      v.literal('DelegateActionMustBeOnlyOne'),
      v.object({
        UnsupportedProtocolFeature: v.object({
          protocolFeature: v.string(),
          version: v.number(),
        }),
      }),
    ]),
  );

export const AddKeyActionSchema: v.GenericSchema<t.AddKeyAction> = v.lazy(() =>
  v.object({
    accessKey: AccessKeySchema,
    publicKey: PublicKeySchema,
  }),
);

export const BandwidthRequestSchema: v.GenericSchema<t.BandwidthRequest> =
  v.lazy(() =>
    v.object({
      requestedValuesBitmap: BandwidthRequestBitmapSchema,
      toShard: v.number(),
    }),
  );

export const BandwidthRequestBitmapSchema: v.GenericSchema<t.BandwidthRequestBitmap> =
  v.lazy(() =>
    v.object({
      data: v.array(v.number()),
    }),
  );

export const BandwidthRequestsSchema: v.GenericSchema<t.BandwidthRequests> =
  v.lazy(() =>
    v.object({
      V1: BandwidthRequestsV1Schema,
    }),
  );

export const BandwidthRequestsV1Schema: v.GenericSchema<t.BandwidthRequestsV1> =
  v.lazy(() =>
    v.object({
      requests: v.array(BandwidthRequestSchema),
    }),
  );

export const BlockHeaderInnerLiteViewSchema: v.GenericSchema<t.BlockHeaderInnerLiteView> =
  v.lazy(() =>
    v.object({
      blockMerkleRoot: CryptoHashSchema,
      epochId: CryptoHashSchema,
      height: v.number(),
      nextBpHash: CryptoHashSchema,
      nextEpochId: CryptoHashSchema,
      outcomeRoot: CryptoHashSchema,
      prevStateRoot: CryptoHashSchema,
      timestamp: v.number(),
      timestampNanosec: v.string(),
    }),
  );

export const BlockHeaderViewSchema: v.GenericSchema<t.BlockHeaderView> = v.lazy(
  () =>
    v.object({
      approvals: v.array(v.union([SignatureSchema, v.null()])),
      blockBodyHash: v.optional(v.union([CryptoHashSchema, v.null()])),
      blockMerkleRoot: CryptoHashSchema,
      blockOrdinal: v.optional(v.union([v.number(), v.null()])),
      challengesResult: v.array(SlashedValidatorSchema),
      challengesRoot: CryptoHashSchema,
      chunkEndorsements: v.optional(
        v.union([v.array(v.array(v.number())), v.null()]),
      ),
      chunkHeadersRoot: CryptoHashSchema,
      chunkMask: v.array(v.boolean()),
      chunkReceiptsRoot: CryptoHashSchema,
      chunkTxRoot: CryptoHashSchema,
      chunksIncluded: v.number(),
      epochId: CryptoHashSchema,
      epochSyncDataHash: v.optional(v.union([CryptoHashSchema, v.null()])),
      gasPrice: v.string(),
      hash: CryptoHashSchema,
      height: v.number(),
      lastDsFinalBlock: CryptoHashSchema,
      lastFinalBlock: CryptoHashSchema,
      latestProtocolVersion: v.number(),
      nextBpHash: CryptoHashSchema,
      nextEpochId: CryptoHashSchema,
      outcomeRoot: CryptoHashSchema,
      prevHash: CryptoHashSchema,
      prevHeight: v.optional(v.union([v.number(), v.null()])),
      prevStateRoot: CryptoHashSchema,
      randomValue: CryptoHashSchema,
      rentPaid: v.string(),
      signature: SignatureSchema,
      timestamp: v.number(),
      timestampNanosec: v.string(),
      totalSupply: v.string(),
      validatorProposals: v.array(ValidatorStakeViewSchema),
      validatorReward: v.string(),
    }),
);

export const BlockIdSchema: v.GenericSchema<t.BlockId> = v.lazy(() =>
  v.union([v.number(), CryptoHashSchema]),
);

export const BlockStatusViewSchema: v.GenericSchema<t.BlockStatusView> = v.lazy(
  () =>
    v.object({
      hash: CryptoHashSchema,
      height: v.number(),
    }),
);

export const CallResultSchema: v.GenericSchema<t.CallResult> = v.lazy(() =>
  v.object({
    logs: v.array(v.string()),
    result: v.array(v.number()),
  }),
);

export const CatchupStatusViewSchema: v.GenericSchema<t.CatchupStatusView> =
  v.lazy(() => v.object({}));

export const ChunkDistributionNetworkConfigSchema: v.GenericSchema<t.ChunkDistributionNetworkConfig> =
  v.lazy(() =>
    v.object({
      enabled: v.boolean(),
      uris: ChunkDistributionUrisSchema,
    }),
  );

export const ChunkDistributionUrisSchema: v.GenericSchema<t.ChunkDistributionUris> =
  v.lazy(() =>
    v.object({
      get: v.string(),
      set: v.string(),
    }),
  );

export const ChunkHeaderViewSchema: v.GenericSchema<t.ChunkHeaderView> = v.lazy(
  () =>
    v.object({
      balanceBurnt: v.string(),
      bandwidthRequests: v.optional(
        v.union([BandwidthRequestsSchema, v.null()]),
      ),
      chunkHash: CryptoHashSchema,
      congestionInfo: v.optional(v.union([CongestionInfoViewSchema, v.null()])),
      encodedLength: v.number(),
      encodedMerkleRoot: CryptoHashSchema,
      gasLimit: v.number(),
      gasUsed: v.number(),
      heightCreated: v.number(),
      heightIncluded: v.number(),
      outcomeRoot: CryptoHashSchema,
      outgoingReceiptsRoot: CryptoHashSchema,
      prevBlockHash: CryptoHashSchema,
      prevStateRoot: CryptoHashSchema,
      rentPaid: v.string(),
      shardId: ShardIdSchema,
      signature: SignatureSchema,
      txRoot: CryptoHashSchema,
      validatorProposals: v.array(ValidatorStakeViewSchema),
      validatorReward: v.string(),
    }),
);

export const CompilationErrorSchema: v.GenericSchema<t.CompilationError> =
  v.lazy(() =>
    v.union([
      v.object({
        CodeDoesNotExist: v.object({
          accountId: AccountIdSchema,
        }),
      }),
      v.object({
        PrepareError: PrepareErrorSchema,
      }),
      v.object({
        WasmerCompileError: v.object({
          msg: v.string(),
        }),
      }),
    ]),
  );

export const CongestionControlConfigViewSchema: v.GenericSchema<t.CongestionControlConfigView> =
  v.lazy(() =>
    v.object({
      allowedShardOutgoingGas: v.number(),
      maxCongestionIncomingGas: v.number(),
      maxCongestionMemoryConsumption: v.number(),
      maxCongestionMissedChunks: v.number(),
      maxCongestionOutgoingGas: v.number(),
      maxOutgoingGas: v.number(),
      maxTxGas: v.number(),
      minOutgoingGas: v.number(),
      minTxGas: v.number(),
      outgoingReceiptsBigSizeLimit: v.number(),
      outgoingReceiptsUsualSizeLimit: v.number(),
      rejectTxCongestionThreshold: v.number(),
    }),
  );

export const CongestionInfoViewSchema: v.GenericSchema<t.CongestionInfoView> =
  v.lazy(() =>
    v.object({
      allowedShard: v.number(),
      bufferedReceiptsGas: v.string(),
      delayedReceiptsGas: v.string(),
      receiptBytes: v.number(),
    }),
  );

export const ContractCodeViewSchema: v.GenericSchema<t.ContractCodeView> =
  v.lazy(() =>
    v.object({
      codeBase64: v.string(),
      hash: CryptoHashSchema,
    }),
  );

export const CostGasUsedSchema: v.GenericSchema<t.CostGasUsed> = v.lazy(() =>
  v.object({
    cost: v.string(),
    costCategory: v.string(),
    gasUsed: v.string(),
  }),
);

export const CreateAccountActionSchema: v.GenericSchema<t.CreateAccountAction> =
  v.lazy(() => v.object({}));

export const CryptoHashSchema: v.GenericSchema<t.CryptoHash> = v.lazy(() =>
  v.string(),
);

export const CurrentEpochValidatorInfoSchema: v.GenericSchema<t.CurrentEpochValidatorInfo> =
  v.lazy(() =>
    v.object({
      accountId: AccountIdSchema,
      isSlashed: v.boolean(),
      numExpectedBlocks: v.number(),
      numExpectedChunks: v.number(),
      numExpectedChunksPerShard: v.array(v.number()),
      numExpectedEndorsements: v.number(),
      numExpectedEndorsementsPerShard: v.array(v.number()),
      numProducedBlocks: v.number(),
      numProducedChunks: v.number(),
      numProducedChunksPerShard: v.array(v.number()),
      numProducedEndorsements: v.number(),
      numProducedEndorsementsPerShard: v.array(v.number()),
      publicKey: PublicKeySchema,
      shards: v.array(ShardIdSchema),
      shardsEndorsed: v.array(ShardIdSchema),
      stake: v.string(),
    }),
  );

export const DataReceiptCreationConfigViewSchema: v.GenericSchema<t.DataReceiptCreationConfigView> =
  v.lazy(() =>
    v.object({
      baseCost: FeeSchema,
      costPerByte: FeeSchema,
    }),
  );

export const DataReceiverViewSchema: v.GenericSchema<t.DataReceiverView> =
  v.lazy(() =>
    v.object({
      dataId: CryptoHashSchema,
      receiverId: AccountIdSchema,
    }),
  );

export const DelegateActionSchema: v.GenericSchema<t.DelegateAction> = v.lazy(
  () =>
    v.object({
      actions: v.array(NonDelegateActionSchema),
      maxBlockHeight: v.number(),
      nonce: v.number(),
      publicKey: PublicKeySchema,
      receiverId: AccountIdSchema,
      senderId: AccountIdSchema,
    }),
);

export const DeleteAccountActionSchema: v.GenericSchema<t.DeleteAccountAction> =
  v.lazy(() =>
    v.object({
      beneficiaryId: AccountIdSchema,
    }),
  );

export const DeleteKeyActionSchema: v.GenericSchema<t.DeleteKeyAction> = v.lazy(
  () =>
    v.object({
      publicKey: PublicKeySchema,
    }),
);

export const DeployContractActionSchema: v.GenericSchema<t.DeployContractAction> =
  v.lazy(() =>
    v.object({
      code: v.string(),
    }),
  );

export const DeployGlobalContractActionSchema: v.GenericSchema<t.DeployGlobalContractAction> =
  v.lazy(() =>
    v.object({
      code: v.string(),
      deployMode: GlobalContractDeployModeSchema,
    }),
  );

export const DetailedDebugStatusSchema: v.GenericSchema<t.DetailedDebugStatus> =
  v.lazy(() =>
    v.object({
      blockProductionDelayMillis: v.number(),
      catchupStatus: v.array(CatchupStatusViewSchema),
      currentHeadStatus: BlockStatusViewSchema,
      currentHeaderHeadStatus: BlockStatusViewSchema,
      networkInfo: NetworkInfoViewSchema,
      syncStatus: v.string(),
    }),
  );

export const DirectionSchema: v.GenericSchema<t.Direction> = v.lazy(() =>
  v.union([v.literal('Left'), v.literal('Right')]),
);

export const DumpConfigSchema: v.GenericSchema<t.DumpConfig> = v.lazy(() =>
  v.object({
    credentialsFile: v.optional(v.union([v.string(), v.null()])),
    iterationDelay: v.optional(
      v.union([DurationAsStdSchemaProviderSchema, v.null()]),
    ),
    location: ExternalStorageLocationSchema,
    restartDumpForShards: v.optional(
      v.union([v.array(ShardIdSchema), v.null()]),
    ),
  }),
);

export const DurationAsStdSchemaProviderSchema: v.GenericSchema<t.DurationAsStdSchemaProvider> =
  v.lazy(() =>
    v.object({
      nanos: v.number(),
      secs: v.number(),
    }),
  );

export const EpochIdSchema: v.GenericSchema<t.EpochId> = v.lazy(
  () => CryptoHashSchema,
);

export const EpochSyncConfigSchema: v.GenericSchema<t.EpochSyncConfig> = v.lazy(
  () =>
    v.object({
      disableEpochSyncForBootstrapping: v.boolean(),
      epochSyncHorizon: v.number(),
      ignoreEpochSyncNetworkRequests: v.boolean(),
      timeoutForEpochSync: DurationAsStdSchemaProviderSchema,
    }),
);

export const ExecutionMetadataViewSchema: v.GenericSchema<t.ExecutionMetadataView> =
  v.lazy(() =>
    v.object({
      gasProfile: v.optional(v.union([v.array(CostGasUsedSchema), v.null()])),
      version: v.number(),
    }),
  );

export const ExecutionOutcomeViewSchema: v.GenericSchema<t.ExecutionOutcomeView> =
  v.lazy(() =>
    v.object({
      executorId: AccountIdSchema,
      gasBurnt: v.number(),
      logs: v.array(v.string()),
      metadata: ExecutionMetadataViewSchema,
      receiptIds: v.array(CryptoHashSchema),
      status: ExecutionStatusViewSchema,
      tokensBurnt: v.string(),
    }),
  );

export const ExecutionOutcomeWithIdViewSchema: v.GenericSchema<t.ExecutionOutcomeWithIdView> =
  v.lazy(() =>
    v.object({
      blockHash: CryptoHashSchema,
      id: CryptoHashSchema,
      outcome: ExecutionOutcomeViewSchema,
      proof: v.array(MerklePathItemSchema),
    }),
  );

export const ExecutionStatusViewSchema: v.GenericSchema<t.ExecutionStatusView> =
  v.lazy(() =>
    v.union([
      v.literal('Unknown'),
      v.object({
        Failure: TxExecutionErrorSchema,
      }),
      v.object({
        SuccessValue: v.string(),
      }),
      v.object({
        SuccessReceiptId: CryptoHashSchema,
      }),
    ]),
  );

export const ExtCostsConfigViewSchema: v.GenericSchema<t.ExtCostsConfigView> =
  v.lazy(() =>
    v.object({
      altBn128G1MultiexpBase: v.number(),
      altBn128G1MultiexpElement: v.number(),
      altBn128G1SumBase: v.number(),
      altBn128G1SumElement: v.number(),
      altBn128PairingCheckBase: v.number(),
      altBn128PairingCheckElement: v.number(),
      base: v.number(),
      bls12381G1MultiexpBase: v.number(),
      bls12381G1MultiexpElement: v.number(),
      bls12381G2MultiexpBase: v.number(),
      bls12381G2MultiexpElement: v.number(),
      bls12381MapFp2ToG2Base: v.number(),
      bls12381MapFp2ToG2Element: v.number(),
      bls12381MapFpToG1Base: v.number(),
      bls12381MapFpToG1Element: v.number(),
      bls12381P1DecompressBase: v.number(),
      bls12381P1DecompressElement: v.number(),
      bls12381P1SumBase: v.number(),
      bls12381P1SumElement: v.number(),
      bls12381P2DecompressBase: v.number(),
      bls12381P2DecompressElement: v.number(),
      bls12381P2SumBase: v.number(),
      bls12381P2SumElement: v.number(),
      bls12381PairingBase: v.number(),
      bls12381PairingElement: v.number(),
      contractCompileBase: v.number(),
      contractCompileBytes: v.number(),
      contractLoadingBase: v.number(),
      contractLoadingBytes: v.number(),
      ecrecoverBase: v.number(),
      ed25519VerifyBase: v.number(),
      ed25519VerifyByte: v.number(),
      keccak256Base: v.number(),
      keccak256Byte: v.number(),
      keccak512Base: v.number(),
      keccak512Byte: v.number(),
      logBase: v.number(),
      logByte: v.number(),
      promiseAndBase: v.number(),
      promiseAndPerPromise: v.number(),
      promiseReturn: v.number(),
      readCachedTrieNode: v.number(),
      readMemoryBase: v.number(),
      readMemoryByte: v.number(),
      readRegisterBase: v.number(),
      readRegisterByte: v.number(),
      ripemd160Base: v.number(),
      ripemd160Block: v.number(),
      sha256Base: v.number(),
      sha256Byte: v.number(),
      storageHasKeyBase: v.number(),
      storageHasKeyByte: v.number(),
      storageIterCreateFromByte: v.number(),
      storageIterCreatePrefixBase: v.number(),
      storageIterCreatePrefixByte: v.number(),
      storageIterCreateRangeBase: v.number(),
      storageIterCreateToByte: v.number(),
      storageIterNextBase: v.number(),
      storageIterNextKeyByte: v.number(),
      storageIterNextValueByte: v.number(),
      storageLargeReadOverheadBase: v.number(),
      storageLargeReadOverheadByte: v.number(),
      storageReadBase: v.number(),
      storageReadKeyByte: v.number(),
      storageReadValueByte: v.number(),
      storageRemoveBase: v.number(),
      storageRemoveKeyByte: v.number(),
      storageRemoveRetValueByte: v.number(),
      storageWriteBase: v.number(),
      storageWriteEvictedByte: v.number(),
      storageWriteKeyByte: v.number(),
      storageWriteValueByte: v.number(),
      touchingTrieNode: v.number(),
      utf16DecodingBase: v.number(),
      utf16DecodingByte: v.number(),
      utf8DecodingBase: v.number(),
      utf8DecodingByte: v.number(),
      validatorStakeBase: v.number(),
      validatorTotalStakeBase: v.number(),
      writeMemoryBase: v.number(),
      writeMemoryByte: v.number(),
      writeRegisterBase: v.number(),
      writeRegisterByte: v.number(),
      yieldCreateBase: v.number(),
      yieldCreateByte: v.number(),
      yieldResumeBase: v.number(),
      yieldResumeByte: v.number(),
    }),
  );

export const ExternalStorageConfigSchema: v.GenericSchema<t.ExternalStorageConfig> =
  v.lazy(() =>
    v.object({
      externalStorageFallbackThreshold: v.number(),
      location: ExternalStorageLocationSchema,
      numConcurrentRequests: v.number(),
      numConcurrentRequestsDuringCatchup: v.number(),
    }),
  );

export const ExternalStorageLocationSchema: v.GenericSchema<t.ExternalStorageLocation> =
  v.lazy(() =>
    v.union([
      v.object({
        S3: v.object({
          bucket: v.string(),
          region: v.string(),
        }),
      }),
      v.object({
        Filesystem: v.object({
          rootDir: v.string(),
        }),
      }),
      v.object({
        GCS: v.object({
          bucket: v.string(),
        }),
      }),
    ]),
  );

export const FeeSchema: v.GenericSchema<t.Fee> = v.lazy(() =>
  v.object({
    execution: v.number(),
    sendNotSir: v.number(),
    sendSir: v.number(),
  }),
);

export const FinalExecutionOutcomeViewSchema: v.GenericSchema<t.FinalExecutionOutcomeView> =
  v.lazy(() =>
    v.object({
      receiptsOutcome: v.array(ExecutionOutcomeWithIdViewSchema),
      status: FinalExecutionStatusSchema,
      transaction: SignedTransactionViewSchema,
      transactionOutcome: ExecutionOutcomeWithIdViewSchema,
    }),
  );

export const FinalExecutionOutcomeWithReceiptViewSchema: v.GenericSchema<t.FinalExecutionOutcomeWithReceiptView> =
  v.lazy(() =>
    v.object({
      receipts: v.array(ReceiptViewSchema),
      receiptsOutcome: v.array(ExecutionOutcomeWithIdViewSchema),
      status: FinalExecutionStatusSchema,
      transaction: SignedTransactionViewSchema,
      transactionOutcome: ExecutionOutcomeWithIdViewSchema,
    }),
  );

export const FinalExecutionStatusSchema: v.GenericSchema<t.FinalExecutionStatus> =
  v.lazy(() =>
    v.union([
      v.literal('NotStarted'),
      v.literal('Started'),
      v.object({
        Failure: TxExecutionErrorSchema,
      }),
      v.object({
        SuccessValue: v.string(),
      }),
    ]),
  );

export const FinalitySchema: v.GenericSchema<t.Finality> = v.lazy(() =>
  v.union([
    v.literal('optimistic'),
    v.literal('near-final'),
    v.literal('final'),
  ]),
);

export const FunctionArgsSchema: v.GenericSchema<t.FunctionArgs> = v.lazy(() =>
  v.string(),
);

export const FunctionCallActionSchema: v.GenericSchema<t.FunctionCallAction> =
  v.lazy(() =>
    v.object({
      args: v.string(),
      deposit: v.string(),
      gas: v.number(),
      methodName: v.string(),
    }),
  );

export const FunctionCallErrorSchema: v.GenericSchema<t.FunctionCallError> =
  v.lazy(() =>
    v.union([
      v.union([v.literal('WasmUnknownError'), v.literal('_EVMError')]),
      v.object({
        CompilationError: CompilationErrorSchema,
      }),
      v.object({
        LinkError: v.object({
          msg: v.string(),
        }),
      }),
      v.object({
        MethodResolveError: MethodResolveErrorSchema,
      }),
      v.object({
        WasmTrap: WasmTrapSchema,
      }),
      v.object({
        HostError: HostErrorSchema,
      }),
      v.object({
        ExecutionError: v.string(),
      }),
    ]),
  );

export const FunctionCallPermissionSchema: v.GenericSchema<t.FunctionCallPermission> =
  v.lazy(() =>
    v.object({
      allowance: v.optional(v.union([v.string(), v.null()])),
      methodNames: v.array(v.string()),
      receiverId: v.string(),
    }),
  );

export const GCConfigSchema: v.GenericSchema<t.GCConfig> = v.lazy(() =>
  v.object({
    gcBlocksLimit: v.number(),
    gcForkCleanStep: v.number(),
    gcNumEpochsToKeep: v.number(),
    gcStepPeriod: DurationAsStdSchemaProviderSchema,
  }),
);

export const GasKeyViewSchema: v.GenericSchema<t.GasKeyView> = v.lazy(() =>
  v.object({
    balance: v.number(),
    numNonces: v.number(),
    permission: AccessKeyPermissionViewSchema,
  }),
);

export const GenesisConfigSchema: v.GenericSchema<t.GenesisConfig> = v.lazy(
  () =>
    v.object({
      avgHiddenValidatorSeatsPerShard: v.array(v.number()),
      blockProducerKickoutThreshold: v.number(),
      chainId: v.string(),
      chunkProducerAssignmentChangesLimit: v.number(),
      chunkProducerKickoutThreshold: v.number(),
      chunkValidatorOnlyKickoutThreshold: v.number(),
      dynamicResharding: v.boolean(),
      epochLength: v.number(),
      fishermenThreshold: v.string(),
      gasLimit: v.number(),
      gasPriceAdjustmentRate: v.array(v.number()),
      genesisHeight: v.number(),
      genesisTime: v.string(),
      maxGasPrice: v.string(),
      maxInflationRate: v.array(v.number()),
      maxKickoutStakePerc: v.number(),
      minGasPrice: v.string(),
      minimumStakeDivisor: v.number(),
      minimumStakeRatio: v.array(v.number()),
      minimumValidatorsPerShard: v.number(),
      numBlockProducerSeats: v.number(),
      numBlockProducerSeatsPerShard: v.array(v.number()),
      numBlocksPerYear: v.number(),
      numChunkOnlyProducerSeats: v.number(),
      numChunkProducerSeats: v.number(),
      numChunkValidatorSeats: v.number(),
      onlineMaxThreshold: v.array(v.number()),
      onlineMinThreshold: v.array(v.number()),
      protocolRewardRate: v.array(v.number()),
      protocolTreasuryAccount: AccountIdSchema,
      protocolUpgradeStakeThreshold: v.array(v.number()),
      protocolVersion: v.number(),
      shardLayout: ShardLayoutSchema,
      shuffleShardAssignmentForChunkProducers: v.boolean(),
      targetValidatorMandatesPerShard: v.number(),
      totalSupply: v.string(),
      transactionValidityPeriod: v.number(),
      useProductionConfig: v.boolean(),
      validators: v.array(AccountInfoSchema),
    }),
);

export const GenesisConfigRequestSchema: v.GenericSchema<t.GenesisConfigRequest> =
  v.lazy(() => v.null());

export const GlobalContractDeployModeSchema: v.GenericSchema<t.GlobalContractDeployMode> =
  v.lazy(() => v.union([v.literal('CodeHash'), v.literal('AccountId')]));

export const GlobalContractIdentifierSchema: v.GenericSchema<t.GlobalContractIdentifier> =
  v.lazy(() =>
    v.union([
      v.object({
        CodeHash: CryptoHashSchema,
      }),
      v.object({
        AccountId: AccountIdSchema,
      }),
    ]),
  );

export const HostErrorSchema: v.GenericSchema<t.HostError> = v.lazy(() =>
  v.union([
    v.literal('BadUTF16'),
    v.literal('BadUTF8'),
    v.literal('GasExceeded'),
    v.literal('GasLimitExceeded'),
    v.literal('BalanceExceeded'),
    v.literal('EmptyMethodName'),
    v.object({
      GuestPanic: v.object({
        panicMsg: v.string(),
      }),
    }),
    v.literal('IntegerOverflow'),
    v.object({
      InvalidPromiseIndex: v.object({
        promiseIdx: v.number(),
      }),
    }),
    v.literal('CannotAppendActionToJointPromise'),
    v.literal('CannotReturnJointPromise'),
    v.object({
      InvalidPromiseResultIndex: v.object({
        resultIdx: v.number(),
      }),
    }),
    v.object({
      InvalidRegisterId: v.object({
        registerId: v.number(),
      }),
    }),
    v.object({
      IteratorWasInvalidated: v.object({
        iteratorIndex: v.number(),
      }),
    }),
    v.literal('MemoryAccessViolation'),
    v.object({
      InvalidReceiptIndex: v.object({
        receiptIndex: v.number(),
      }),
    }),
    v.object({
      InvalidIteratorIndex: v.object({
        iteratorIndex: v.number(),
      }),
    }),
    v.literal('InvalidAccountId'),
    v.literal('InvalidMethodName'),
    v.literal('InvalidPublicKey'),
    v.object({
      ProhibitedInView: v.object({
        methodName: v.string(),
      }),
    }),
    v.object({
      NumberOfLogsExceeded: v.object({
        limit: v.number(),
      }),
    }),
    v.object({
      KeyLengthExceeded: v.object({
        length: v.number(),
        limit: v.number(),
      }),
    }),
    v.object({
      ValueLengthExceeded: v.object({
        length: v.number(),
        limit: v.number(),
      }),
    }),
    v.object({
      TotalLogLengthExceeded: v.object({
        length: v.number(),
        limit: v.number(),
      }),
    }),
    v.object({
      NumberPromisesExceeded: v.object({
        limit: v.number(),
        numberOfPromises: v.number(),
      }),
    }),
    v.object({
      NumberInputDataDependenciesExceeded: v.object({
        limit: v.number(),
        numberOfInputDataDependencies: v.number(),
      }),
    }),
    v.object({
      ReturnedValueLengthExceeded: v.object({
        length: v.number(),
        limit: v.number(),
      }),
    }),
    v.object({
      ContractSizeExceeded: v.object({
        limit: v.number(),
        size: v.number(),
      }),
    }),
    v.object({
      Deprecated: v.object({
        methodName: v.string(),
      }),
    }),
    v.object({
      ECRecoverError: v.object({
        msg: v.string(),
      }),
    }),
    v.object({
      AltBn128InvalidInput: v.object({
        msg: v.string(),
      }),
    }),
    v.object({
      Ed25519VerifyInvalidInput: v.object({
        msg: v.string(),
      }),
    }),
  ]),
);

export const InvalidAccessKeyErrorSchema: v.GenericSchema<t.InvalidAccessKeyError> =
  v.lazy(() =>
    v.union([
      v.object({
        AccessKeyNotFound: v.object({
          accountId: AccountIdSchema,
          publicKey: PublicKeySchema,
        }),
      }),
      v.object({
        ReceiverMismatch: v.object({
          akReceiver: v.string(),
          txReceiver: AccountIdSchema,
        }),
      }),
      v.object({
        MethodNameMismatch: v.object({
          methodName: v.string(),
        }),
      }),
      v.literal('RequiresFullAccess'),
      v.object({
        NotEnoughAllowance: v.object({
          accountId: AccountIdSchema,
          allowance: v.string(),
          cost: v.string(),
          publicKey: PublicKeySchema,
        }),
      }),
      v.literal('DepositWithFunctionCall'),
    ]),
  );

export const InvalidTxErrorSchema: v.GenericSchema<t.InvalidTxError> = v.lazy(
  () =>
    v.union([
      v.object({
        InvalidAccessKeyError: InvalidAccessKeyErrorSchema,
      }),
      v.object({
        InvalidSignerId: v.object({
          signerId: v.string(),
        }),
      }),
      v.object({
        SignerDoesNotExist: v.object({
          signerId: AccountIdSchema,
        }),
      }),
      v.object({
        InvalidNonce: v.object({
          akNonce: v.number(),
          txNonce: v.number(),
        }),
      }),
      v.object({
        NonceTooLarge: v.object({
          txNonce: v.number(),
          upperBound: v.number(),
        }),
      }),
      v.object({
        InvalidReceiverId: v.object({
          receiverId: v.string(),
        }),
      }),
      v.literal('InvalidSignature'),
      v.object({
        NotEnoughBalance: v.object({
          balance: v.string(),
          cost: v.string(),
          signerId: AccountIdSchema,
        }),
      }),
      v.object({
        LackBalanceForState: v.object({
          amount: v.string(),
          signerId: AccountIdSchema,
        }),
      }),
      v.literal('CostOverflow'),
      v.literal('InvalidChain'),
      v.literal('Expired'),
      v.object({
        ActionsValidation: ActionsValidationErrorSchema,
      }),
      v.object({
        TransactionSizeExceeded: v.object({
          limit: v.number(),
          size: v.number(),
        }),
      }),
      v.literal('InvalidTransactionVersion'),
      v.object({
        StorageError: StorageErrorSchema,
      }),
      v.object({
        ShardCongested: v.object({
          congestionLevel: v.number(),
          shardId: v.number(),
        }),
      }),
      v.object({
        ShardStuck: v.object({
          missedChunks: v.number(),
          shardId: v.number(),
        }),
      }),
    ]),
);

export const JsonRpcRequest_for_EXPERIMENTAL_changesSchema: v.GenericSchema<t.JsonRpcRequest_for_EXPERIMENTAL_changes> =
  v.lazy(() =>
    v.object({
      id: v.string(),
      jsonrpc: v.string(),
      method: v.literal('EXPERIMENTAL_changes'),
      params: RpcStateChangesInBlockByTypeRequestSchema,
    }),
  );

export const JsonRpcRequest_for_EXPERIMENTAL_changes_in_blockSchema: v.GenericSchema<t.JsonRpcRequest_for_EXPERIMENTAL_changes_in_block> =
  v.lazy(() =>
    v.object({
      id: v.string(),
      jsonrpc: v.string(),
      method: v.literal('EXPERIMENTAL_changes_in_block'),
      params: RpcStateChangesInBlockRequestSchema,
    }),
  );

export const JsonRpcRequest_for_EXPERIMENTAL_congestion_levelSchema: v.GenericSchema<t.JsonRpcRequest_for_EXPERIMENTAL_congestion_level> =
  v.lazy(() =>
    v.object({
      id: v.string(),
      jsonrpc: v.string(),
      method: v.literal('EXPERIMENTAL_congestion_level'),
      params: RpcCongestionLevelRequestSchema,
    }),
  );

export const JsonRpcRequest_for_EXPERIMENTAL_genesis_configSchema: v.GenericSchema<t.JsonRpcRequest_for_EXPERIMENTAL_genesis_config> =
  v.lazy(() =>
    v.object({
      id: v.string(),
      jsonrpc: v.string(),
      method: v.literal('EXPERIMENTAL_genesis_config'),
      params: GenesisConfigRequestSchema,
    }),
  );

export const JsonRpcRequest_for_EXPERIMENTAL_light_client_block_proofSchema: v.GenericSchema<t.JsonRpcRequest_for_EXPERIMENTAL_light_client_block_proof> =
  v.lazy(() =>
    v.object({
      id: v.string(),
      jsonrpc: v.string(),
      method: v.literal('EXPERIMENTAL_light_client_block_proof'),
      params: RpcLightClientBlockProofRequestSchema,
    }),
  );

export const JsonRpcRequest_for_EXPERIMENTAL_light_client_proofSchema: v.GenericSchema<t.JsonRpcRequest_for_EXPERIMENTAL_light_client_proof> =
  v.lazy(() =>
    v.object({
      id: v.string(),
      jsonrpc: v.string(),
      method: v.literal('EXPERIMENTAL_light_client_proof'),
      params: RpcLightClientExecutionProofRequestSchema,
    }),
  );

export const JsonRpcRequest_for_EXPERIMENTAL_maintenance_windowsSchema: v.GenericSchema<t.JsonRpcRequest_for_EXPERIMENTAL_maintenance_windows> =
  v.lazy(() =>
    v.object({
      id: v.string(),
      jsonrpc: v.string(),
      method: v.literal('EXPERIMENTAL_maintenance_windows'),
      params: RpcMaintenanceWindowsRequestSchema,
    }),
  );

export const JsonRpcRequest_for_EXPERIMENTAL_protocol_configSchema: v.GenericSchema<t.JsonRpcRequest_for_EXPERIMENTAL_protocol_config> =
  v.lazy(() =>
    v.object({
      id: v.string(),
      jsonrpc: v.string(),
      method: v.literal('EXPERIMENTAL_protocol_config'),
      params: RpcProtocolConfigRequestSchema,
    }),
  );

export const JsonRpcRequest_for_EXPERIMENTAL_receiptSchema: v.GenericSchema<t.JsonRpcRequest_for_EXPERIMENTAL_receipt> =
  v.lazy(() =>
    v.object({
      id: v.string(),
      jsonrpc: v.string(),
      method: v.literal('EXPERIMENTAL_receipt'),
      params: RpcReceiptRequestSchema,
    }),
  );

export const JsonRpcRequest_for_EXPERIMENTAL_split_storage_infoSchema: v.GenericSchema<t.JsonRpcRequest_for_EXPERIMENTAL_split_storage_info> =
  v.lazy(() =>
    v.object({
      id: v.string(),
      jsonrpc: v.string(),
      method: v.literal('EXPERIMENTAL_split_storage_info'),
      params: RpcSplitStorageInfoRequestSchema,
    }),
  );

export const JsonRpcRequest_for_EXPERIMENTAL_tx_statusSchema: v.GenericSchema<t.JsonRpcRequest_for_EXPERIMENTAL_tx_status> =
  v.lazy(() =>
    v.object({
      id: v.string(),
      jsonrpc: v.string(),
      method: v.literal('EXPERIMENTAL_tx_status'),
      params: RpcTransactionStatusRequestSchema,
    }),
  );

export const JsonRpcRequest_for_EXPERIMENTAL_validators_orderedSchema: v.GenericSchema<t.JsonRpcRequest_for_EXPERIMENTAL_validators_ordered> =
  v.lazy(() =>
    v.object({
      id: v.string(),
      jsonrpc: v.string(),
      method: v.literal('EXPERIMENTAL_validators_ordered'),
      params: RpcValidatorsOrderedRequestSchema,
    }),
  );

export const JsonRpcRequest_for_blockSchema: v.GenericSchema<t.JsonRpcRequest_for_block> =
  v.lazy(() =>
    v.object({
      id: v.string(),
      jsonrpc: v.string(),
      method: v.literal('block'),
      params: RpcBlockRequestSchema,
    }),
  );

export const JsonRpcRequest_for_block_effectsSchema: v.GenericSchema<t.JsonRpcRequest_for_block_effects> =
  v.lazy(() =>
    v.object({
      id: v.string(),
      jsonrpc: v.string(),
      method: v.literal('block_effects'),
      params: RpcStateChangesInBlockRequestSchema,
    }),
  );

export const JsonRpcRequest_for_broadcast_tx_asyncSchema: v.GenericSchema<t.JsonRpcRequest_for_broadcast_tx_async> =
  v.lazy(() =>
    v.object({
      id: v.string(),
      jsonrpc: v.string(),
      method: v.literal('broadcast_tx_async'),
      params: RpcSendTransactionRequestSchema,
    }),
  );

export const JsonRpcRequest_for_broadcast_tx_commitSchema: v.GenericSchema<t.JsonRpcRequest_for_broadcast_tx_commit> =
  v.lazy(() =>
    v.object({
      id: v.string(),
      jsonrpc: v.string(),
      method: v.literal('broadcast_tx_commit'),
      params: RpcSendTransactionRequestSchema,
    }),
  );

export const JsonRpcRequest_for_changesSchema: v.GenericSchema<t.JsonRpcRequest_for_changes> =
  v.lazy(() =>
    v.object({
      id: v.string(),
      jsonrpc: v.string(),
      method: v.literal('changes'),
      params: RpcStateChangesInBlockByTypeRequestSchema,
    }),
  );

export const JsonRpcRequest_for_chunkSchema: v.GenericSchema<t.JsonRpcRequest_for_chunk> =
  v.lazy(() =>
    v.object({
      id: v.string(),
      jsonrpc: v.string(),
      method: v.literal('chunk'),
      params: RpcChunkRequestSchema,
    }),
  );

export const JsonRpcRequest_for_client_configSchema: v.GenericSchema<t.JsonRpcRequest_for_client_config> =
  v.lazy(() =>
    v.object({
      id: v.string(),
      jsonrpc: v.string(),
      method: v.literal('client_config'),
      params: RpcClientConfigRequestSchema,
    }),
  );

export const JsonRpcRequest_for_gas_priceSchema: v.GenericSchema<t.JsonRpcRequest_for_gas_price> =
  v.lazy(() =>
    v.object({
      id: v.string(),
      jsonrpc: v.string(),
      method: v.literal('gas_price'),
      params: RpcGasPriceRequestSchema,
    }),
  );

export const JsonRpcRequest_for_genesis_configSchema: v.GenericSchema<t.JsonRpcRequest_for_genesis_config> =
  v.lazy(() =>
    v.object({
      id: v.string(),
      jsonrpc: v.string(),
      method: v.literal('genesis_config'),
      params: GenesisConfigRequestSchema,
    }),
  );

export const JsonRpcRequest_for_healthSchema: v.GenericSchema<t.JsonRpcRequest_for_health> =
  v.lazy(() =>
    v.object({
      id: v.string(),
      jsonrpc: v.string(),
      method: v.literal('health'),
      params: RpcHealthRequestSchema,
    }),
  );

export const JsonRpcRequest_for_light_client_proofSchema: v.GenericSchema<t.JsonRpcRequest_for_light_client_proof> =
  v.lazy(() =>
    v.object({
      id: v.string(),
      jsonrpc: v.string(),
      method: v.literal('light_client_proof'),
      params: RpcLightClientExecutionProofRequestSchema,
    }),
  );

export const JsonRpcRequest_for_maintenance_windowsSchema: v.GenericSchema<t.JsonRpcRequest_for_maintenance_windows> =
  v.lazy(() =>
    v.object({
      id: v.string(),
      jsonrpc: v.string(),
      method: v.literal('maintenance_windows'),
      params: RpcMaintenanceWindowsRequestSchema,
    }),
  );

export const JsonRpcRequest_for_network_infoSchema: v.GenericSchema<t.JsonRpcRequest_for_network_info> =
  v.lazy(() =>
    v.object({
      id: v.string(),
      jsonrpc: v.string(),
      method: v.literal('network_info'),
      params: RpcNetworkInfoRequestSchema,
    }),
  );

export const JsonRpcRequest_for_next_light_client_blockSchema: v.GenericSchema<t.JsonRpcRequest_for_next_light_client_block> =
  v.lazy(() =>
    v.object({
      id: v.string(),
      jsonrpc: v.string(),
      method: v.literal('next_light_client_block'),
      params: RpcLightClientNextBlockRequestSchema,
    }),
  );

export const JsonRpcRequest_for_querySchema: v.GenericSchema<t.JsonRpcRequest_for_query> =
  v.lazy(() =>
    v.object({
      id: v.string(),
      jsonrpc: v.string(),
      method: v.literal('query'),
      params: RpcQueryRequestSchema,
    }),
  );

export const JsonRpcRequest_for_send_txSchema: v.GenericSchema<t.JsonRpcRequest_for_send_tx> =
  v.lazy(() =>
    v.object({
      id: v.string(),
      jsonrpc: v.string(),
      method: v.literal('send_tx'),
      params: RpcSendTransactionRequestSchema,
    }),
  );

export const JsonRpcRequest_for_statusSchema: v.GenericSchema<t.JsonRpcRequest_for_status> =
  v.lazy(() =>
    v.object({
      id: v.string(),
      jsonrpc: v.string(),
      method: v.literal('status'),
      params: RpcStatusRequestSchema,
    }),
  );

export const JsonRpcRequest_for_txSchema: v.GenericSchema<t.JsonRpcRequest_for_tx> =
  v.lazy(() =>
    v.object({
      id: v.string(),
      jsonrpc: v.string(),
      method: v.literal('tx'),
      params: RpcTransactionStatusRequestSchema,
    }),
  );

export const JsonRpcRequest_for_validatorsSchema: v.GenericSchema<t.JsonRpcRequest_for_validators> =
  v.lazy(() =>
    v.object({
      id: v.string(),
      jsonrpc: v.string(),
      method: v.literal('validators'),
      params: RpcValidatorRequestSchema,
    }),
  );

export const JsonRpcResponse_for_Array_of_Range_of_uint64_and_RpcErrorSchema: v.GenericSchema<t.JsonRpcResponse_for_Array_of_Range_of_uint64_and_RpcError> =
  v.lazy(() =>
    v.intersect([
      v.object({
        id: v.string(),
        jsonrpc: v.string(),
      }),
      v.union([
        v.object({
          result: v.array(Range_of_uint64Schema),
        }),
        v.object({
          error: RpcErrorSchema,
        }),
      ]),
    ]),
  );

export const JsonRpcResponse_for_Array_of_ValidatorStakeView_and_RpcErrorSchema: v.GenericSchema<t.JsonRpcResponse_for_Array_of_ValidatorStakeView_and_RpcError> =
  v.lazy(() =>
    v.intersect([
      v.object({
        id: v.string(),
        jsonrpc: v.string(),
      }),
      v.union([
        v.object({
          result: v.array(ValidatorStakeViewSchema),
        }),
        v.object({
          error: RpcErrorSchema,
        }),
      ]),
    ]),
  );

export const JsonRpcResponse_for_CryptoHash_and_RpcErrorSchema: v.GenericSchema<t.JsonRpcResponse_for_CryptoHash_and_RpcError> =
  v.lazy(() =>
    v.intersect([
      v.object({
        id: v.string(),
        jsonrpc: v.string(),
      }),
      v.union([
        v.object({
          result: CryptoHashSchema,
        }),
        v.object({
          error: RpcErrorSchema,
        }),
      ]),
    ]),
  );

export const JsonRpcResponse_for_GenesisConfig_and_RpcErrorSchema: v.GenericSchema<t.JsonRpcResponse_for_GenesisConfig_and_RpcError> =
  v.lazy(() =>
    v.intersect([
      v.object({
        id: v.string(),
        jsonrpc: v.string(),
      }),
      v.union([
        v.object({
          result: GenesisConfigSchema,
        }),
        v.object({
          error: RpcErrorSchema,
        }),
      ]),
    ]),
  );

export const JsonRpcResponse_for_Nullable_RpcHealthResponse_and_RpcErrorSchema: v.GenericSchema<t.JsonRpcResponse_for_Nullable_RpcHealthResponse_and_RpcError> =
  v.lazy(() =>
    v.intersect([
      v.object({
        id: v.string(),
        jsonrpc: v.string(),
      }),
      v.union([
        v.object({
          result: v.union([RpcHealthResponseSchema, v.null()]),
        }),
        v.object({
          error: RpcErrorSchema,
        }),
      ]),
    ]),
  );

export const JsonRpcResponse_for_RpcBlockResponse_and_RpcErrorSchema: v.GenericSchema<t.JsonRpcResponse_for_RpcBlockResponse_and_RpcError> =
  v.lazy(() =>
    v.intersect([
      v.object({
        id: v.string(),
        jsonrpc: v.string(),
      }),
      v.union([
        v.object({
          result: RpcBlockResponseSchema,
        }),
        v.object({
          error: RpcErrorSchema,
        }),
      ]),
    ]),
  );

export const JsonRpcResponse_for_RpcChunkResponse_and_RpcErrorSchema: v.GenericSchema<t.JsonRpcResponse_for_RpcChunkResponse_and_RpcError> =
  v.lazy(() =>
    v.intersect([
      v.object({
        id: v.string(),
        jsonrpc: v.string(),
      }),
      v.union([
        v.object({
          result: RpcChunkResponseSchema,
        }),
        v.object({
          error: RpcErrorSchema,
        }),
      ]),
    ]),
  );

export const JsonRpcResponse_for_RpcClientConfigResponse_and_RpcErrorSchema: v.GenericSchema<t.JsonRpcResponse_for_RpcClientConfigResponse_and_RpcError> =
  v.lazy(() =>
    v.intersect([
      v.object({
        id: v.string(),
        jsonrpc: v.string(),
      }),
      v.union([
        v.object({
          result: RpcClientConfigResponseSchema,
        }),
        v.object({
          error: RpcErrorSchema,
        }),
      ]),
    ]),
  );

export const JsonRpcResponse_for_RpcCongestionLevelResponse_and_RpcErrorSchema: v.GenericSchema<t.JsonRpcResponse_for_RpcCongestionLevelResponse_and_RpcError> =
  v.lazy(() =>
    v.intersect([
      v.object({
        id: v.string(),
        jsonrpc: v.string(),
      }),
      v.union([
        v.object({
          result: RpcCongestionLevelResponseSchema,
        }),
        v.object({
          error: RpcErrorSchema,
        }),
      ]),
    ]),
  );

export const JsonRpcResponse_for_RpcGasPriceResponse_and_RpcErrorSchema: v.GenericSchema<t.JsonRpcResponse_for_RpcGasPriceResponse_and_RpcError> =
  v.lazy(() =>
    v.intersect([
      v.object({
        id: v.string(),
        jsonrpc: v.string(),
      }),
      v.union([
        v.object({
          result: RpcGasPriceResponseSchema,
        }),
        v.object({
          error: RpcErrorSchema,
        }),
      ]),
    ]),
  );

export const JsonRpcResponse_for_RpcLightClientBlockProofResponse_and_RpcErrorSchema: v.GenericSchema<t.JsonRpcResponse_for_RpcLightClientBlockProofResponse_and_RpcError> =
  v.lazy(() =>
    v.intersect([
      v.object({
        id: v.string(),
        jsonrpc: v.string(),
      }),
      v.union([
        v.object({
          result: RpcLightClientBlockProofResponseSchema,
        }),
        v.object({
          error: RpcErrorSchema,
        }),
      ]),
    ]),
  );

export const JsonRpcResponse_for_RpcLightClientExecutionProofResponse_and_RpcErrorSchema: v.GenericSchema<t.JsonRpcResponse_for_RpcLightClientExecutionProofResponse_and_RpcError> =
  v.lazy(() =>
    v.intersect([
      v.object({
        id: v.string(),
        jsonrpc: v.string(),
      }),
      v.union([
        v.object({
          result: RpcLightClientExecutionProofResponseSchema,
        }),
        v.object({
          error: RpcErrorSchema,
        }),
      ]),
    ]),
  );

export const JsonRpcResponse_for_RpcLightClientNextBlockResponse_and_RpcErrorSchema: v.GenericSchema<t.JsonRpcResponse_for_RpcLightClientNextBlockResponse_and_RpcError> =
  v.lazy(() =>
    v.intersect([
      v.object({
        id: v.string(),
        jsonrpc: v.string(),
      }),
      v.union([
        v.object({
          result: RpcLightClientNextBlockResponseSchema,
        }),
        v.object({
          error: RpcErrorSchema,
        }),
      ]),
    ]),
  );

export const JsonRpcResponse_for_RpcNetworkInfoResponse_and_RpcErrorSchema: v.GenericSchema<t.JsonRpcResponse_for_RpcNetworkInfoResponse_and_RpcError> =
  v.lazy(() =>
    v.intersect([
      v.object({
        id: v.string(),
        jsonrpc: v.string(),
      }),
      v.union([
        v.object({
          result: RpcNetworkInfoResponseSchema,
        }),
        v.object({
          error: RpcErrorSchema,
        }),
      ]),
    ]),
  );

export const JsonRpcResponse_for_RpcProtocolConfigResponse_and_RpcErrorSchema: v.GenericSchema<t.JsonRpcResponse_for_RpcProtocolConfigResponse_and_RpcError> =
  v.lazy(() =>
    v.intersect([
      v.object({
        id: v.string(),
        jsonrpc: v.string(),
      }),
      v.union([
        v.object({
          result: RpcProtocolConfigResponseSchema,
        }),
        v.object({
          error: RpcErrorSchema,
        }),
      ]),
    ]),
  );

export const JsonRpcResponse_for_RpcQueryResponse_and_RpcErrorSchema: v.GenericSchema<t.JsonRpcResponse_for_RpcQueryResponse_and_RpcError> =
  v.lazy(() =>
    v.intersect([
      v.object({
        id: v.string(),
        jsonrpc: v.string(),
      }),
      v.union([
        v.object({
          result: RpcQueryResponseSchema,
        }),
        v.object({
          error: RpcErrorSchema,
        }),
      ]),
    ]),
  );

export const JsonRpcResponse_for_RpcReceiptResponse_and_RpcErrorSchema: v.GenericSchema<t.JsonRpcResponse_for_RpcReceiptResponse_and_RpcError> =
  v.lazy(() =>
    v.intersect([
      v.object({
        id: v.string(),
        jsonrpc: v.string(),
      }),
      v.union([
        v.object({
          result: RpcReceiptResponseSchema,
        }),
        v.object({
          error: RpcErrorSchema,
        }),
      ]),
    ]),
  );

export const JsonRpcResponse_for_RpcSplitStorageInfoResponse_and_RpcErrorSchema: v.GenericSchema<t.JsonRpcResponse_for_RpcSplitStorageInfoResponse_and_RpcError> =
  v.lazy(() =>
    v.intersect([
      v.object({
        id: v.string(),
        jsonrpc: v.string(),
      }),
      v.union([
        v.object({
          result: RpcSplitStorageInfoResponseSchema,
        }),
        v.object({
          error: RpcErrorSchema,
        }),
      ]),
    ]),
  );

export const JsonRpcResponse_for_RpcStateChangesInBlockByTypeResponse_and_RpcErrorSchema: v.GenericSchema<t.JsonRpcResponse_for_RpcStateChangesInBlockByTypeResponse_and_RpcError> =
  v.lazy(() =>
    v.intersect([
      v.object({
        id: v.string(),
        jsonrpc: v.string(),
      }),
      v.union([
        v.object({
          result: RpcStateChangesInBlockByTypeResponseSchema,
        }),
        v.object({
          error: RpcErrorSchema,
        }),
      ]),
    ]),
  );

export const JsonRpcResponse_for_RpcStateChangesInBlockResponse_and_RpcErrorSchema: v.GenericSchema<t.JsonRpcResponse_for_RpcStateChangesInBlockResponse_and_RpcError> =
  v.lazy(() =>
    v.intersect([
      v.object({
        id: v.string(),
        jsonrpc: v.string(),
      }),
      v.union([
        v.object({
          result: RpcStateChangesInBlockResponseSchema,
        }),
        v.object({
          error: RpcErrorSchema,
        }),
      ]),
    ]),
  );

export const JsonRpcResponse_for_RpcStatusResponse_and_RpcErrorSchema: v.GenericSchema<t.JsonRpcResponse_for_RpcStatusResponse_and_RpcError> =
  v.lazy(() =>
    v.intersect([
      v.object({
        id: v.string(),
        jsonrpc: v.string(),
      }),
      v.union([
        v.object({
          result: RpcStatusResponseSchema,
        }),
        v.object({
          error: RpcErrorSchema,
        }),
      ]),
    ]),
  );

export const JsonRpcResponse_for_RpcTransactionResponse_and_RpcErrorSchema: v.GenericSchema<t.JsonRpcResponse_for_RpcTransactionResponse_and_RpcError> =
  v.lazy(() =>
    v.intersect([
      v.object({
        id: v.string(),
        jsonrpc: v.string(),
      }),
      v.union([
        v.object({
          result: RpcTransactionResponseSchema,
        }),
        v.object({
          error: RpcErrorSchema,
        }),
      ]),
    ]),
  );

export const JsonRpcResponse_for_RpcValidatorResponse_and_RpcErrorSchema: v.GenericSchema<t.JsonRpcResponse_for_RpcValidatorResponse_and_RpcError> =
  v.lazy(() =>
    v.intersect([
      v.object({
        id: v.string(),
        jsonrpc: v.string(),
      }),
      v.union([
        v.object({
          result: RpcValidatorResponseSchema,
        }),
        v.object({
          error: RpcErrorSchema,
        }),
      ]),
    ]),
  );

export const KnownProducerViewSchema: v.GenericSchema<t.KnownProducerView> =
  v.lazy(() =>
    v.object({
      accountId: AccountIdSchema,
      nextHops: v.optional(v.union([v.array(PublicKeySchema), v.null()])),
      peerId: PublicKeySchema,
    }),
  );

export const LightClientBlockLiteViewSchema: v.GenericSchema<t.LightClientBlockLiteView> =
  v.lazy(() =>
    v.object({
      innerLite: BlockHeaderInnerLiteViewSchema,
      innerRestHash: CryptoHashSchema,
      prevBlockHash: CryptoHashSchema,
    }),
  );

export const LimitConfigSchema: v.GenericSchema<t.LimitConfig> = v.lazy(() =>
  v.object({
    accountIdValidityRulesVersion: AccountIdValidityRulesVersionSchema,
    initialMemoryPages: v.number(),
    maxActionsPerReceipt: v.number(),
    maxArgumentsLength: v.number(),
    maxContractSize: v.number(),
    maxFunctionsNumberPerContract: v.optional(v.union([v.number(), v.null()])),
    maxGasBurnt: v.number(),
    maxLengthMethodName: v.number(),
    maxLengthReturnedData: v.number(),
    maxLengthStorageKey: v.number(),
    maxLengthStorageValue: v.number(),
    maxLocalsPerContract: v.optional(v.union([v.number(), v.null()])),
    maxMemoryPages: v.number(),
    maxNumberBytesMethodNames: v.number(),
    maxNumberInputDataDependencies: v.number(),
    maxNumberLogs: v.number(),
    maxNumberRegisters: v.number(),
    maxPromisesPerFunctionCallAction: v.number(),
    maxReceiptSize: v.number(),
    maxRegisterSize: v.number(),
    maxStackHeight: v.number(),
    maxTotalLogLength: v.number(),
    maxTotalPrepaidGas: v.number(),
    maxTransactionSize: v.number(),
    maxYieldPayloadSize: v.number(),
    perReceiptStorageProofSizeLimit: v.number(),
    registersMemoryLimit: v.number(),
    yieldTimeoutLengthInBlocks: v.number(),
  }),
);

export const LogSummaryStyleSchema: v.GenericSchema<t.LogSummaryStyle> = v.lazy(
  () => v.union([v.literal('plain'), v.literal('colored')]),
);

export const MerklePathItemSchema: v.GenericSchema<t.MerklePathItem> = v.lazy(
  () =>
    v.object({
      direction: DirectionSchema,
      hash: CryptoHashSchema,
    }),
);

export const MethodResolveErrorSchema: v.GenericSchema<t.MethodResolveError> =
  v.lazy(() =>
    v.union([
      v.literal('MethodEmptyName'),
      v.literal('MethodNotFound'),
      v.literal('MethodInvalidSignature'),
    ]),
  );

export const MissingTrieValueSchema: v.GenericSchema<t.MissingTrieValue> =
  v.lazy(() =>
    v.object({
      context: MissingTrieValueContextSchema,
      hash: CryptoHashSchema,
    }),
  );

export const MissingTrieValueContextSchema: v.GenericSchema<t.MissingTrieValueContext> =
  v.lazy(() =>
    v.union([
      v.literal('TrieIterator'),
      v.literal('TriePrefetchingStorage'),
      v.literal('TrieMemoryPartialStorage'),
      v.literal('TrieStorage'),
    ]),
  );

export const MutableConfigValueSchema: v.GenericSchema<t.MutableConfigValue> =
  v.lazy(() => v.string());

export const NetworkInfoViewSchema: v.GenericSchema<t.NetworkInfoView> = v.lazy(
  () =>
    v.object({
      connectedPeers: v.array(PeerInfoViewSchema),
      knownProducers: v.array(KnownProducerViewSchema),
      numConnectedPeers: v.number(),
      peerMaxCount: v.number(),
      tier1AccountsData: v.array(AccountDataViewSchema),
      tier1AccountsKeys: v.array(PublicKeySchema),
      tier1Connections: v.array(PeerInfoViewSchema),
    }),
);

export const NextEpochValidatorInfoSchema: v.GenericSchema<t.NextEpochValidatorInfo> =
  v.lazy(() =>
    v.object({
      accountId: AccountIdSchema,
      publicKey: PublicKeySchema,
      shards: v.array(ShardIdSchema),
      stake: v.string(),
    }),
  );

export const NonDelegateActionSchema: v.GenericSchema<t.NonDelegateAction> =
  v.lazy(() => ActionSchema);

export const PeerIdSchema: v.GenericSchema<t.PeerId> = v.lazy(
  () => PublicKeySchema,
);

export const PeerInfoViewSchema: v.GenericSchema<t.PeerInfoView> = v.lazy(() =>
  v.object({
    accountId: v.optional(v.union([AccountIdSchema, v.null()])),
    addr: v.string(),
    archival: v.boolean(),
    blockHash: v.optional(v.union([CryptoHashSchema, v.null()])),
    connectionEstablishedTimeMillis: v.number(),
    height: v.optional(v.union([v.number(), v.null()])),
    isHighestBlockInvalid: v.boolean(),
    isOutboundPeer: v.boolean(),
    lastTimePeerRequestedMillis: v.number(),
    lastTimeReceivedMessageMillis: v.number(),
    nonce: v.number(),
    peerId: PublicKeySchema,
    receivedBytesPerSec: v.number(),
    sentBytesPerSec: v.number(),
    trackedShards: v.array(ShardIdSchema),
  }),
);

export const PrepareErrorSchema: v.GenericSchema<t.PrepareError> = v.lazy(() =>
  v.union([
    v.literal('Serialization'),
    v.literal('Deserialization'),
    v.literal('InternalMemoryDeclared'),
    v.literal('GasInstrumentation'),
    v.literal('StackHeightInstrumentation'),
    v.literal('Instantiate'),
    v.literal('Memory'),
    v.literal('TooManyFunctions'),
    v.literal('TooManyLocals'),
  ]),
);

export const PublicKeySchema: v.GenericSchema<t.PublicKey> = v.lazy(() =>
  v.string(),
);

export const Range_of_uint64Schema: v.GenericSchema<t.Range_of_uint64> = v.lazy(
  () =>
    v.object({
      end: v.number(),
      start: v.number(),
    }),
);

export const ReceiptEnumViewSchema: v.GenericSchema<t.ReceiptEnumView> = v.lazy(
  () =>
    v.union([
      v.object({
        Action: v.object({
          actions: v.array(ActionViewSchema),
          gasPrice: v.string(),
          inputDataIds: v.array(CryptoHashSchema),
          isPromiseYield: v.boolean(),
          outputDataReceivers: v.array(DataReceiverViewSchema),
          signerId: AccountIdSchema,
          signerPublicKey: PublicKeySchema,
        }),
      }),
      v.object({
        Data: v.object({
          data: v.union([v.string(), v.null()]),
          dataId: CryptoHashSchema,
          isPromiseResume: v.boolean(),
        }),
      }),
      v.object({
        GlobalContractDistribution: v.object({
          alreadyDeliveredShards: v.array(ShardIdSchema),
          code: v.string(),
          id: GlobalContractIdentifierSchema,
          targetShard: ShardIdSchema,
        }),
      }),
    ]),
);

export const ReceiptValidationErrorSchema: v.GenericSchema<t.ReceiptValidationError> =
  v.lazy(() =>
    v.union([
      v.object({
        InvalidPredecessorId: v.object({
          accountId: v.string(),
        }),
      }),
      v.object({
        InvalidReceiverId: v.object({
          accountId: v.string(),
        }),
      }),
      v.object({
        InvalidSignerId: v.object({
          accountId: v.string(),
        }),
      }),
      v.object({
        InvalidDataReceiverId: v.object({
          accountId: v.string(),
        }),
      }),
      v.object({
        ReturnedValueLengthExceeded: v.object({
          length: v.number(),
          limit: v.number(),
        }),
      }),
      v.object({
        NumberInputDataDependenciesExceeded: v.object({
          limit: v.number(),
          numberOfInputDataDependencies: v.number(),
        }),
      }),
      v.object({
        ActionsValidation: ActionsValidationErrorSchema,
      }),
      v.object({
        ReceiptSizeExceeded: v.object({
          limit: v.number(),
          size: v.number(),
        }),
      }),
    ]),
  );

export const ReceiptViewSchema: v.GenericSchema<t.ReceiptView> = v.lazy(() =>
  v.object({
    predecessorId: AccountIdSchema,
    priority: v.number(),
    receipt: ReceiptEnumViewSchema,
    receiptId: CryptoHashSchema,
    receiverId: AccountIdSchema,
  }),
);

export const RpcBlockRequestSchema: v.GenericSchema<t.RpcBlockRequest> = v.lazy(
  () =>
    v.union([
      v.object({
        blockId: BlockIdSchema,
      }),
      v.object({
        finality: FinalitySchema,
      }),
      v.object({
        syncCheckpoint: SyncCheckpointSchema,
      }),
    ]),
);

export const RpcBlockResponseSchema: v.GenericSchema<t.RpcBlockResponse> =
  v.lazy(() =>
    v.object({
      author: AccountIdSchema,
      chunks: v.array(ChunkHeaderViewSchema),
      header: BlockHeaderViewSchema,
    }),
  );

export const RpcChunkRequestSchema: v.GenericSchema<t.RpcChunkRequest> = v.lazy(
  () =>
    v.union([
      v.object({
        blockId: BlockIdSchema,
        shardId: ShardIdSchema,
      }),
      v.object({
        chunkId: CryptoHashSchema,
      }),
    ]),
);

export const RpcChunkResponseSchema: v.GenericSchema<t.RpcChunkResponse> =
  v.lazy(() =>
    v.object({
      author: AccountIdSchema,
      header: ChunkHeaderViewSchema,
      receipts: v.array(ReceiptViewSchema),
      transactions: v.array(SignedTransactionViewSchema),
    }),
  );

export const RpcClientConfigRequestSchema: v.GenericSchema<t.RpcClientConfigRequest> =
  v.lazy(() => v.null());

export const RpcClientConfigResponseSchema: v.GenericSchema<t.RpcClientConfigResponse> =
  v.lazy(() =>
    v.object({
      archive: v.boolean(),
      blockFetchHorizon: v.number(),
      blockHeaderFetchHorizon: v.number(),
      blockProductionTrackingDelay: v.array(v.number()),
      catchupStepPeriod: v.array(v.number()),
      chainId: v.string(),
      chunkDistributionNetwork: v.optional(
        v.union([ChunkDistributionNetworkConfigSchema, v.null()]),
      ),
      chunkRequestRetryPeriod: v.array(v.number()),
      chunkValidationThreads: v.number(),
      chunkWaitMult: v.array(v.number()),
      clientBackgroundMigrationThreads: v.number(),
      doomslugStepPeriod: v.array(v.number()),
      enableMultilineLogging: v.boolean(),
      enableStatisticsExport: v.boolean(),
      epochLength: v.number(),
      epochSync: EpochSyncConfigSchema,
      expectedShutdown: MutableConfigValueSchema,
      gc: GCConfigSchema,
      headerSyncExpectedHeightPerSecond: v.number(),
      headerSyncInitialTimeout: v.array(v.number()),
      headerSyncProgressTimeout: v.array(v.number()),
      headerSyncStallBanTimeout: v.array(v.number()),
      logSummaryPeriod: v.array(v.number()),
      logSummaryStyle: LogSummaryStyleSchema,
      maxBlockProductionDelay: v.array(v.number()),
      maxBlockWaitDelay: v.array(v.number()),
      maxGasBurntView: v.optional(v.union([v.number(), v.null()])),
      minBlockProductionDelay: v.array(v.number()),
      minNumPeers: v.number(),
      numBlockProducerSeats: v.number(),
      orphanStateWitnessMaxSize: v.number(),
      orphanStateWitnessPoolSize: v.number(),
      produceChunkAddTransactionsTimeLimit: v.string(),
      produceEmptyBlocks: v.boolean(),
      reshardingConfig: MutableConfigValueSchema,
      rpcAddr: v.optional(v.union([v.string(), v.null()])),
      saveInvalidWitnesses: v.boolean(),
      saveLatestWitnesses: v.boolean(),
      saveTrieChanges: v.boolean(),
      saveTxOutcomes: v.boolean(),
      skipSyncWait: v.boolean(),
      stateRequestServerThreads: v.number(),
      stateRequestThrottlePeriod: v.array(v.number()),
      stateRequestsPerThrottlePeriod: v.number(),
      stateSync: StateSyncConfigSchema,
      stateSyncEnabled: v.boolean(),
      stateSyncExternalBackoff: v.array(v.number()),
      stateSyncExternalTimeout: v.array(v.number()),
      stateSyncP2pTimeout: v.array(v.number()),
      stateSyncRetryBackoff: v.array(v.number()),
      syncCheckPeriod: v.array(v.number()),
      syncHeightThreshold: v.number(),
      syncMaxBlockRequests: v.number(),
      syncStepPeriod: v.array(v.number()),
      trackedShardsConfig: TrackedShardsConfigSchema,
      transactionPoolSizeLimit: v.optional(v.union([v.number(), v.null()])),
      transactionRequestHandlerThreads: v.number(),
      trieViewerStateSizeLimit: v.optional(v.union([v.number(), v.null()])),
      ttlAccountIdRouter: v.array(v.number()),
      txRoutingHeightHorizon: v.number(),
      version: VersionSchema,
      viewClientThreads: v.number(),
    }),
  );

export const RpcCongestionLevelRequestSchema: v.GenericSchema<t.RpcCongestionLevelRequest> =
  v.lazy(() =>
    v.union([
      v.object({
        blockId: BlockIdSchema,
        shardId: ShardIdSchema,
      }),
      v.object({
        chunkId: CryptoHashSchema,
      }),
    ]),
  );

export const RpcCongestionLevelResponseSchema: v.GenericSchema<t.RpcCongestionLevelResponse> =
  v.lazy(() =>
    v.object({
      congestionLevel: v.number(),
    }),
  );

export const RpcErrorSchema: v.GenericSchema<t.RpcError> = v.lazy(() =>
  v.intersect([
    v.object({
      cause: v.optional(v.unknown()),
      code: v.number(),
      data: v.optional(v.unknown()),
      message: v.string(),
      name: v.optional(v.unknown()),
    }),
    v.union([
      v.object({
        cause: v.optional(RpcRequestValidationErrorKindSchema),
        name: v.literal('REQUEST_VALIDATION_ERROR'),
      }),
      v.object({
        cause: v.optional(v.unknown()),
        name: v.literal('HANDLER_ERROR'),
      }),
      v.object({
        cause: v.optional(v.unknown()),
        name: v.literal('INTERNAL_ERROR'),
      }),
    ]),
  ]),
);

export const RpcGasPriceRequestSchema: v.GenericSchema<t.RpcGasPriceRequest> =
  v.lazy(() =>
    v.object({
      blockId: v.optional(v.union([BlockIdSchema, v.null()])),
    }),
  );

export const RpcGasPriceResponseSchema: v.GenericSchema<t.RpcGasPriceResponse> =
  v.lazy(() =>
    v.object({
      gasPrice: v.string(),
    }),
  );

export const RpcHealthRequestSchema: v.GenericSchema<t.RpcHealthRequest> =
  v.lazy(() => v.null());

export const RpcHealthResponseSchema: v.GenericSchema<t.RpcHealthResponse> =
  v.lazy(() => v.null());

export const RpcKnownProducerSchema: v.GenericSchema<t.RpcKnownProducer> =
  v.lazy(() =>
    v.object({
      accountId: AccountIdSchema,
      addr: v.optional(v.union([v.string(), v.null()])),
      peerId: PeerIdSchema,
    }),
  );

export const RpcLightClientBlockProofRequestSchema: v.GenericSchema<t.RpcLightClientBlockProofRequest> =
  v.lazy(() =>
    v.object({
      blockHash: CryptoHashSchema,
      lightClientHead: CryptoHashSchema,
    }),
  );

export const RpcLightClientBlockProofResponseSchema: v.GenericSchema<t.RpcLightClientBlockProofResponse> =
  v.lazy(() =>
    v.object({
      blockHeaderLite: LightClientBlockLiteViewSchema,
      blockProof: v.array(MerklePathItemSchema),
    }),
  );

export const RpcLightClientExecutionProofRequestSchema: v.GenericSchema<t.RpcLightClientExecutionProofRequest> =
  v.lazy(() =>
    v.intersect([
      v.object({
        lightClientHead: CryptoHashSchema,
      }),
      v.union([
        v.object({
          senderId: AccountIdSchema,
          transactionHash: CryptoHashSchema,
          type: v.literal('transaction'),
        }),
        v.object({
          receiptId: CryptoHashSchema,
          receiverId: AccountIdSchema,
          type: v.literal('receipt'),
        }),
      ]),
    ]),
  );

export const RpcLightClientExecutionProofResponseSchema: v.GenericSchema<t.RpcLightClientExecutionProofResponse> =
  v.lazy(() =>
    v.object({
      blockHeaderLite: LightClientBlockLiteViewSchema,
      blockProof: v.array(MerklePathItemSchema),
      outcomeProof: ExecutionOutcomeWithIdViewSchema,
      outcomeRootProof: v.array(MerklePathItemSchema),
    }),
  );

export const RpcLightClientNextBlockRequestSchema: v.GenericSchema<t.RpcLightClientNextBlockRequest> =
  v.lazy(() =>
    v.object({
      lastBlockHash: CryptoHashSchema,
    }),
  );

export const RpcLightClientNextBlockResponseSchema: v.GenericSchema<t.RpcLightClientNextBlockResponse> =
  v.lazy(() =>
    v.object({
      approvalsAfterNext: v.optional(
        v.array(v.union([SignatureSchema, v.null()])),
      ),
      innerLite: v.optional(BlockHeaderInnerLiteViewSchema),
      innerRestHash: v.optional(CryptoHashSchema),
      nextBlockInnerHash: v.optional(CryptoHashSchema),
      nextBps: v.optional(
        v.union([v.array(ValidatorStakeViewSchema), v.null()]),
      ),
      prevBlockHash: v.optional(CryptoHashSchema),
    }),
  );

export const RpcMaintenanceWindowsRequestSchema: v.GenericSchema<t.RpcMaintenanceWindowsRequest> =
  v.lazy(() =>
    v.object({
      accountId: AccountIdSchema,
    }),
  );

export const RpcNetworkInfoRequestSchema: v.GenericSchema<t.RpcNetworkInfoRequest> =
  v.lazy(() => v.null());

export const RpcNetworkInfoResponseSchema: v.GenericSchema<t.RpcNetworkInfoResponse> =
  v.lazy(() =>
    v.object({
      activePeers: v.array(RpcPeerInfoSchema),
      knownProducers: v.array(RpcKnownProducerSchema),
      numActivePeers: v.number(),
      peerMaxCount: v.number(),
      receivedBytesPerSec: v.number(),
      sentBytesPerSec: v.number(),
    }),
  );

export const RpcPeerInfoSchema: v.GenericSchema<t.RpcPeerInfo> = v.lazy(() =>
  v.object({
    accountId: v.optional(v.union([AccountIdSchema, v.null()])),
    addr: v.optional(v.union([v.string(), v.null()])),
    id: PeerIdSchema,
  }),
);

export const RpcProtocolConfigRequestSchema: v.GenericSchema<t.RpcProtocolConfigRequest> =
  v.lazy(() =>
    v.union([
      v.object({
        blockId: BlockIdSchema,
      }),
      v.object({
        finality: FinalitySchema,
      }),
      v.object({
        syncCheckpoint: SyncCheckpointSchema,
      }),
    ]),
  );

export const RpcProtocolConfigResponseSchema: v.GenericSchema<t.RpcProtocolConfigResponse> =
  v.lazy(() =>
    v.object({
      avgHiddenValidatorSeatsPerShard: v.array(v.number()),
      blockProducerKickoutThreshold: v.number(),
      chainId: v.string(),
      chunkProducerKickoutThreshold: v.number(),
      chunkValidatorOnlyKickoutThreshold: v.number(),
      dynamicResharding: v.boolean(),
      epochLength: v.number(),
      fishermenThreshold: v.string(),
      gasLimit: v.number(),
      gasPriceAdjustmentRate: v.array(v.number()),
      genesisHeight: v.number(),
      genesisTime: v.string(),
      maxGasPrice: v.string(),
      maxInflationRate: v.array(v.number()),
      maxKickoutStakePerc: v.number(),
      minGasPrice: v.string(),
      minimumStakeDivisor: v.number(),
      minimumStakeRatio: v.array(v.number()),
      minimumValidatorsPerShard: v.number(),
      numBlockProducerSeats: v.number(),
      numBlockProducerSeatsPerShard: v.array(v.number()),
      numBlocksPerYear: v.number(),
      onlineMaxThreshold: v.array(v.number()),
      onlineMinThreshold: v.array(v.number()),
      protocolRewardRate: v.array(v.number()),
      protocolTreasuryAccount: AccountIdSchema,
      protocolUpgradeStakeThreshold: v.array(v.number()),
      protocolVersion: v.number(),
      runtimeConfig: RuntimeConfigViewSchema,
      shardLayout: ShardLayoutSchema,
      shuffleShardAssignmentForChunkProducers: v.boolean(),
      targetValidatorMandatesPerShard: v.number(),
      transactionValidityPeriod: v.number(),
    }),
  );

export const RpcQueryRequestSchema: v.GenericSchema<t.RpcQueryRequest> = v.lazy(
  () =>
    v.union([
      v.intersect([
        v.object({
          blockId: BlockIdSchema,
        }),
        v.object({
          accountId: AccountIdSchema,
          requestType: v.literal('view_account'),
        }),
      ]),
      v.intersect([
        v.object({
          blockId: BlockIdSchema,
        }),
        v.object({
          accountId: AccountIdSchema,
          requestType: v.literal('view_code'),
        }),
      ]),
      v.intersect([
        v.object({
          blockId: BlockIdSchema,
        }),
        v.object({
          accountId: AccountIdSchema,
          includeProof: v.optional(v.boolean()),
          prefixBase64: StoreKeySchema,
          requestType: v.literal('view_state'),
        }),
      ]),
      v.intersect([
        v.object({
          blockId: BlockIdSchema,
        }),
        v.object({
          accountId: AccountIdSchema,
          publicKey: PublicKeySchema,
          requestType: v.literal('view_access_key'),
        }),
      ]),
      v.intersect([
        v.object({
          blockId: BlockIdSchema,
        }),
        v.object({
          accountId: AccountIdSchema,
          requestType: v.literal('view_access_key_list'),
        }),
      ]),
      v.intersect([
        v.object({
          blockId: BlockIdSchema,
        }),
        v.object({
          accountId: AccountIdSchema,
          argsBase64: FunctionArgsSchema,
          methodName: v.string(),
          requestType: v.literal('call_function'),
        }),
      ]),
      v.intersect([
        v.object({
          blockId: BlockIdSchema,
        }),
        v.object({
          codeHash: CryptoHashSchema,
          requestType: v.literal('view_global_contract_code'),
        }),
      ]),
      v.intersect([
        v.object({
          blockId: BlockIdSchema,
        }),
        v.object({
          accountId: AccountIdSchema,
          requestType: v.literal('view_global_contract_code_by_account_id'),
        }),
      ]),
      v.intersect([
        v.object({
          finality: FinalitySchema,
        }),
        v.object({
          accountId: AccountIdSchema,
          requestType: v.literal('view_account'),
        }),
      ]),
      v.intersect([
        v.object({
          finality: FinalitySchema,
        }),
        v.object({
          accountId: AccountIdSchema,
          requestType: v.literal('view_code'),
        }),
      ]),
      v.intersect([
        v.object({
          finality: FinalitySchema,
        }),
        v.object({
          accountId: AccountIdSchema,
          includeProof: v.optional(v.boolean()),
          prefixBase64: StoreKeySchema,
          requestType: v.literal('view_state'),
        }),
      ]),
      v.intersect([
        v.object({
          finality: FinalitySchema,
        }),
        v.object({
          accountId: AccountIdSchema,
          publicKey: PublicKeySchema,
          requestType: v.literal('view_access_key'),
        }),
      ]),
      v.intersect([
        v.object({
          finality: FinalitySchema,
        }),
        v.object({
          accountId: AccountIdSchema,
          requestType: v.literal('view_access_key_list'),
        }),
      ]),
      v.intersect([
        v.object({
          finality: FinalitySchema,
        }),
        v.object({
          accountId: AccountIdSchema,
          argsBase64: FunctionArgsSchema,
          methodName: v.string(),
          requestType: v.literal('call_function'),
        }),
      ]),
      v.intersect([
        v.object({
          finality: FinalitySchema,
        }),
        v.object({
          codeHash: CryptoHashSchema,
          requestType: v.literal('view_global_contract_code'),
        }),
      ]),
      v.intersect([
        v.object({
          finality: FinalitySchema,
        }),
        v.object({
          accountId: AccountIdSchema,
          requestType: v.literal('view_global_contract_code_by_account_id'),
        }),
      ]),
      v.intersect([
        v.object({
          syncCheckpoint: SyncCheckpointSchema,
        }),
        v.object({
          accountId: AccountIdSchema,
          requestType: v.literal('view_account'),
        }),
      ]),
      v.intersect([
        v.object({
          syncCheckpoint: SyncCheckpointSchema,
        }),
        v.object({
          accountId: AccountIdSchema,
          requestType: v.literal('view_code'),
        }),
      ]),
      v.intersect([
        v.object({
          syncCheckpoint: SyncCheckpointSchema,
        }),
        v.object({
          accountId: AccountIdSchema,
          includeProof: v.optional(v.boolean()),
          prefixBase64: StoreKeySchema,
          requestType: v.literal('view_state'),
        }),
      ]),
      v.intersect([
        v.object({
          syncCheckpoint: SyncCheckpointSchema,
        }),
        v.object({
          accountId: AccountIdSchema,
          publicKey: PublicKeySchema,
          requestType: v.literal('view_access_key'),
        }),
      ]),
      v.intersect([
        v.object({
          syncCheckpoint: SyncCheckpointSchema,
        }),
        v.object({
          accountId: AccountIdSchema,
          requestType: v.literal('view_access_key_list'),
        }),
      ]),
      v.intersect([
        v.object({
          syncCheckpoint: SyncCheckpointSchema,
        }),
        v.object({
          accountId: AccountIdSchema,
          argsBase64: FunctionArgsSchema,
          methodName: v.string(),
          requestType: v.literal('call_function'),
        }),
      ]),
      v.intersect([
        v.object({
          syncCheckpoint: SyncCheckpointSchema,
        }),
        v.object({
          codeHash: CryptoHashSchema,
          requestType: v.literal('view_global_contract_code'),
        }),
      ]),
      v.intersect([
        v.object({
          syncCheckpoint: SyncCheckpointSchema,
        }),
        v.object({
          accountId: AccountIdSchema,
          requestType: v.literal('view_global_contract_code_by_account_id'),
        }),
      ]),
    ]),
);

export const RpcQueryResponseSchema: v.GenericSchema<t.RpcQueryResponse> =
  v.lazy(() =>
    v.intersect([
      v.object({
        blockHash: CryptoHashSchema,
        blockHeight: v.number(),
      }),
      v.union([
        AccountViewSchema,
        ContractCodeViewSchema,
        ViewStateResultSchema,
        CallResultSchema,
        AccessKeyViewSchema,
        AccessKeyListSchema,
      ]),
    ]),
  );

export const RpcReceiptRequestSchema: v.GenericSchema<t.RpcReceiptRequest> =
  v.lazy(() =>
    v.object({
      receiptId: CryptoHashSchema,
    }),
  );

export const RpcReceiptResponseSchema: v.GenericSchema<t.RpcReceiptResponse> =
  v.lazy(() =>
    v.object({
      predecessorId: AccountIdSchema,
      priority: v.number(),
      receipt: ReceiptEnumViewSchema,
      receiptId: CryptoHashSchema,
      receiverId: AccountIdSchema,
    }),
  );

export const RpcRequestValidationErrorKindSchema: v.GenericSchema<t.RpcRequestValidationErrorKind> =
  v.lazy(() =>
    v.union([
      v.object({
        info: v.object({
          methodName: v.string(),
        }),
        name: v.literal('METHOD_NOT_FOUND'),
      }),
      v.object({
        info: v.object({
          errorMessage: v.string(),
        }),
        name: v.literal('PARSE_ERROR'),
      }),
    ]),
  );

export const RpcSendTransactionRequestSchema: v.GenericSchema<t.RpcSendTransactionRequest> =
  v.lazy(() =>
    v.object({
      signedTxBase64: SignedTransactionSchema,
      waitUntil: TxExecutionStatusSchema,
    }),
  );

export const RpcSplitStorageInfoRequestSchema: v.GenericSchema<t.RpcSplitStorageInfoRequest> =
  v.lazy(() => v.object({}));

export const RpcSplitStorageInfoResponseSchema: v.GenericSchema<t.RpcSplitStorageInfoResponse> =
  v.lazy(() =>
    v.object({
      coldHeadHeight: v.optional(v.union([v.number(), v.null()])),
      finalHeadHeight: v.optional(v.union([v.number(), v.null()])),
      headHeight: v.optional(v.union([v.number(), v.null()])),
      hotDbKind: v.optional(v.union([v.string(), v.null()])),
    }),
  );

export const RpcStateChangesInBlockByTypeRequestSchema: v.GenericSchema<t.RpcStateChangesInBlockByTypeRequest> =
  v.lazy(() =>
    v.union([
      v.intersect([
        v.object({
          blockId: BlockIdSchema,
        }),
        v.object({
          accountIds: v.array(AccountIdSchema),
          changesType: v.literal('account_changes'),
        }),
      ]),
      v.intersect([
        v.object({
          blockId: BlockIdSchema,
        }),
        v.object({
          changesType: v.literal('single_access_key_changes'),
          keys: v.array(AccountWithPublicKeySchema),
        }),
      ]),
      v.intersect([
        v.object({
          blockId: BlockIdSchema,
        }),
        v.object({
          changesType: v.literal('single_gas_key_changes'),
          keys: v.array(AccountWithPublicKeySchema),
        }),
      ]),
      v.intersect([
        v.object({
          blockId: BlockIdSchema,
        }),
        v.object({
          accountIds: v.array(AccountIdSchema),
          changesType: v.literal('all_access_key_changes'),
        }),
      ]),
      v.intersect([
        v.object({
          blockId: BlockIdSchema,
        }),
        v.object({
          accountIds: v.array(AccountIdSchema),
          changesType: v.literal('all_gas_key_changes'),
        }),
      ]),
      v.intersect([
        v.object({
          blockId: BlockIdSchema,
        }),
        v.object({
          accountIds: v.array(AccountIdSchema),
          changesType: v.literal('contract_code_changes'),
        }),
      ]),
      v.intersect([
        v.object({
          blockId: BlockIdSchema,
        }),
        v.object({
          accountIds: v.array(AccountIdSchema),
          changesType: v.literal('data_changes'),
          keyPrefixBase64: StoreKeySchema,
        }),
      ]),
      v.intersect([
        v.object({
          finality: FinalitySchema,
        }),
        v.object({
          accountIds: v.array(AccountIdSchema),
          changesType: v.literal('account_changes'),
        }),
      ]),
      v.intersect([
        v.object({
          finality: FinalitySchema,
        }),
        v.object({
          changesType: v.literal('single_access_key_changes'),
          keys: v.array(AccountWithPublicKeySchema),
        }),
      ]),
      v.intersect([
        v.object({
          finality: FinalitySchema,
        }),
        v.object({
          changesType: v.literal('single_gas_key_changes'),
          keys: v.array(AccountWithPublicKeySchema),
        }),
      ]),
      v.intersect([
        v.object({
          finality: FinalitySchema,
        }),
        v.object({
          accountIds: v.array(AccountIdSchema),
          changesType: v.literal('all_access_key_changes'),
        }),
      ]),
      v.intersect([
        v.object({
          finality: FinalitySchema,
        }),
        v.object({
          accountIds: v.array(AccountIdSchema),
          changesType: v.literal('all_gas_key_changes'),
        }),
      ]),
      v.intersect([
        v.object({
          finality: FinalitySchema,
        }),
        v.object({
          accountIds: v.array(AccountIdSchema),
          changesType: v.literal('contract_code_changes'),
        }),
      ]),
      v.intersect([
        v.object({
          finality: FinalitySchema,
        }),
        v.object({
          accountIds: v.array(AccountIdSchema),
          changesType: v.literal('data_changes'),
          keyPrefixBase64: StoreKeySchema,
        }),
      ]),
      v.intersect([
        v.object({
          syncCheckpoint: SyncCheckpointSchema,
        }),
        v.object({
          accountIds: v.array(AccountIdSchema),
          changesType: v.literal('account_changes'),
        }),
      ]),
      v.intersect([
        v.object({
          syncCheckpoint: SyncCheckpointSchema,
        }),
        v.object({
          changesType: v.literal('single_access_key_changes'),
          keys: v.array(AccountWithPublicKeySchema),
        }),
      ]),
      v.intersect([
        v.object({
          syncCheckpoint: SyncCheckpointSchema,
        }),
        v.object({
          changesType: v.literal('single_gas_key_changes'),
          keys: v.array(AccountWithPublicKeySchema),
        }),
      ]),
      v.intersect([
        v.object({
          syncCheckpoint: SyncCheckpointSchema,
        }),
        v.object({
          accountIds: v.array(AccountIdSchema),
          changesType: v.literal('all_access_key_changes'),
        }),
      ]),
      v.intersect([
        v.object({
          syncCheckpoint: SyncCheckpointSchema,
        }),
        v.object({
          accountIds: v.array(AccountIdSchema),
          changesType: v.literal('all_gas_key_changes'),
        }),
      ]),
      v.intersect([
        v.object({
          syncCheckpoint: SyncCheckpointSchema,
        }),
        v.object({
          accountIds: v.array(AccountIdSchema),
          changesType: v.literal('contract_code_changes'),
        }),
      ]),
      v.intersect([
        v.object({
          syncCheckpoint: SyncCheckpointSchema,
        }),
        v.object({
          accountIds: v.array(AccountIdSchema),
          changesType: v.literal('data_changes'),
          keyPrefixBase64: StoreKeySchema,
        }),
      ]),
    ]),
  );

export const RpcStateChangesInBlockByTypeResponseSchema: v.GenericSchema<t.RpcStateChangesInBlockByTypeResponse> =
  v.lazy(() =>
    v.object({
      blockHash: CryptoHashSchema,
      changes: v.array(StateChangeKindViewSchema),
    }),
  );

export const RpcStateChangesInBlockRequestSchema: v.GenericSchema<t.RpcStateChangesInBlockRequest> =
  v.lazy(() =>
    v.union([
      v.object({
        blockId: BlockIdSchema,
      }),
      v.object({
        finality: FinalitySchema,
      }),
      v.object({
        syncCheckpoint: SyncCheckpointSchema,
      }),
    ]),
  );

export const RpcStateChangesInBlockResponseSchema: v.GenericSchema<t.RpcStateChangesInBlockResponse> =
  v.lazy(() =>
    v.object({
      blockHash: CryptoHashSchema,
      changes: v.array(StateChangeWithCauseViewSchema),
    }),
  );

export const RpcStatusRequestSchema: v.GenericSchema<t.RpcStatusRequest> =
  v.lazy(() => v.null());

export const RpcStatusResponseSchema: v.GenericSchema<t.RpcStatusResponse> =
  v.lazy(() =>
    v.object({
      chainId: v.string(),
      detailedDebugStatus: v.optional(
        v.union([DetailedDebugStatusSchema, v.null()]),
      ),
      genesisHash: CryptoHashSchema,
      latestProtocolVersion: v.number(),
      nodeKey: v.optional(v.union([PublicKeySchema, v.null()])),
      nodePublicKey: PublicKeySchema,
      protocolVersion: v.number(),
      rpcAddr: v.optional(v.union([v.string(), v.null()])),
      syncInfo: StatusSyncInfoSchema,
      uptimeSec: v.number(),
      validatorAccountId: v.optional(v.union([AccountIdSchema, v.null()])),
      validatorPublicKey: v.optional(v.union([PublicKeySchema, v.null()])),
      validators: v.array(ValidatorInfoSchema),
      version: VersionSchema,
    }),
  );

export const RpcTransactionResponseSchema: v.GenericSchema<t.RpcTransactionResponse> =
  v.lazy(() =>
    v.intersect([
      v.object({
        finalExecutionStatus: TxExecutionStatusSchema,
      }),
      v.union([
        FinalExecutionOutcomeWithReceiptViewSchema,
        FinalExecutionOutcomeViewSchema,
      ]),
    ]),
  );

export const RpcTransactionStatusRequestSchema: v.GenericSchema<t.RpcTransactionStatusRequest> =
  v.lazy(() =>
    v.intersect([
      v.object({
        waitUntil: TxExecutionStatusSchema,
      }),
      v.union([
        v.object({
          signedTxBase64: SignedTransactionSchema,
        }),
        v.object({
          senderAccountId: AccountIdSchema,
          txHash: CryptoHashSchema,
        }),
      ]),
    ]),
  );

export const RpcValidatorRequestSchema: v.GenericSchema<t.RpcValidatorRequest> =
  v.lazy(() =>
    v.union([
      v.literal('latest'),
      v.object({
        epochId: EpochIdSchema,
      }),
      v.object({
        blockId: BlockIdSchema,
      }),
    ]),
  );

export const RpcValidatorResponseSchema: v.GenericSchema<t.RpcValidatorResponse> =
  v.lazy(() =>
    v.object({
      currentFishermen: v.array(ValidatorStakeViewSchema),
      currentProposals: v.array(ValidatorStakeViewSchema),
      currentValidators: v.array(CurrentEpochValidatorInfoSchema),
      epochHeight: v.number(),
      epochStartHeight: v.number(),
      nextFishermen: v.array(ValidatorStakeViewSchema),
      nextValidators: v.array(NextEpochValidatorInfoSchema),
      prevEpochKickout: v.array(ValidatorKickoutViewSchema),
    }),
  );

export const RpcValidatorsOrderedRequestSchema: v.GenericSchema<t.RpcValidatorsOrderedRequest> =
  v.lazy(() =>
    v.object({
      blockId: v.optional(v.union([BlockIdSchema, v.null()])),
    }),
  );

export const RuntimeConfigViewSchema: v.GenericSchema<t.RuntimeConfigView> =
  v.lazy(() =>
    v.object({
      accountCreationConfig: AccountCreationConfigViewSchema,
      congestionControlConfig: CongestionControlConfigViewSchema,
      storageAmountPerByte: v.string(),
      transactionCosts: RuntimeFeesConfigViewSchema,
      wasmConfig: VMConfigViewSchema,
      witnessConfig: WitnessConfigViewSchema,
    }),
  );

export const RuntimeFeesConfigViewSchema: v.GenericSchema<t.RuntimeFeesConfigView> =
  v.lazy(() =>
    v.object({
      actionCreationConfig: ActionCreationConfigViewSchema,
      actionReceiptCreationConfig: FeeSchema,
      burntGasReward: v.array(v.number()),
      dataReceiptCreationConfig: DataReceiptCreationConfigViewSchema,
      pessimisticGasPriceInflationRatio: v.array(v.number()),
      storageUsageConfig: StorageUsageConfigViewSchema,
    }),
  );

export const ShardIdSchema: v.GenericSchema<t.ShardId> = v.lazy(() =>
  v.number(),
);

export const ShardLayoutSchema: v.GenericSchema<t.ShardLayout> = v.lazy(() =>
  v.union([
    v.object({
      V0: ShardLayoutV0Schema,
    }),
    v.object({
      V1: ShardLayoutV1Schema,
    }),
    v.object({
      V2: ShardLayoutV2Schema,
    }),
  ]),
);

export const ShardLayoutV0Schema: v.GenericSchema<t.ShardLayoutV0> = v.lazy(
  () =>
    v.object({
      numShards: v.number(),
      version: v.number(),
    }),
);

export const ShardLayoutV1Schema: v.GenericSchema<t.ShardLayoutV1> = v.lazy(
  () =>
    v.object({
      boundaryAccounts: v.array(AccountIdSchema),
      shardsSplitMap: v.optional(
        v.union([v.array(v.array(ShardIdSchema)), v.null()]),
      ),
      toParentShardMap: v.optional(v.union([v.array(ShardIdSchema), v.null()])),
      version: v.number(),
    }),
);

export const ShardLayoutV2Schema: v.GenericSchema<t.ShardLayoutV2> = v.lazy(
  () =>
    v.object({
      boundaryAccounts: v.array(AccountIdSchema),
      idToIndexMap: v.object({}),
      indexToIdMap: v.object({}),
      shardIds: v.array(ShardIdSchema),
      shardsParentMap: v.optional(v.union([v.object({}), v.null()])),
      shardsSplitMap: v.optional(v.union([v.object({}), v.null()])),
      version: v.number(),
    }),
);

export const ShardUIdSchema: v.GenericSchema<t.ShardUId> = v.lazy(() =>
  v.object({
    shardId: v.number(),
    version: v.number(),
  }),
);

export const SignatureSchema: v.GenericSchema<t.Signature> = v.lazy(() =>
  v.string(),
);

export const SignedDelegateActionSchema: v.GenericSchema<t.SignedDelegateAction> =
  v.lazy(() =>
    v.object({
      delegateAction: DelegateActionSchema,
      signature: SignatureSchema,
    }),
  );

export const SignedTransactionSchema: v.GenericSchema<t.SignedTransaction> =
  v.lazy(() => v.string());

export const SignedTransactionViewSchema: v.GenericSchema<t.SignedTransactionView> =
  v.lazy(() =>
    v.object({
      actions: v.array(ActionViewSchema),
      hash: CryptoHashSchema,
      nonce: v.number(),
      priorityFee: v.number(),
      publicKey: PublicKeySchema,
      receiverId: AccountIdSchema,
      signature: SignatureSchema,
      signerId: AccountIdSchema,
    }),
  );

export const SlashedValidatorSchema: v.GenericSchema<t.SlashedValidator> =
  v.lazy(() =>
    v.object({
      accountId: AccountIdSchema,
      isDoubleSign: v.boolean(),
    }),
  );

export const StakeActionSchema: v.GenericSchema<t.StakeAction> = v.lazy(() =>
  v.object({
    publicKey: PublicKeySchema,
    stake: v.string(),
  }),
);

export const StateChangeCauseViewSchema: v.GenericSchema<t.StateChangeCauseView> =
  v.lazy(() =>
    v.union([
      v.object({
        type: v.literal('not_writable_to_disk'),
      }),
      v.object({
        type: v.literal('initial_state'),
      }),
      v.object({
        txHash: CryptoHashSchema,
        type: v.literal('transaction_processing'),
      }),
      v.object({
        receiptHash: CryptoHashSchema,
        type: v.literal('action_receipt_processing_started'),
      }),
      v.object({
        receiptHash: CryptoHashSchema,
        type: v.literal('action_receipt_gas_reward'),
      }),
      v.object({
        receiptHash: CryptoHashSchema,
        type: v.literal('receipt_processing'),
      }),
      v.object({
        receiptHash: CryptoHashSchema,
        type: v.literal('postponed_receipt'),
      }),
      v.object({
        type: v.literal('updated_delayed_receipts'),
      }),
      v.object({
        type: v.literal('validator_accounts_update'),
      }),
      v.object({
        type: v.literal('migration'),
      }),
      v.object({
        type: v.literal('bandwidth_scheduler_state_update'),
      }),
    ]),
  );

export const StateChangeKindViewSchema: v.GenericSchema<t.StateChangeKindView> =
  v.lazy(() =>
    v.union([
      v.object({
        accountId: AccountIdSchema,
        type: v.literal('account_touched'),
      }),
      v.object({
        accountId: AccountIdSchema,
        type: v.literal('access_key_touched'),
      }),
      v.object({
        accountId: AccountIdSchema,
        type: v.literal('data_touched'),
      }),
      v.object({
        accountId: AccountIdSchema,
        type: v.literal('contract_code_touched'),
      }),
    ]),
  );

export const StateChangeWithCauseViewSchema: v.GenericSchema<t.StateChangeWithCauseView> =
  v.lazy(() =>
    v.intersect([
      v.object({
        cause: StateChangeCauseViewSchema,
      }),
      v.union([
        v.object({
          change: v.object({
            accountId: AccountIdSchema,
            amount: v.string(),
            codeHash: CryptoHashSchema,
            globalContractAccountId: v.optional(
              v.union([AccountIdSchema, v.null()]),
            ),
            globalContractHash: v.optional(
              v.union([CryptoHashSchema, v.null()]),
            ),
            locked: v.string(),
            storagePaidAt: v.number(),
            storageUsage: v.number(),
          }),
          type: v.literal('account_update'),
        }),
        v.object({
          change: v.object({
            accountId: AccountIdSchema,
          }),
          type: v.literal('account_deletion'),
        }),
        v.object({
          change: v.object({
            accessKey: AccessKeyViewSchema,
            accountId: AccountIdSchema,
            publicKey: PublicKeySchema,
          }),
          type: v.literal('access_key_update'),
        }),
        v.object({
          change: v.object({
            accountId: AccountIdSchema,
            publicKey: PublicKeySchema,
          }),
          type: v.literal('access_key_deletion'),
        }),
        v.object({
          change: v.object({
            accountId: AccountIdSchema,
            gasKey: GasKeyViewSchema,
            publicKey: PublicKeySchema,
          }),
          type: v.literal('gas_key_update'),
        }),
        v.object({
          change: v.object({
            accountId: AccountIdSchema,
            index: v.number(),
            nonce: v.number(),
            publicKey: PublicKeySchema,
          }),
          type: v.literal('gas_key_nonce_update'),
        }),
        v.object({
          change: v.object({
            accountId: AccountIdSchema,
            publicKey: PublicKeySchema,
          }),
          type: v.literal('gas_key_deletion'),
        }),
        v.object({
          change: v.object({
            accountId: AccountIdSchema,
            keyBase64: StoreKeySchema,
            valueBase64: StoreValueSchema,
          }),
          type: v.literal('data_update'),
        }),
        v.object({
          change: v.object({
            accountId: AccountIdSchema,
            keyBase64: StoreKeySchema,
          }),
          type: v.literal('data_deletion'),
        }),
        v.object({
          change: v.object({
            accountId: AccountIdSchema,
            codeBase64: v.string(),
          }),
          type: v.literal('contract_code_update'),
        }),
        v.object({
          change: v.object({
            accountId: AccountIdSchema,
          }),
          type: v.literal('contract_code_deletion'),
        }),
      ]),
    ]),
  );

export const StateItemSchema: v.GenericSchema<t.StateItem> = v.lazy(() =>
  v.object({
    key: StoreKeySchema,
    value: StoreValueSchema,
  }),
);

export const StateSyncConfigSchema: v.GenericSchema<t.StateSyncConfig> = v.lazy(
  () =>
    v.object({
      concurrency: v.optional(SyncConcurrencySchema),
      dump: v.optional(v.union([DumpConfigSchema, v.null()])),
      sync: v.optional(SyncConfigSchema),
    }),
);

export const StatusSyncInfoSchema: v.GenericSchema<t.StatusSyncInfo> = v.lazy(
  () =>
    v.object({
      earliestBlockHash: v.optional(v.union([CryptoHashSchema, v.null()])),
      earliestBlockHeight: v.optional(v.union([v.number(), v.null()])),
      earliestBlockTime: v.optional(v.union([v.string(), v.null()])),
      epochId: v.optional(v.union([EpochIdSchema, v.null()])),
      epochStartHeight: v.optional(v.union([v.number(), v.null()])),
      latestBlockHash: CryptoHashSchema,
      latestBlockHeight: v.number(),
      latestBlockTime: v.string(),
      latestStateRoot: CryptoHashSchema,
      syncing: v.boolean(),
    }),
);

export const StorageErrorSchema: v.GenericSchema<t.StorageError> = v.lazy(() =>
  v.union([
    v.literal('StorageInternalError'),
    v.object({
      MissingTrieValue: MissingTrieValueSchema,
    }),
    v.literal('UnexpectedTrieValue'),
    v.object({
      StorageInconsistentState: v.string(),
    }),
    v.object({
      FlatStorageBlockNotSupported: v.string(),
    }),
    v.object({
      MemTrieLoadingError: v.string(),
    }),
  ]),
);

export const StorageGetModeSchema: v.GenericSchema<t.StorageGetMode> = v.lazy(
  () => v.union([v.literal('FlatStorage'), v.literal('Trie')]),
);

export const StorageUsageConfigViewSchema: v.GenericSchema<t.StorageUsageConfigView> =
  v.lazy(() =>
    v.object({
      numBytesAccount: v.number(),
      numExtraBytesRecord: v.number(),
    }),
  );

export const StoreKeySchema: v.GenericSchema<t.StoreKey> = v.lazy(() =>
  v.string(),
);

export const StoreValueSchema: v.GenericSchema<t.StoreValue> = v.lazy(() =>
  v.string(),
);

export const SyncCheckpointSchema: v.GenericSchema<t.SyncCheckpoint> = v.lazy(
  () => v.union([v.literal('genesis'), v.literal('earliest_available')]),
);

export const SyncConcurrencySchema: v.GenericSchema<t.SyncConcurrency> = v.lazy(
  () =>
    v.object({
      apply: v.number(),
      applyDuringCatchup: v.number(),
      peerDownloads: v.number(),
      perShard: v.number(),
    }),
);

export const SyncConfigSchema: v.GenericSchema<t.SyncConfig> = v.lazy(() =>
  v.union([
    v.literal('Peers'),
    v.object({
      ExternalStorage: ExternalStorageConfigSchema,
    }),
  ]),
);

export const Tier1ProxyViewSchema: v.GenericSchema<t.Tier1ProxyView> = v.lazy(
  () =>
    v.object({
      addr: v.string(),
      peerId: PublicKeySchema,
    }),
);

export const TrackedShardsConfigSchema: v.GenericSchema<t.TrackedShardsConfig> =
  v.lazy(() =>
    v.union([
      v.literal('NoShards'),
      v.object({
        Shards: v.array(ShardUIdSchema),
      }),
      v.literal('AllShards'),
      v.object({
        ShadowValidator: AccountIdSchema,
      }),
      v.object({
        Schedule: v.array(v.array(ShardIdSchema)),
      }),
      v.object({
        Accounts: v.array(AccountIdSchema),
      }),
    ]),
  );

export const TransferActionSchema: v.GenericSchema<t.TransferAction> = v.lazy(
  () =>
    v.object({
      deposit: v.string(),
    }),
);

export const TxExecutionErrorSchema: v.GenericSchema<t.TxExecutionError> =
  v.lazy(() =>
    v.union([
      v.object({
        ActionError: ActionErrorSchema,
      }),
      v.object({
        InvalidTxError: InvalidTxErrorSchema,
      }),
    ]),
  );

export const TxExecutionStatusSchema: v.GenericSchema<t.TxExecutionStatus> =
  v.lazy(() =>
    v.union([
      v.literal('NONE'),
      v.literal('INCLUDED'),
      v.literal('EXECUTED_OPTIMISTIC'),
      v.literal('INCLUDED_FINAL'),
      v.literal('EXECUTED'),
      v.literal('FINAL'),
    ]),
  );

export const UseGlobalContractActionSchema: v.GenericSchema<t.UseGlobalContractAction> =
  v.lazy(() =>
    v.object({
      contractIdentifier: GlobalContractIdentifierSchema,
    }),
  );

export const VMConfigViewSchema: v.GenericSchema<t.VMConfigView> = v.lazy(() =>
  v.object({
    discardCustomSections: v.boolean(),
    ethImplicitAccounts: v.boolean(),
    extCosts: ExtCostsConfigViewSchema,
    fixContractLoadingCost: v.boolean(),
    globalContractHostFns: v.boolean(),
    growMemCost: v.number(),
    implicitAccountCreation: v.boolean(),
    limitConfig: LimitConfigSchema,
    reftypesBulkMemory: v.boolean(),
    regularOpCost: v.number(),
    saturatingFloatToInt: v.boolean(),
    storageGetMode: StorageGetModeSchema,
    vmKind: VMKindSchema,
  }),
);

export const VMKindSchema: v.GenericSchema<t.VMKind> = v.lazy(() =>
  v.union([
    v.literal('Wasmer0'),
    v.literal('Wasmtime'),
    v.literal('Wasmer2'),
    v.literal('NearVm'),
    v.literal('NearVm2'),
  ]),
);

export const ValidatorInfoSchema: v.GenericSchema<t.ValidatorInfo> = v.lazy(
  () =>
    v.object({
      accountId: AccountIdSchema,
    }),
);

export const ValidatorKickoutReasonSchema: v.GenericSchema<t.ValidatorKickoutReason> =
  v.lazy(() =>
    v.union([
      v.literal('_UnusedSlashed'),
      v.object({
        NotEnoughBlocks: v.object({
          expected: v.number(),
          produced: v.number(),
        }),
      }),
      v.object({
        NotEnoughChunks: v.object({
          expected: v.number(),
          produced: v.number(),
        }),
      }),
      v.literal('Unstaked'),
      v.object({
        NotEnoughStake: v.object({
          stakeU128: v.string(),
          thresholdU128: v.string(),
        }),
      }),
      v.literal('DidNotGetASeat'),
      v.object({
        NotEnoughChunkEndorsements: v.object({
          expected: v.number(),
          produced: v.number(),
        }),
      }),
      v.object({
        ProtocolVersionTooOld: v.object({
          networkVersion: v.number(),
          version: v.number(),
        }),
      }),
    ]),
  );

export const ValidatorKickoutViewSchema: v.GenericSchema<t.ValidatorKickoutView> =
  v.lazy(() =>
    v.object({
      accountId: AccountIdSchema,
      reason: ValidatorKickoutReasonSchema,
    }),
  );

export const ValidatorStakeViewSchema: v.GenericSchema<t.ValidatorStakeView> =
  v.lazy(() =>
    v.intersect([
      v.object({
        validatorStakeStructVersion: v.literal('V1'),
      }),
      ValidatorStakeViewV1Schema,
    ]),
  );

export const ValidatorStakeViewV1Schema: v.GenericSchema<t.ValidatorStakeViewV1> =
  v.lazy(() =>
    v.object({
      accountId: AccountIdSchema,
      publicKey: PublicKeySchema,
      stake: v.string(),
    }),
  );

export const VersionSchema: v.GenericSchema<t.Version> = v.lazy(() =>
  v.object({
    build: v.string(),
    commit: v.string(),
    rustcVersion: v.string(),
    version: v.string(),
  }),
);

export const ViewStateResultSchema: v.GenericSchema<t.ViewStateResult> = v.lazy(
  () =>
    v.object({
      proof: v.optional(v.array(v.string())),
      values: v.array(StateItemSchema),
    }),
);

export const WasmTrapSchema: v.GenericSchema<t.WasmTrap> = v.lazy(() =>
  v.union([
    v.literal('Unreachable'),
    v.literal('IncorrectCallIndirectSignature'),
    v.literal('MemoryOutOfBounds'),
    v.literal('CallIndirectOOB'),
    v.literal('IllegalArithmetic'),
    v.literal('MisalignedAtomicAccess'),
    v.literal('IndirectCallToNull'),
    v.literal('StackOverflow'),
    v.literal('GenericTrap'),
  ]),
);

export const WitnessConfigViewSchema: v.GenericSchema<t.WitnessConfigView> =
  v.lazy(() =>
    v.object({
      combinedTransactionsSizeLimit: v.number(),
      mainStorageProofSizeSoftLimit: v.number(),
      newTransactionsValidationStateSizeSoftLimit: v.number(),
    }),
  );
