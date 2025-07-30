/**
 * This file was auto-generated from TypeScript types.
 * Do not make direct changes to the file.
 */

import { z } from 'zod/mini';
import type * as t from './types';

export const AccessKeySchema: z.ZodMiniType<t.AccessKey> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      nonce: z.number(),
      permission: AccessKeyPermissionSchema,
    }),
  );

export const AccessKeyCreationConfigViewSchema: z.ZodMiniType<t.AccessKeyCreationConfigView> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      fullAccessCost: FeeSchema,
      functionCallCost: FeeSchema,
      functionCallCostPerByte: FeeSchema,
    }),
  );

export const AccessKeyInfoViewSchema: z.ZodMiniType<t.AccessKeyInfoView> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      accessKey: AccessKeyViewSchema,
      publicKey: PublicKeySchema,
    }),
  );

export const AccessKeyListSchema: z.ZodMiniType<t.AccessKeyList> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      keys: z.array(AccessKeyInfoViewSchema),
    }),
  );

export const AccessKeyPermissionSchema: z.ZodMiniType<t.AccessKeyPermission> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([
      z.object({
        FunctionCall: FunctionCallPermissionSchema,
      }),
      z.literal('FullAccess'),
    ]),
  );

export const AccessKeyPermissionViewSchema: z.ZodMiniType<t.AccessKeyPermissionView> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([
      z.literal('FullAccess'),
      z.object({
        FunctionCall: z.object({
          allowance: z.optional(z.union([z.string(), z.null()])),
          methodNames: z.array(z.string()),
          receiverId: z.string(),
        }),
      }),
    ]),
  );

export const AccessKeyViewSchema: z.ZodMiniType<t.AccessKeyView> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      nonce: z.number(),
      permission: AccessKeyPermissionViewSchema,
    }),
  );

export const AccountCreationConfigViewSchema: z.ZodMiniType<t.AccountCreationConfigView> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      minAllowedTopLevelAccountLength: z.number(),
      registrarAccountId: AccountIdSchema,
    }),
  );

export const AccountDataViewSchema: z.ZodMiniType<t.AccountDataView> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      accountKey: PublicKeySchema,
      peerId: PublicKeySchema,
      proxies: z.array(Tier1ProxyViewSchema),
      timestamp: z.string(),
    }),
  );

export const AccountIdSchema: z.ZodMiniType<t.AccountId> =
  /* @__PURE__ */ z.lazy(() => z.string());

export const AccountIdValidityRulesVersionSchema: z.ZodMiniType<t.AccountIdValidityRulesVersion> =
  /* @__PURE__ */ z.lazy(() => z.number());

export const AccountInfoSchema: z.ZodMiniType<t.AccountInfo> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      accountId: AccountIdSchema,
      amount: z.string(),
      publicKey: PublicKeySchema,
    }),
  );

export const AccountViewSchema: z.ZodMiniType<t.AccountView> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      amount: z.string(),
      codeHash: CryptoHashSchema,
      globalContractAccountId: z.optional(z.union([AccountIdSchema, z.null()])),
      globalContractHash: z.optional(z.union([CryptoHashSchema, z.null()])),
      locked: z.string(),
      storagePaidAt: z.number(),
      storageUsage: z.number(),
    }),
  );

export const AccountWithPublicKeySchema: z.ZodMiniType<t.AccountWithPublicKey> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      accountId: AccountIdSchema,
      publicKey: PublicKeySchema,
    }),
  );

export const ActionSchema: z.ZodMiniType<t.Action> = /* @__PURE__ */ z.lazy(
  () =>
    z.union([
      z.object({
        CreateAccount: CreateAccountActionSchema,
      }),
      z.object({
        DeployContract: DeployContractActionSchema,
      }),
      z.object({
        FunctionCall: FunctionCallActionSchema,
      }),
      z.object({
        Transfer: TransferActionSchema,
      }),
      z.object({
        Stake: StakeActionSchema,
      }),
      z.object({
        AddKey: AddKeyActionSchema,
      }),
      z.object({
        DeleteKey: DeleteKeyActionSchema,
      }),
      z.object({
        DeleteAccount: DeleteAccountActionSchema,
      }),
      z.object({
        Delegate: SignedDelegateActionSchema,
      }),
      z.object({
        DeployGlobalContract: DeployGlobalContractActionSchema,
      }),
      z.object({
        UseGlobalContract: UseGlobalContractActionSchema,
      }),
    ]),
);

export const ActionCreationConfigViewSchema: z.ZodMiniType<t.ActionCreationConfigView> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
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

export const ActionErrorSchema: z.ZodMiniType<t.ActionError> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      index: z.optional(z.union([z.number(), z.null()])),
      kind: ActionErrorKindSchema,
    }),
  );

export const ActionErrorKindSchema: z.ZodMiniType<t.ActionErrorKind> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([
      z.object({
        AccountAlreadyExists: z.object({
          accountId: AccountIdSchema,
        }),
      }),
      z.object({
        AccountDoesNotExist: z.object({
          accountId: AccountIdSchema,
        }),
      }),
      z.object({
        CreateAccountOnlyByRegistrar: z.object({
          accountId: AccountIdSchema,
          predecessorId: AccountIdSchema,
          registrarAccountId: AccountIdSchema,
        }),
      }),
      z.object({
        CreateAccountNotAllowed: z.object({
          accountId: AccountIdSchema,
          predecessorId: AccountIdSchema,
        }),
      }),
      z.object({
        ActorNoPermission: z.object({
          accountId: AccountIdSchema,
          actorId: AccountIdSchema,
        }),
      }),
      z.object({
        DeleteKeyDoesNotExist: z.object({
          accountId: AccountIdSchema,
          publicKey: PublicKeySchema,
        }),
      }),
      z.object({
        AddKeyAlreadyExists: z.object({
          accountId: AccountIdSchema,
          publicKey: PublicKeySchema,
        }),
      }),
      z.object({
        DeleteAccountStaking: z.object({
          accountId: AccountIdSchema,
        }),
      }),
      z.object({
        LackBalanceForState: z.object({
          accountId: AccountIdSchema,
          amount: z.string(),
        }),
      }),
      z.object({
        TriesToUnstake: z.object({
          accountId: AccountIdSchema,
        }),
      }),
      z.object({
        TriesToStake: z.object({
          accountId: AccountIdSchema,
          balance: z.string(),
          locked: z.string(),
          stake: z.string(),
        }),
      }),
      z.object({
        InsufficientStake: z.object({
          accountId: AccountIdSchema,
          minimumStake: z.string(),
          stake: z.string(),
        }),
      }),
      z.object({
        FunctionCallError: FunctionCallErrorSchema,
      }),
      z.object({
        NewReceiptValidationError: ReceiptValidationErrorSchema,
      }),
      z.object({
        OnlyImplicitAccountCreationAllowed: z.object({
          accountId: AccountIdSchema,
        }),
      }),
      z.object({
        DeleteAccountWithLargeState: z.object({
          accountId: AccountIdSchema,
        }),
      }),
      z.literal('DelegateActionInvalidSignature'),
      z.object({
        DelegateActionSenderDoesNotMatchTxReceiver: z.object({
          receiverId: AccountIdSchema,
          senderId: AccountIdSchema,
        }),
      }),
      z.literal('DelegateActionExpired'),
      z.object({
        DelegateActionAccessKeyError: InvalidAccessKeyErrorSchema,
      }),
      z.object({
        DelegateActionInvalidNonce: z.object({
          akNonce: z.number(),
          delegateNonce: z.number(),
        }),
      }),
      z.object({
        DelegateActionNonceTooLarge: z.object({
          delegateNonce: z.number(),
          upperBound: z.number(),
        }),
      }),
      z.object({
        GlobalContractDoesNotExist: z.object({
          identifier: GlobalContractIdentifierSchema,
        }),
      }),
    ]),
  );

export const ActionViewSchema: z.ZodMiniType<t.ActionView> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([
      z.literal('CreateAccount'),
      z.object({
        DeployContract: z.object({
          code: z.string(),
        }),
      }),
      z.object({
        FunctionCall: z.object({
          args: FunctionArgsSchema,
          deposit: z.string(),
          gas: z.number(),
          methodName: z.string(),
        }),
      }),
      z.object({
        Transfer: z.object({
          deposit: z.string(),
        }),
      }),
      z.object({
        Stake: z.object({
          publicKey: PublicKeySchema,
          stake: z.string(),
        }),
      }),
      z.object({
        AddKey: z.object({
          accessKey: AccessKeyViewSchema,
          publicKey: PublicKeySchema,
        }),
      }),
      z.object({
        DeleteKey: z.object({
          publicKey: PublicKeySchema,
        }),
      }),
      z.object({
        DeleteAccount: z.object({
          beneficiaryId: AccountIdSchema,
        }),
      }),
      z.object({
        Delegate: z.object({
          delegateAction: DelegateActionSchema,
          signature: SignatureSchema,
        }),
      }),
      z.object({
        DeployGlobalContract: z.object({
          code: z.string(),
        }),
      }),
      z.object({
        DeployGlobalContractByAccountId: z.object({
          code: z.string(),
        }),
      }),
      z.object({
        UseGlobalContract: z.object({
          codeHash: CryptoHashSchema,
        }),
      }),
      z.object({
        UseGlobalContractByAccountId: z.object({
          accountId: AccountIdSchema,
        }),
      }),
    ]),
  );

export const ActionsValidationErrorSchema: z.ZodMiniType<t.ActionsValidationError> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([
      z.literal('DeleteActionMustBeFinal'),
      z.object({
        TotalPrepaidGasExceeded: z.object({
          limit: z.number(),
          totalPrepaidGas: z.number(),
        }),
      }),
      z.object({
        TotalNumberOfActionsExceeded: z.object({
          limit: z.number(),
          totalNumberOfActions: z.number(),
        }),
      }),
      z.object({
        AddKeyMethodNamesNumberOfBytesExceeded: z.object({
          limit: z.number(),
          totalNumberOfBytes: z.number(),
        }),
      }),
      z.object({
        AddKeyMethodNameLengthExceeded: z.object({
          length: z.number(),
          limit: z.number(),
        }),
      }),
      z.literal('IntegerOverflow'),
      z.object({
        InvalidAccountId: z.object({
          accountId: z.string(),
        }),
      }),
      z.object({
        ContractSizeExceeded: z.object({
          limit: z.number(),
          size: z.number(),
        }),
      }),
      z.object({
        FunctionCallMethodNameLengthExceeded: z.object({
          length: z.number(),
          limit: z.number(),
        }),
      }),
      z.object({
        FunctionCallArgumentsLengthExceeded: z.object({
          length: z.number(),
          limit: z.number(),
        }),
      }),
      z.object({
        UnsuitableStakingKey: z.object({
          publicKey: PublicKeySchema,
        }),
      }),
      z.literal('FunctionCallZeroAttachedGas'),
      z.literal('DelegateActionMustBeOnlyOne'),
      z.object({
        UnsupportedProtocolFeature: z.object({
          protocolFeature: z.string(),
          version: z.number(),
        }),
      }),
    ]),
  );

export const AddKeyActionSchema: z.ZodMiniType<t.AddKeyAction> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      accessKey: AccessKeySchema,
      publicKey: PublicKeySchema,
    }),
  );

export const BandwidthRequestSchema: z.ZodMiniType<t.BandwidthRequest> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      requestedValuesBitmap: BandwidthRequestBitmapSchema,
      toShard: z.number(),
    }),
  );

export const BandwidthRequestBitmapSchema: z.ZodMiniType<t.BandwidthRequestBitmap> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      data: z.array(z.number()),
    }),
  );

export const BandwidthRequestsSchema: z.ZodMiniType<t.BandwidthRequests> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      V1: BandwidthRequestsV1Schema,
    }),
  );

export const BandwidthRequestsV1Schema: z.ZodMiniType<t.BandwidthRequestsV1> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      requests: z.array(BandwidthRequestSchema),
    }),
  );

export const BlockHeaderInnerLiteViewSchema: z.ZodMiniType<t.BlockHeaderInnerLiteView> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      blockMerkleRoot: CryptoHashSchema,
      epochId: CryptoHashSchema,
      height: z.number(),
      nextBpHash: CryptoHashSchema,
      nextEpochId: CryptoHashSchema,
      outcomeRoot: CryptoHashSchema,
      prevStateRoot: CryptoHashSchema,
      timestamp: z.number(),
      timestampNanosec: z.string(),
    }),
  );

export const BlockHeaderViewSchema: z.ZodMiniType<t.BlockHeaderView> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      approvals: z.array(z.union([SignatureSchema, z.null()])),
      blockBodyHash: z.optional(z.union([CryptoHashSchema, z.null()])),
      blockMerkleRoot: CryptoHashSchema,
      blockOrdinal: z.optional(z.union([z.number(), z.null()])),
      challengesResult: z.array(SlashedValidatorSchema),
      challengesRoot: CryptoHashSchema,
      chunkEndorsements: z.optional(
        z.union([z.array(z.array(z.number())), z.null()]),
      ),
      chunkHeadersRoot: CryptoHashSchema,
      chunkMask: z.array(z.boolean()),
      chunkReceiptsRoot: CryptoHashSchema,
      chunkTxRoot: CryptoHashSchema,
      chunksIncluded: z.number(),
      epochId: CryptoHashSchema,
      epochSyncDataHash: z.optional(z.union([CryptoHashSchema, z.null()])),
      gasPrice: z.string(),
      hash: CryptoHashSchema,
      height: z.number(),
      lastDsFinalBlock: CryptoHashSchema,
      lastFinalBlock: CryptoHashSchema,
      latestProtocolVersion: z.number(),
      nextBpHash: CryptoHashSchema,
      nextEpochId: CryptoHashSchema,
      outcomeRoot: CryptoHashSchema,
      prevHash: CryptoHashSchema,
      prevHeight: z.optional(z.union([z.number(), z.null()])),
      prevStateRoot: CryptoHashSchema,
      randomValue: CryptoHashSchema,
      rentPaid: z.string(),
      signature: SignatureSchema,
      timestamp: z.number(),
      timestampNanosec: z.string(),
      totalSupply: z.string(),
      validatorProposals: z.array(ValidatorStakeViewSchema),
      validatorReward: z.string(),
    }),
  );

export const BlockIdSchema: z.ZodMiniType<t.BlockId> = /* @__PURE__ */ z.lazy(
  () => z.union([z.number(), CryptoHashSchema]),
);

export const BlockStatusViewSchema: z.ZodMiniType<t.BlockStatusView> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      hash: CryptoHashSchema,
      height: z.number(),
    }),
  );

export const CallResultSchema: z.ZodMiniType<t.CallResult> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      logs: z.array(z.string()),
      result: z.array(z.number()),
    }),
  );

export const CatchupStatusViewSchema: z.ZodMiniType<t.CatchupStatusView> =
  /* @__PURE__ */ z.lazy(() => z.object({}));

export const ChunkDistributionNetworkConfigSchema: z.ZodMiniType<t.ChunkDistributionNetworkConfig> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      enabled: z.boolean(),
      uris: ChunkDistributionUrisSchema,
    }),
  );

export const ChunkDistributionUrisSchema: z.ZodMiniType<t.ChunkDistributionUris> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      get: z.string(),
      set: z.string(),
    }),
  );

export const ChunkHeaderViewSchema: z.ZodMiniType<t.ChunkHeaderView> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      balanceBurnt: z.string(),
      bandwidthRequests: z.optional(
        z.union([BandwidthRequestsSchema, z.null()]),
      ),
      chunkHash: CryptoHashSchema,
      congestionInfo: z.optional(z.union([CongestionInfoViewSchema, z.null()])),
      encodedLength: z.number(),
      encodedMerkleRoot: CryptoHashSchema,
      gasLimit: z.number(),
      gasUsed: z.number(),
      heightCreated: z.number(),
      heightIncluded: z.number(),
      outcomeRoot: CryptoHashSchema,
      outgoingReceiptsRoot: CryptoHashSchema,
      prevBlockHash: CryptoHashSchema,
      prevStateRoot: CryptoHashSchema,
      rentPaid: z.string(),
      shardId: ShardIdSchema,
      signature: SignatureSchema,
      txRoot: CryptoHashSchema,
      validatorProposals: z.array(ValidatorStakeViewSchema),
      validatorReward: z.string(),
    }),
  );

export const CompilationErrorSchema: z.ZodMiniType<t.CompilationError> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([
      z.object({
        CodeDoesNotExist: z.object({
          accountId: AccountIdSchema,
        }),
      }),
      z.object({
        PrepareError: PrepareErrorSchema,
      }),
      z.object({
        WasmerCompileError: z.object({
          msg: z.string(),
        }),
      }),
    ]),
  );

export const CongestionControlConfigViewSchema: z.ZodMiniType<t.CongestionControlConfigView> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      allowedShardOutgoingGas: z.number(),
      maxCongestionIncomingGas: z.number(),
      maxCongestionMemoryConsumption: z.number(),
      maxCongestionMissedChunks: z.number(),
      maxCongestionOutgoingGas: z.number(),
      maxOutgoingGas: z.number(),
      maxTxGas: z.number(),
      minOutgoingGas: z.number(),
      minTxGas: z.number(),
      outgoingReceiptsBigSizeLimit: z.number(),
      outgoingReceiptsUsualSizeLimit: z.number(),
      rejectTxCongestionThreshold: z.number(),
    }),
  );

export const CongestionInfoViewSchema: z.ZodMiniType<t.CongestionInfoView> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      allowedShard: z.number(),
      bufferedReceiptsGas: z.string(),
      delayedReceiptsGas: z.string(),
      receiptBytes: z.number(),
    }),
  );

export const ContractCodeViewSchema: z.ZodMiniType<t.ContractCodeView> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      codeBase64: z.string(),
      hash: CryptoHashSchema,
    }),
  );

export const CostGasUsedSchema: z.ZodMiniType<t.CostGasUsed> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      cost: z.string(),
      costCategory: z.string(),
      gasUsed: z.string(),
    }),
  );

export const CreateAccountActionSchema: z.ZodMiniType<t.CreateAccountAction> =
  /* @__PURE__ */ z.lazy(() => z.object({}));

export const CryptoHashSchema: z.ZodMiniType<t.CryptoHash> =
  /* @__PURE__ */ z.lazy(() => z.string());

export const CurrentEpochValidatorInfoSchema: z.ZodMiniType<t.CurrentEpochValidatorInfo> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      accountId: AccountIdSchema,
      isSlashed: z.boolean(),
      numExpectedBlocks: z.number(),
      numExpectedChunks: z.number(),
      numExpectedChunksPerShard: z.array(z.number()),
      numExpectedEndorsements: z.number(),
      numExpectedEndorsementsPerShard: z.array(z.number()),
      numProducedBlocks: z.number(),
      numProducedChunks: z.number(),
      numProducedChunksPerShard: z.array(z.number()),
      numProducedEndorsements: z.number(),
      numProducedEndorsementsPerShard: z.array(z.number()),
      publicKey: PublicKeySchema,
      shards: z.array(ShardIdSchema),
      shardsEndorsed: z.array(ShardIdSchema),
      stake: z.string(),
    }),
  );

export const DataReceiptCreationConfigViewSchema: z.ZodMiniType<t.DataReceiptCreationConfigView> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      baseCost: FeeSchema,
      costPerByte: FeeSchema,
    }),
  );

export const DataReceiverViewSchema: z.ZodMiniType<t.DataReceiverView> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      dataId: CryptoHashSchema,
      receiverId: AccountIdSchema,
    }),
  );

export const DelegateActionSchema: z.ZodMiniType<t.DelegateAction> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      actions: z.array(NonDelegateActionSchema),
      maxBlockHeight: z.number(),
      nonce: z.number(),
      publicKey: PublicKeySchema,
      receiverId: AccountIdSchema,
      senderId: AccountIdSchema,
    }),
  );

export const DeleteAccountActionSchema: z.ZodMiniType<t.DeleteAccountAction> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      beneficiaryId: AccountIdSchema,
    }),
  );

export const DeleteKeyActionSchema: z.ZodMiniType<t.DeleteKeyAction> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      publicKey: PublicKeySchema,
    }),
  );

export const DeployContractActionSchema: z.ZodMiniType<t.DeployContractAction> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      code: z.string(),
    }),
  );

export const DeployGlobalContractActionSchema: z.ZodMiniType<t.DeployGlobalContractAction> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      code: z.string(),
      deployMode: GlobalContractDeployModeSchema,
    }),
  );

export const DetailedDebugStatusSchema: z.ZodMiniType<t.DetailedDebugStatus> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      blockProductionDelayMillis: z.number(),
      catchupStatus: z.array(CatchupStatusViewSchema),
      currentHeadStatus: BlockStatusViewSchema,
      currentHeaderHeadStatus: BlockStatusViewSchema,
      networkInfo: NetworkInfoViewSchema,
      syncStatus: z.string(),
    }),
  );

export const DirectionSchema: z.ZodMiniType<t.Direction> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([z.literal('Left'), z.literal('Right')]),
  );

export const DumpConfigSchema: z.ZodMiniType<t.DumpConfig> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      credentialsFile: z.optional(z.union([z.string(), z.null()])),
      iterationDelay: z.optional(
        z.union([DurationAsStdSchemaProviderSchema, z.null()]),
      ),
      location: ExternalStorageLocationSchema,
      restartDumpForShards: z.optional(
        z.union([z.array(ShardIdSchema), z.null()]),
      ),
    }),
  );

export const DurationAsStdSchemaProviderSchema: z.ZodMiniType<t.DurationAsStdSchemaProvider> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      nanos: z.number(),
      secs: z.number(),
    }),
  );

export const EpochIdSchema: z.ZodMiniType<t.EpochId> = /* @__PURE__ */ z.lazy(
  () => CryptoHashSchema,
);

export const EpochSyncConfigSchema: z.ZodMiniType<t.EpochSyncConfig> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      disableEpochSyncForBootstrapping: z.boolean(),
      epochSyncHorizon: z.number(),
      ignoreEpochSyncNetworkRequests: z.boolean(),
      timeoutForEpochSync: DurationAsStdSchemaProviderSchema,
    }),
  );

export const ExecutionMetadataViewSchema: z.ZodMiniType<t.ExecutionMetadataView> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      gasProfile: z.optional(z.union([z.array(CostGasUsedSchema), z.null()])),
      version: z.number(),
    }),
  );

export const ExecutionOutcomeViewSchema: z.ZodMiniType<t.ExecutionOutcomeView> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      executorId: AccountIdSchema,
      gasBurnt: z.number(),
      logs: z.array(z.string()),
      metadata: ExecutionMetadataViewSchema,
      receiptIds: z.array(CryptoHashSchema),
      status: ExecutionStatusViewSchema,
      tokensBurnt: z.string(),
    }),
  );

export const ExecutionOutcomeWithIdViewSchema: z.ZodMiniType<t.ExecutionOutcomeWithIdView> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      blockHash: CryptoHashSchema,
      id: CryptoHashSchema,
      outcome: ExecutionOutcomeViewSchema,
      proof: z.array(MerklePathItemSchema),
    }),
  );

export const ExecutionStatusViewSchema: z.ZodMiniType<t.ExecutionStatusView> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([
      z.literal('Unknown'),
      z.object({
        Failure: TxExecutionErrorSchema,
      }),
      z.object({
        SuccessValue: z.string(),
      }),
      z.object({
        SuccessReceiptId: CryptoHashSchema,
      }),
    ]),
  );

export const ExtCostsConfigViewSchema: z.ZodMiniType<t.ExtCostsConfigView> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      altBn128G1MultiexpBase: z.number(),
      altBn128G1MultiexpElement: z.number(),
      altBn128G1SumBase: z.number(),
      altBn128G1SumElement: z.number(),
      altBn128PairingCheckBase: z.number(),
      altBn128PairingCheckElement: z.number(),
      base: z.number(),
      bls12381G1MultiexpBase: z.number(),
      bls12381G1MultiexpElement: z.number(),
      bls12381G2MultiexpBase: z.number(),
      bls12381G2MultiexpElement: z.number(),
      bls12381MapFp2ToG2Base: z.number(),
      bls12381MapFp2ToG2Element: z.number(),
      bls12381MapFpToG1Base: z.number(),
      bls12381MapFpToG1Element: z.number(),
      bls12381P1DecompressBase: z.number(),
      bls12381P1DecompressElement: z.number(),
      bls12381P1SumBase: z.number(),
      bls12381P1SumElement: z.number(),
      bls12381P2DecompressBase: z.number(),
      bls12381P2DecompressElement: z.number(),
      bls12381P2SumBase: z.number(),
      bls12381P2SumElement: z.number(),
      bls12381PairingBase: z.number(),
      bls12381PairingElement: z.number(),
      contractCompileBase: z.number(),
      contractCompileBytes: z.number(),
      contractLoadingBase: z.number(),
      contractLoadingBytes: z.number(),
      ecrecoverBase: z.number(),
      ed25519VerifyBase: z.number(),
      ed25519VerifyByte: z.number(),
      keccak256Base: z.number(),
      keccak256Byte: z.number(),
      keccak512Base: z.number(),
      keccak512Byte: z.number(),
      logBase: z.number(),
      logByte: z.number(),
      promiseAndBase: z.number(),
      promiseAndPerPromise: z.number(),
      promiseReturn: z.number(),
      readCachedTrieNode: z.number(),
      readMemoryBase: z.number(),
      readMemoryByte: z.number(),
      readRegisterBase: z.number(),
      readRegisterByte: z.number(),
      ripemd160Base: z.number(),
      ripemd160Block: z.number(),
      sha256Base: z.number(),
      sha256Byte: z.number(),
      storageHasKeyBase: z.number(),
      storageHasKeyByte: z.number(),
      storageIterCreateFromByte: z.number(),
      storageIterCreatePrefixBase: z.number(),
      storageIterCreatePrefixByte: z.number(),
      storageIterCreateRangeBase: z.number(),
      storageIterCreateToByte: z.number(),
      storageIterNextBase: z.number(),
      storageIterNextKeyByte: z.number(),
      storageIterNextValueByte: z.number(),
      storageLargeReadOverheadBase: z.number(),
      storageLargeReadOverheadByte: z.number(),
      storageReadBase: z.number(),
      storageReadKeyByte: z.number(),
      storageReadValueByte: z.number(),
      storageRemoveBase: z.number(),
      storageRemoveKeyByte: z.number(),
      storageRemoveRetValueByte: z.number(),
      storageWriteBase: z.number(),
      storageWriteEvictedByte: z.number(),
      storageWriteKeyByte: z.number(),
      storageWriteValueByte: z.number(),
      touchingTrieNode: z.number(),
      utf16DecodingBase: z.number(),
      utf16DecodingByte: z.number(),
      utf8DecodingBase: z.number(),
      utf8DecodingByte: z.number(),
      validatorStakeBase: z.number(),
      validatorTotalStakeBase: z.number(),
      writeMemoryBase: z.number(),
      writeMemoryByte: z.number(),
      writeRegisterBase: z.number(),
      writeRegisterByte: z.number(),
      yieldCreateBase: z.number(),
      yieldCreateByte: z.number(),
      yieldResumeBase: z.number(),
      yieldResumeByte: z.number(),
    }),
  );

export const ExternalStorageConfigSchema: z.ZodMiniType<t.ExternalStorageConfig> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      externalStorageFallbackThreshold: z.number(),
      location: ExternalStorageLocationSchema,
      numConcurrentRequests: z.number(),
      numConcurrentRequestsDuringCatchup: z.number(),
    }),
  );

export const ExternalStorageLocationSchema: z.ZodMiniType<t.ExternalStorageLocation> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([
      z.object({
        S3: z.object({
          bucket: z.string(),
          region: z.string(),
        }),
      }),
      z.object({
        Filesystem: z.object({
          rootDir: z.string(),
        }),
      }),
      z.object({
        GCS: z.object({
          bucket: z.string(),
        }),
      }),
    ]),
  );

export const FeeSchema: z.ZodMiniType<t.Fee> = /* @__PURE__ */ z.lazy(() =>
  z.object({
    execution: z.number(),
    sendNotSir: z.number(),
    sendSir: z.number(),
  }),
);

export const FinalExecutionOutcomeViewSchema: z.ZodMiniType<t.FinalExecutionOutcomeView> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      receiptsOutcome: z.array(ExecutionOutcomeWithIdViewSchema),
      status: FinalExecutionStatusSchema,
      transaction: SignedTransactionViewSchema,
      transactionOutcome: ExecutionOutcomeWithIdViewSchema,
    }),
  );

export const FinalExecutionOutcomeWithReceiptViewSchema: z.ZodMiniType<t.FinalExecutionOutcomeWithReceiptView> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      receipts: z.array(ReceiptViewSchema),
      receiptsOutcome: z.array(ExecutionOutcomeWithIdViewSchema),
      status: FinalExecutionStatusSchema,
      transaction: SignedTransactionViewSchema,
      transactionOutcome: ExecutionOutcomeWithIdViewSchema,
    }),
  );

export const FinalExecutionStatusSchema: z.ZodMiniType<t.FinalExecutionStatus> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([
      z.literal('NotStarted'),
      z.literal('Started'),
      z.object({
        Failure: TxExecutionErrorSchema,
      }),
      z.object({
        SuccessValue: z.string(),
      }),
    ]),
  );

export const FinalitySchema: z.ZodMiniType<t.Finality> = /* @__PURE__ */ z.lazy(
  () =>
    z.union([
      z.literal('optimistic'),
      z.literal('near-final'),
      z.literal('final'),
    ]),
);

export const FunctionArgsSchema: z.ZodMiniType<t.FunctionArgs> =
  /* @__PURE__ */ z.lazy(() => z.string());

export const FunctionCallActionSchema: z.ZodMiniType<t.FunctionCallAction> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      args: z.string(),
      deposit: z.string(),
      gas: z.number(),
      methodName: z.string(),
    }),
  );

export const FunctionCallErrorSchema: z.ZodMiniType<t.FunctionCallError> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([
      z.union([z.literal('WasmUnknownError'), z.literal('_EVMError')]),
      z.object({
        CompilationError: CompilationErrorSchema,
      }),
      z.object({
        LinkError: z.object({
          msg: z.string(),
        }),
      }),
      z.object({
        MethodResolveError: MethodResolveErrorSchema,
      }),
      z.object({
        WasmTrap: WasmTrapSchema,
      }),
      z.object({
        HostError: HostErrorSchema,
      }),
      z.object({
        ExecutionError: z.string(),
      }),
    ]),
  );

export const FunctionCallPermissionSchema: z.ZodMiniType<t.FunctionCallPermission> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      allowance: z.optional(z.union([z.string(), z.null()])),
      methodNames: z.array(z.string()),
      receiverId: z.string(),
    }),
  );

export const GCConfigSchema: z.ZodMiniType<t.GCConfig> = /* @__PURE__ */ z.lazy(
  () =>
    z.object({
      gcBlocksLimit: z.number(),
      gcForkCleanStep: z.number(),
      gcNumEpochsToKeep: z.number(),
      gcStepPeriod: DurationAsStdSchemaProviderSchema,
    }),
);

export const GasKeyViewSchema: z.ZodMiniType<t.GasKeyView> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      balance: z.number(),
      numNonces: z.number(),
      permission: AccessKeyPermissionViewSchema,
    }),
  );

export const GenesisConfigSchema: z.ZodMiniType<t.GenesisConfig> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      avgHiddenValidatorSeatsPerShard: z.array(z.number()),
      blockProducerKickoutThreshold: z.number(),
      chainId: z.string(),
      chunkProducerAssignmentChangesLimit: z.number(),
      chunkProducerKickoutThreshold: z.number(),
      chunkValidatorOnlyKickoutThreshold: z.number(),
      dynamicResharding: z.boolean(),
      epochLength: z.number(),
      fishermenThreshold: z.string(),
      gasLimit: z.number(),
      gasPriceAdjustmentRate: z.array(z.number()),
      genesisHeight: z.number(),
      genesisTime: z.string(),
      maxGasPrice: z.string(),
      maxInflationRate: z.array(z.number()),
      maxKickoutStakePerc: z.number(),
      minGasPrice: z.string(),
      minimumStakeDivisor: z.number(),
      minimumStakeRatio: z.array(z.number()),
      minimumValidatorsPerShard: z.number(),
      numBlockProducerSeats: z.number(),
      numBlockProducerSeatsPerShard: z.array(z.number()),
      numBlocksPerYear: z.number(),
      numChunkOnlyProducerSeats: z.number(),
      numChunkProducerSeats: z.number(),
      numChunkValidatorSeats: z.number(),
      onlineMaxThreshold: z.array(z.number()),
      onlineMinThreshold: z.array(z.number()),
      protocolRewardRate: z.array(z.number()),
      protocolTreasuryAccount: AccountIdSchema,
      protocolUpgradeStakeThreshold: z.array(z.number()),
      protocolVersion: z.number(),
      shardLayout: ShardLayoutSchema,
      shuffleShardAssignmentForChunkProducers: z.boolean(),
      targetValidatorMandatesPerShard: z.number(),
      totalSupply: z.string(),
      transactionValidityPeriod: z.number(),
      useProductionConfig: z.boolean(),
      validators: z.array(AccountInfoSchema),
    }),
  );

export const GenesisConfigRequestSchema: z.ZodMiniType<t.GenesisConfigRequest> =
  /* @__PURE__ */ z.lazy(() => z.null());

export const GlobalContractDeployModeSchema: z.ZodMiniType<t.GlobalContractDeployMode> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([z.literal('CodeHash'), z.literal('AccountId')]),
  );

export const GlobalContractIdentifierSchema: z.ZodMiniType<t.GlobalContractIdentifier> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([
      z.object({
        CodeHash: CryptoHashSchema,
      }),
      z.object({
        AccountId: AccountIdSchema,
      }),
    ]),
  );

export const HostErrorSchema: z.ZodMiniType<t.HostError> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([
      z.literal('BadUTF16'),
      z.literal('BadUTF8'),
      z.literal('GasExceeded'),
      z.literal('GasLimitExceeded'),
      z.literal('BalanceExceeded'),
      z.literal('EmptyMethodName'),
      z.object({
        GuestPanic: z.object({
          panicMsg: z.string(),
        }),
      }),
      z.literal('IntegerOverflow'),
      z.object({
        InvalidPromiseIndex: z.object({
          promiseIdx: z.number(),
        }),
      }),
      z.literal('CannotAppendActionToJointPromise'),
      z.literal('CannotReturnJointPromise'),
      z.object({
        InvalidPromiseResultIndex: z.object({
          resultIdx: z.number(),
        }),
      }),
      z.object({
        InvalidRegisterId: z.object({
          registerId: z.number(),
        }),
      }),
      z.object({
        IteratorWasInvalidated: z.object({
          iteratorIndex: z.number(),
        }),
      }),
      z.literal('MemoryAccessViolation'),
      z.object({
        InvalidReceiptIndex: z.object({
          receiptIndex: z.number(),
        }),
      }),
      z.object({
        InvalidIteratorIndex: z.object({
          iteratorIndex: z.number(),
        }),
      }),
      z.literal('InvalidAccountId'),
      z.literal('InvalidMethodName'),
      z.literal('InvalidPublicKey'),
      z.object({
        ProhibitedInView: z.object({
          methodName: z.string(),
        }),
      }),
      z.object({
        NumberOfLogsExceeded: z.object({
          limit: z.number(),
        }),
      }),
      z.object({
        KeyLengthExceeded: z.object({
          length: z.number(),
          limit: z.number(),
        }),
      }),
      z.object({
        ValueLengthExceeded: z.object({
          length: z.number(),
          limit: z.number(),
        }),
      }),
      z.object({
        TotalLogLengthExceeded: z.object({
          length: z.number(),
          limit: z.number(),
        }),
      }),
      z.object({
        NumberPromisesExceeded: z.object({
          limit: z.number(),
          numberOfPromises: z.number(),
        }),
      }),
      z.object({
        NumberInputDataDependenciesExceeded: z.object({
          limit: z.number(),
          numberOfInputDataDependencies: z.number(),
        }),
      }),
      z.object({
        ReturnedValueLengthExceeded: z.object({
          length: z.number(),
          limit: z.number(),
        }),
      }),
      z.object({
        ContractSizeExceeded: z.object({
          limit: z.number(),
          size: z.number(),
        }),
      }),
      z.object({
        Deprecated: z.object({
          methodName: z.string(),
        }),
      }),
      z.object({
        ECRecoverError: z.object({
          msg: z.string(),
        }),
      }),
      z.object({
        AltBn128InvalidInput: z.object({
          msg: z.string(),
        }),
      }),
      z.object({
        Ed25519VerifyInvalidInput: z.object({
          msg: z.string(),
        }),
      }),
    ]),
  );

export const InvalidAccessKeyErrorSchema: z.ZodMiniType<t.InvalidAccessKeyError> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([
      z.object({
        AccessKeyNotFound: z.object({
          accountId: AccountIdSchema,
          publicKey: PublicKeySchema,
        }),
      }),
      z.object({
        ReceiverMismatch: z.object({
          akReceiver: z.string(),
          txReceiver: AccountIdSchema,
        }),
      }),
      z.object({
        MethodNameMismatch: z.object({
          methodName: z.string(),
        }),
      }),
      z.literal('RequiresFullAccess'),
      z.object({
        NotEnoughAllowance: z.object({
          accountId: AccountIdSchema,
          allowance: z.string(),
          cost: z.string(),
          publicKey: PublicKeySchema,
        }),
      }),
      z.literal('DepositWithFunctionCall'),
    ]),
  );

export const InvalidTxErrorSchema: z.ZodMiniType<t.InvalidTxError> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([
      z.object({
        InvalidAccessKeyError: InvalidAccessKeyErrorSchema,
      }),
      z.object({
        InvalidSignerId: z.object({
          signerId: z.string(),
        }),
      }),
      z.object({
        SignerDoesNotExist: z.object({
          signerId: AccountIdSchema,
        }),
      }),
      z.object({
        InvalidNonce: z.object({
          akNonce: z.number(),
          txNonce: z.number(),
        }),
      }),
      z.object({
        NonceTooLarge: z.object({
          txNonce: z.number(),
          upperBound: z.number(),
        }),
      }),
      z.object({
        InvalidReceiverId: z.object({
          receiverId: z.string(),
        }),
      }),
      z.literal('InvalidSignature'),
      z.object({
        NotEnoughBalance: z.object({
          balance: z.string(),
          cost: z.string(),
          signerId: AccountIdSchema,
        }),
      }),
      z.object({
        LackBalanceForState: z.object({
          amount: z.string(),
          signerId: AccountIdSchema,
        }),
      }),
      z.literal('CostOverflow'),
      z.literal('InvalidChain'),
      z.literal('Expired'),
      z.object({
        ActionsValidation: ActionsValidationErrorSchema,
      }),
      z.object({
        TransactionSizeExceeded: z.object({
          limit: z.number(),
          size: z.number(),
        }),
      }),
      z.literal('InvalidTransactionVersion'),
      z.object({
        StorageError: StorageErrorSchema,
      }),
      z.object({
        ShardCongested: z.object({
          congestionLevel: z.number(),
          shardId: z.number(),
        }),
      }),
      z.object({
        ShardStuck: z.object({
          missedChunks: z.number(),
          shardId: z.number(),
        }),
      }),
    ]),
  );

export const JsonRpcRequest_for_EXPERIMENTAL_changesSchema: z.ZodMiniType<t.JsonRpcRequest_for_EXPERIMENTAL_changes> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
      method: z.literal('EXPERIMENTAL_changes'),
      params: RpcStateChangesInBlockByTypeRequestSchema,
    }),
  );

export const JsonRpcRequest_for_EXPERIMENTAL_changes_in_blockSchema: z.ZodMiniType<t.JsonRpcRequest_for_EXPERIMENTAL_changes_in_block> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
      method: z.literal('EXPERIMENTAL_changes_in_block'),
      params: RpcStateChangesInBlockRequestSchema,
    }),
  );

export const JsonRpcRequest_for_EXPERIMENTAL_congestion_levelSchema: z.ZodMiniType<t.JsonRpcRequest_for_EXPERIMENTAL_congestion_level> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
      method: z.literal('EXPERIMENTAL_congestion_level'),
      params: RpcCongestionLevelRequestSchema,
    }),
  );

export const JsonRpcRequest_for_EXPERIMENTAL_genesis_configSchema: z.ZodMiniType<t.JsonRpcRequest_for_EXPERIMENTAL_genesis_config> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
      method: z.literal('EXPERIMENTAL_genesis_config'),
      params: GenesisConfigRequestSchema,
    }),
  );

export const JsonRpcRequest_for_EXPERIMENTAL_light_client_block_proofSchema: z.ZodMiniType<t.JsonRpcRequest_for_EXPERIMENTAL_light_client_block_proof> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
      method: z.literal('EXPERIMENTAL_light_client_block_proof'),
      params: RpcLightClientBlockProofRequestSchema,
    }),
  );

export const JsonRpcRequest_for_EXPERIMENTAL_light_client_proofSchema: z.ZodMiniType<t.JsonRpcRequest_for_EXPERIMENTAL_light_client_proof> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
      method: z.literal('EXPERIMENTAL_light_client_proof'),
      params: RpcLightClientExecutionProofRequestSchema,
    }),
  );

export const JsonRpcRequest_for_EXPERIMENTAL_maintenance_windowsSchema: z.ZodMiniType<t.JsonRpcRequest_for_EXPERIMENTAL_maintenance_windows> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
      method: z.literal('EXPERIMENTAL_maintenance_windows'),
      params: RpcMaintenanceWindowsRequestSchema,
    }),
  );

export const JsonRpcRequest_for_EXPERIMENTAL_protocol_configSchema: z.ZodMiniType<t.JsonRpcRequest_for_EXPERIMENTAL_protocol_config> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
      method: z.literal('EXPERIMENTAL_protocol_config'),
      params: RpcProtocolConfigRequestSchema,
    }),
  );

export const JsonRpcRequest_for_EXPERIMENTAL_receiptSchema: z.ZodMiniType<t.JsonRpcRequest_for_EXPERIMENTAL_receipt> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
      method: z.literal('EXPERIMENTAL_receipt'),
      params: RpcReceiptRequestSchema,
    }),
  );

export const JsonRpcRequest_for_EXPERIMENTAL_split_storage_infoSchema: z.ZodMiniType<t.JsonRpcRequest_for_EXPERIMENTAL_split_storage_info> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
      method: z.literal('EXPERIMENTAL_split_storage_info'),
      params: RpcSplitStorageInfoRequestSchema,
    }),
  );

export const JsonRpcRequest_for_EXPERIMENTAL_tx_statusSchema: z.ZodMiniType<t.JsonRpcRequest_for_EXPERIMENTAL_tx_status> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
      method: z.literal('EXPERIMENTAL_tx_status'),
      params: RpcTransactionStatusRequestSchema,
    }),
  );

export const JsonRpcRequest_for_EXPERIMENTAL_validators_orderedSchema: z.ZodMiniType<t.JsonRpcRequest_for_EXPERIMENTAL_validators_ordered> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
      method: z.literal('EXPERIMENTAL_validators_ordered'),
      params: RpcValidatorsOrderedRequestSchema,
    }),
  );

export const JsonRpcRequest_for_blockSchema: z.ZodMiniType<t.JsonRpcRequest_for_block> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
      method: z.literal('block'),
      params: RpcBlockRequestSchema,
    }),
  );

export const JsonRpcRequest_for_broadcast_tx_asyncSchema: z.ZodMiniType<t.JsonRpcRequest_for_broadcast_tx_async> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
      method: z.literal('broadcast_tx_async'),
      params: RpcSendTransactionRequestSchema,
    }),
  );

export const JsonRpcRequest_for_broadcast_tx_commitSchema: z.ZodMiniType<t.JsonRpcRequest_for_broadcast_tx_commit> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
      method: z.literal('broadcast_tx_commit'),
      params: RpcSendTransactionRequestSchema,
    }),
  );

export const JsonRpcRequest_for_changesSchema: z.ZodMiniType<t.JsonRpcRequest_for_changes> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
      method: z.literal('changes'),
      params: RpcStateChangesInBlockByTypeRequestSchema,
    }),
  );

export const JsonRpcRequest_for_chunkSchema: z.ZodMiniType<t.JsonRpcRequest_for_chunk> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
      method: z.literal('chunk'),
      params: RpcChunkRequestSchema,
    }),
  );

export const JsonRpcRequest_for_client_configSchema: z.ZodMiniType<t.JsonRpcRequest_for_client_config> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
      method: z.literal('client_config'),
      params: RpcClientConfigRequestSchema,
    }),
  );

export const JsonRpcRequest_for_gas_priceSchema: z.ZodMiniType<t.JsonRpcRequest_for_gas_price> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
      method: z.literal('gas_price'),
      params: RpcGasPriceRequestSchema,
    }),
  );

export const JsonRpcRequest_for_healthSchema: z.ZodMiniType<t.JsonRpcRequest_for_health> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
      method: z.literal('health'),
      params: RpcHealthRequestSchema,
    }),
  );

export const JsonRpcRequest_for_light_client_proofSchema: z.ZodMiniType<t.JsonRpcRequest_for_light_client_proof> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
      method: z.literal('light_client_proof'),
      params: RpcLightClientExecutionProofRequestSchema,
    }),
  );

export const JsonRpcRequest_for_network_infoSchema: z.ZodMiniType<t.JsonRpcRequest_for_network_info> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
      method: z.literal('network_info'),
      params: RpcNetworkInfoRequestSchema,
    }),
  );

export const JsonRpcRequest_for_next_light_client_blockSchema: z.ZodMiniType<t.JsonRpcRequest_for_next_light_client_block> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
      method: z.literal('next_light_client_block'),
      params: RpcLightClientNextBlockRequestSchema,
    }),
  );

export const JsonRpcRequest_for_querySchema: z.ZodMiniType<t.JsonRpcRequest_for_query> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
      method: z.literal('query'),
      params: RpcQueryRequestSchema,
    }),
  );

export const JsonRpcRequest_for_send_txSchema: z.ZodMiniType<t.JsonRpcRequest_for_send_tx> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
      method: z.literal('send_tx'),
      params: RpcSendTransactionRequestSchema,
    }),
  );

export const JsonRpcRequest_for_statusSchema: z.ZodMiniType<t.JsonRpcRequest_for_status> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
      method: z.literal('status'),
      params: RpcStatusRequestSchema,
    }),
  );

export const JsonRpcRequest_for_txSchema: z.ZodMiniType<t.JsonRpcRequest_for_tx> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
      method: z.literal('tx'),
      params: RpcTransactionStatusRequestSchema,
    }),
  );

export const JsonRpcRequest_for_validatorsSchema: z.ZodMiniType<t.JsonRpcRequest_for_validators> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      id: z.string(),
      jsonrpc: z.string(),
      method: z.literal('validators'),
      params: RpcValidatorRequestSchema,
    }),
  );

export const JsonRpcResponse_for_Array_of_Range_of_uint64_and_RpcErrorSchema: z.ZodMiniType<t.JsonRpcResponse_for_Array_of_Range_of_uint64_and_RpcError> =
  /* @__PURE__ */ z.lazy(() =>
    z.intersection(
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      }),
      z.union([
        z.object({
          result: z.array(Range_of_uint64Schema),
        }),
        z.object({
          error: RpcErrorSchema,
        }),
      ]),
    ),
  );

export const JsonRpcResponse_for_Array_of_ValidatorStakeView_and_RpcErrorSchema: z.ZodMiniType<t.JsonRpcResponse_for_Array_of_ValidatorStakeView_and_RpcError> =
  /* @__PURE__ */ z.lazy(() =>
    z.intersection(
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      }),
      z.union([
        z.object({
          result: z.array(ValidatorStakeViewSchema),
        }),
        z.object({
          error: RpcErrorSchema,
        }),
      ]),
    ),
  );

export const JsonRpcResponse_for_CryptoHash_and_RpcErrorSchema: z.ZodMiniType<t.JsonRpcResponse_for_CryptoHash_and_RpcError> =
  /* @__PURE__ */ z.lazy(() =>
    z.intersection(
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      }),
      z.union([
        z.object({
          result: CryptoHashSchema,
        }),
        z.object({
          error: RpcErrorSchema,
        }),
      ]),
    ),
  );

export const JsonRpcResponse_for_GenesisConfig_and_RpcErrorSchema: z.ZodMiniType<t.JsonRpcResponse_for_GenesisConfig_and_RpcError> =
  /* @__PURE__ */ z.lazy(() =>
    z.intersection(
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      }),
      z.union([
        z.object({
          result: GenesisConfigSchema,
        }),
        z.object({
          error: RpcErrorSchema,
        }),
      ]),
    ),
  );

export const JsonRpcResponse_for_Nullable_RpcHealthResponse_and_RpcErrorSchema: z.ZodMiniType<t.JsonRpcResponse_for_Nullable_RpcHealthResponse_and_RpcError> =
  /* @__PURE__ */ z.lazy(() =>
    z.intersection(
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      }),
      z.union([
        z.object({
          result: z.union([RpcHealthResponseSchema, z.null()]),
        }),
        z.object({
          error: RpcErrorSchema,
        }),
      ]),
    ),
  );

export const JsonRpcResponse_for_RpcBlockResponse_and_RpcErrorSchema: z.ZodMiniType<t.JsonRpcResponse_for_RpcBlockResponse_and_RpcError> =
  /* @__PURE__ */ z.lazy(() =>
    z.intersection(
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      }),
      z.union([
        z.object({
          result: RpcBlockResponseSchema,
        }),
        z.object({
          error: RpcErrorSchema,
        }),
      ]),
    ),
  );

export const JsonRpcResponse_for_RpcChunkResponse_and_RpcErrorSchema: z.ZodMiniType<t.JsonRpcResponse_for_RpcChunkResponse_and_RpcError> =
  /* @__PURE__ */ z.lazy(() =>
    z.intersection(
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      }),
      z.union([
        z.object({
          result: RpcChunkResponseSchema,
        }),
        z.object({
          error: RpcErrorSchema,
        }),
      ]),
    ),
  );

export const JsonRpcResponse_for_RpcClientConfigResponse_and_RpcErrorSchema: z.ZodMiniType<t.JsonRpcResponse_for_RpcClientConfigResponse_and_RpcError> =
  /* @__PURE__ */ z.lazy(() =>
    z.intersection(
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      }),
      z.union([
        z.object({
          result: RpcClientConfigResponseSchema,
        }),
        z.object({
          error: RpcErrorSchema,
        }),
      ]),
    ),
  );

export const JsonRpcResponse_for_RpcCongestionLevelResponse_and_RpcErrorSchema: z.ZodMiniType<t.JsonRpcResponse_for_RpcCongestionLevelResponse_and_RpcError> =
  /* @__PURE__ */ z.lazy(() =>
    z.intersection(
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      }),
      z.union([
        z.object({
          result: RpcCongestionLevelResponseSchema,
        }),
        z.object({
          error: RpcErrorSchema,
        }),
      ]),
    ),
  );

export const JsonRpcResponse_for_RpcGasPriceResponse_and_RpcErrorSchema: z.ZodMiniType<t.JsonRpcResponse_for_RpcGasPriceResponse_and_RpcError> =
  /* @__PURE__ */ z.lazy(() =>
    z.intersection(
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      }),
      z.union([
        z.object({
          result: RpcGasPriceResponseSchema,
        }),
        z.object({
          error: RpcErrorSchema,
        }),
      ]),
    ),
  );

export const JsonRpcResponse_for_RpcLightClientBlockProofResponse_and_RpcErrorSchema: z.ZodMiniType<t.JsonRpcResponse_for_RpcLightClientBlockProofResponse_and_RpcError> =
  /* @__PURE__ */ z.lazy(() =>
    z.intersection(
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      }),
      z.union([
        z.object({
          result: RpcLightClientBlockProofResponseSchema,
        }),
        z.object({
          error: RpcErrorSchema,
        }),
      ]),
    ),
  );

export const JsonRpcResponse_for_RpcLightClientExecutionProofResponse_and_RpcErrorSchema: z.ZodMiniType<t.JsonRpcResponse_for_RpcLightClientExecutionProofResponse_and_RpcError> =
  /* @__PURE__ */ z.lazy(() =>
    z.intersection(
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      }),
      z.union([
        z.object({
          result: RpcLightClientExecutionProofResponseSchema,
        }),
        z.object({
          error: RpcErrorSchema,
        }),
      ]),
    ),
  );

export const JsonRpcResponse_for_RpcLightClientNextBlockResponse_and_RpcErrorSchema: z.ZodMiniType<t.JsonRpcResponse_for_RpcLightClientNextBlockResponse_and_RpcError> =
  /* @__PURE__ */ z.lazy(() =>
    z.intersection(
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      }),
      z.union([
        z.object({
          result: RpcLightClientNextBlockResponseSchema,
        }),
        z.object({
          error: RpcErrorSchema,
        }),
      ]),
    ),
  );

export const JsonRpcResponse_for_RpcNetworkInfoResponse_and_RpcErrorSchema: z.ZodMiniType<t.JsonRpcResponse_for_RpcNetworkInfoResponse_and_RpcError> =
  /* @__PURE__ */ z.lazy(() =>
    z.intersection(
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      }),
      z.union([
        z.object({
          result: RpcNetworkInfoResponseSchema,
        }),
        z.object({
          error: RpcErrorSchema,
        }),
      ]),
    ),
  );

export const JsonRpcResponse_for_RpcProtocolConfigResponse_and_RpcErrorSchema: z.ZodMiniType<t.JsonRpcResponse_for_RpcProtocolConfigResponse_and_RpcError> =
  /* @__PURE__ */ z.lazy(() =>
    z.intersection(
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      }),
      z.union([
        z.object({
          result: RpcProtocolConfigResponseSchema,
        }),
        z.object({
          error: RpcErrorSchema,
        }),
      ]),
    ),
  );

export const JsonRpcResponse_for_RpcQueryResponse_and_RpcErrorSchema: z.ZodMiniType<t.JsonRpcResponse_for_RpcQueryResponse_and_RpcError> =
  /* @__PURE__ */ z.lazy(() =>
    z.intersection(
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      }),
      z.union([
        z.object({
          result: RpcQueryResponseSchema,
        }),
        z.object({
          error: RpcErrorSchema,
        }),
      ]),
    ),
  );

export const JsonRpcResponse_for_RpcReceiptResponse_and_RpcErrorSchema: z.ZodMiniType<t.JsonRpcResponse_for_RpcReceiptResponse_and_RpcError> =
  /* @__PURE__ */ z.lazy(() =>
    z.intersection(
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      }),
      z.union([
        z.object({
          result: RpcReceiptResponseSchema,
        }),
        z.object({
          error: RpcErrorSchema,
        }),
      ]),
    ),
  );

export const JsonRpcResponse_for_RpcSplitStorageInfoResponse_and_RpcErrorSchema: z.ZodMiniType<t.JsonRpcResponse_for_RpcSplitStorageInfoResponse_and_RpcError> =
  /* @__PURE__ */ z.lazy(() =>
    z.intersection(
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      }),
      z.union([
        z.object({
          result: RpcSplitStorageInfoResponseSchema,
        }),
        z.object({
          error: RpcErrorSchema,
        }),
      ]),
    ),
  );

export const JsonRpcResponse_for_RpcStateChangesInBlockByTypeResponse_and_RpcErrorSchema: z.ZodMiniType<t.JsonRpcResponse_for_RpcStateChangesInBlockByTypeResponse_and_RpcError> =
  /* @__PURE__ */ z.lazy(() =>
    z.intersection(
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      }),
      z.union([
        z.object({
          result: RpcStateChangesInBlockByTypeResponseSchema,
        }),
        z.object({
          error: RpcErrorSchema,
        }),
      ]),
    ),
  );

export const JsonRpcResponse_for_RpcStateChangesInBlockResponse_and_RpcErrorSchema: z.ZodMiniType<t.JsonRpcResponse_for_RpcStateChangesInBlockResponse_and_RpcError> =
  /* @__PURE__ */ z.lazy(() =>
    z.intersection(
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      }),
      z.union([
        z.object({
          result: RpcStateChangesInBlockResponseSchema,
        }),
        z.object({
          error: RpcErrorSchema,
        }),
      ]),
    ),
  );

export const JsonRpcResponse_for_RpcStatusResponse_and_RpcErrorSchema: z.ZodMiniType<t.JsonRpcResponse_for_RpcStatusResponse_and_RpcError> =
  /* @__PURE__ */ z.lazy(() =>
    z.intersection(
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      }),
      z.union([
        z.object({
          result: RpcStatusResponseSchema,
        }),
        z.object({
          error: RpcErrorSchema,
        }),
      ]),
    ),
  );

export const JsonRpcResponse_for_RpcTransactionResponse_and_RpcErrorSchema: z.ZodMiniType<t.JsonRpcResponse_for_RpcTransactionResponse_and_RpcError> =
  /* @__PURE__ */ z.lazy(() =>
    z.intersection(
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      }),
      z.union([
        z.object({
          result: RpcTransactionResponseSchema,
        }),
        z.object({
          error: RpcErrorSchema,
        }),
      ]),
    ),
  );

export const JsonRpcResponse_for_RpcValidatorResponse_and_RpcErrorSchema: z.ZodMiniType<t.JsonRpcResponse_for_RpcValidatorResponse_and_RpcError> =
  /* @__PURE__ */ z.lazy(() =>
    z.intersection(
      z.object({
        id: z.string(),
        jsonrpc: z.string(),
      }),
      z.union([
        z.object({
          result: RpcValidatorResponseSchema,
        }),
        z.object({
          error: RpcErrorSchema,
        }),
      ]),
    ),
  );

export const KnownProducerViewSchema: z.ZodMiniType<t.KnownProducerView> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      accountId: AccountIdSchema,
      nextHops: z.optional(z.union([z.array(PublicKeySchema), z.null()])),
      peerId: PublicKeySchema,
    }),
  );

export const LightClientBlockLiteViewSchema: z.ZodMiniType<t.LightClientBlockLiteView> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      innerLite: BlockHeaderInnerLiteViewSchema,
      innerRestHash: CryptoHashSchema,
      prevBlockHash: CryptoHashSchema,
    }),
  );

export const LimitConfigSchema: z.ZodMiniType<t.LimitConfig> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      accountIdValidityRulesVersion: AccountIdValidityRulesVersionSchema,
      initialMemoryPages: z.number(),
      maxActionsPerReceipt: z.number(),
      maxArgumentsLength: z.number(),
      maxContractSize: z.number(),
      maxFunctionsNumberPerContract: z.optional(
        z.union([z.number(), z.null()]),
      ),
      maxGasBurnt: z.number(),
      maxLengthMethodName: z.number(),
      maxLengthReturnedData: z.number(),
      maxLengthStorageKey: z.number(),
      maxLengthStorageValue: z.number(),
      maxLocalsPerContract: z.optional(z.union([z.number(), z.null()])),
      maxMemoryPages: z.number(),
      maxNumberBytesMethodNames: z.number(),
      maxNumberInputDataDependencies: z.number(),
      maxNumberLogs: z.number(),
      maxNumberRegisters: z.number(),
      maxPromisesPerFunctionCallAction: z.number(),
      maxReceiptSize: z.number(),
      maxRegisterSize: z.number(),
      maxStackHeight: z.number(),
      maxTotalLogLength: z.number(),
      maxTotalPrepaidGas: z.number(),
      maxTransactionSize: z.number(),
      maxYieldPayloadSize: z.number(),
      perReceiptStorageProofSizeLimit: z.number(),
      registersMemoryLimit: z.number(),
      yieldTimeoutLengthInBlocks: z.number(),
    }),
  );

export const LogSummaryStyleSchema: z.ZodMiniType<t.LogSummaryStyle> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([z.literal('plain'), z.literal('colored')]),
  );

export const MerklePathItemSchema: z.ZodMiniType<t.MerklePathItem> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      direction: DirectionSchema,
      hash: CryptoHashSchema,
    }),
  );

export const MethodResolveErrorSchema: z.ZodMiniType<t.MethodResolveError> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([
      z.literal('MethodEmptyName'),
      z.literal('MethodNotFound'),
      z.literal('MethodInvalidSignature'),
    ]),
  );

export const MissingTrieValueSchema: z.ZodMiniType<t.MissingTrieValue> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      context: MissingTrieValueContextSchema,
      hash: CryptoHashSchema,
    }),
  );

export const MissingTrieValueContextSchema: z.ZodMiniType<t.MissingTrieValueContext> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([
      z.literal('TrieIterator'),
      z.literal('TriePrefetchingStorage'),
      z.literal('TrieMemoryPartialStorage'),
      z.literal('TrieStorage'),
    ]),
  );

export const MutableConfigValueSchema: z.ZodMiniType<t.MutableConfigValue> =
  /* @__PURE__ */ z.lazy(() => z.string());

export const NetworkInfoViewSchema: z.ZodMiniType<t.NetworkInfoView> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      connectedPeers: z.array(PeerInfoViewSchema),
      knownProducers: z.array(KnownProducerViewSchema),
      numConnectedPeers: z.number(),
      peerMaxCount: z.number(),
      tier1AccountsData: z.array(AccountDataViewSchema),
      tier1AccountsKeys: z.array(PublicKeySchema),
      tier1Connections: z.array(PeerInfoViewSchema),
    }),
  );

export const NextEpochValidatorInfoSchema: z.ZodMiniType<t.NextEpochValidatorInfo> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      accountId: AccountIdSchema,
      publicKey: PublicKeySchema,
      shards: z.array(ShardIdSchema),
      stake: z.string(),
    }),
  );

export const NonDelegateActionSchema: z.ZodMiniType<t.NonDelegateAction> =
  /* @__PURE__ */ z.lazy(() => ActionSchema);

export const PeerIdSchema: z.ZodMiniType<t.PeerId> = /* @__PURE__ */ z.lazy(
  () => PublicKeySchema,
);

export const PeerInfoViewSchema: z.ZodMiniType<t.PeerInfoView> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      accountId: z.optional(z.union([AccountIdSchema, z.null()])),
      addr: z.string(),
      archival: z.boolean(),
      blockHash: z.optional(z.union([CryptoHashSchema, z.null()])),
      connectionEstablishedTimeMillis: z.number(),
      height: z.optional(z.union([z.number(), z.null()])),
      isHighestBlockInvalid: z.boolean(),
      isOutboundPeer: z.boolean(),
      lastTimePeerRequestedMillis: z.number(),
      lastTimeReceivedMessageMillis: z.number(),
      nonce: z.number(),
      peerId: PublicKeySchema,
      receivedBytesPerSec: z.number(),
      sentBytesPerSec: z.number(),
      trackedShards: z.array(ShardIdSchema),
    }),
  );

export const PrepareErrorSchema: z.ZodMiniType<t.PrepareError> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([
      z.literal('Serialization'),
      z.literal('Deserialization'),
      z.literal('InternalMemoryDeclared'),
      z.literal('GasInstrumentation'),
      z.literal('StackHeightInstrumentation'),
      z.literal('Instantiate'),
      z.literal('Memory'),
      z.literal('TooManyFunctions'),
      z.literal('TooManyLocals'),
    ]),
  );

export const PublicKeySchema: z.ZodMiniType<t.PublicKey> =
  /* @__PURE__ */ z.lazy(() => z.string());

export const Range_of_uint64Schema: z.ZodMiniType<t.Range_of_uint64> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      end: z.number(),
      start: z.number(),
    }),
  );

export const ReceiptEnumViewSchema: z.ZodMiniType<t.ReceiptEnumView> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([
      z.object({
        Action: z.object({
          actions: z.array(ActionViewSchema),
          gasPrice: z.string(),
          inputDataIds: z.array(CryptoHashSchema),
          isPromiseYield: z.boolean(),
          outputDataReceivers: z.array(DataReceiverViewSchema),
          signerId: AccountIdSchema,
          signerPublicKey: PublicKeySchema,
        }),
      }),
      z.object({
        Data: z.object({
          data: z.union([z.string(), z.null()]),
          dataId: CryptoHashSchema,
          isPromiseResume: z.boolean(),
        }),
      }),
      z.object({
        GlobalContractDistribution: z.object({
          alreadyDeliveredShards: z.array(ShardIdSchema),
          code: z.string(),
          id: GlobalContractIdentifierSchema,
          targetShard: ShardIdSchema,
        }),
      }),
    ]),
  );

export const ReceiptValidationErrorSchema: z.ZodMiniType<t.ReceiptValidationError> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([
      z.object({
        InvalidPredecessorId: z.object({
          accountId: z.string(),
        }),
      }),
      z.object({
        InvalidReceiverId: z.object({
          accountId: z.string(),
        }),
      }),
      z.object({
        InvalidSignerId: z.object({
          accountId: z.string(),
        }),
      }),
      z.object({
        InvalidDataReceiverId: z.object({
          accountId: z.string(),
        }),
      }),
      z.object({
        ReturnedValueLengthExceeded: z.object({
          length: z.number(),
          limit: z.number(),
        }),
      }),
      z.object({
        NumberInputDataDependenciesExceeded: z.object({
          limit: z.number(),
          numberOfInputDataDependencies: z.number(),
        }),
      }),
      z.object({
        ActionsValidation: ActionsValidationErrorSchema,
      }),
      z.object({
        ReceiptSizeExceeded: z.object({
          limit: z.number(),
          size: z.number(),
        }),
      }),
    ]),
  );

export const ReceiptViewSchema: z.ZodMiniType<t.ReceiptView> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      predecessorId: AccountIdSchema,
      priority: z.number(),
      receipt: ReceiptEnumViewSchema,
      receiptId: CryptoHashSchema,
      receiverId: AccountIdSchema,
    }),
  );

export const RpcBlockRequestSchema: z.ZodMiniType<t.RpcBlockRequest> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([
      z.object({
        blockId: BlockIdSchema,
      }),
      z.object({
        finality: FinalitySchema,
      }),
      z.object({
        syncCheckpoint: SyncCheckpointSchema,
      }),
    ]),
  );

export const RpcBlockResponseSchema: z.ZodMiniType<t.RpcBlockResponse> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      author: AccountIdSchema,
      chunks: z.array(ChunkHeaderViewSchema),
      header: BlockHeaderViewSchema,
    }),
  );

export const RpcChunkRequestSchema: z.ZodMiniType<t.RpcChunkRequest> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([
      z.object({
        blockId: BlockIdSchema,
        shardId: ShardIdSchema,
      }),
      z.object({
        chunkId: CryptoHashSchema,
      }),
    ]),
  );

export const RpcChunkResponseSchema: z.ZodMiniType<t.RpcChunkResponse> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      author: AccountIdSchema,
      header: ChunkHeaderViewSchema,
      receipts: z.array(ReceiptViewSchema),
      transactions: z.array(SignedTransactionViewSchema),
    }),
  );

export const RpcClientConfigRequestSchema: z.ZodMiniType<t.RpcClientConfigRequest> =
  /* @__PURE__ */ z.lazy(() => z.null());

export const RpcClientConfigResponseSchema: z.ZodMiniType<t.RpcClientConfigResponse> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      archive: z.boolean(),
      blockFetchHorizon: z.number(),
      blockHeaderFetchHorizon: z.number(),
      blockProductionTrackingDelay: z.array(z.number()),
      catchupStepPeriod: z.array(z.number()),
      chainId: z.string(),
      chunkDistributionNetwork: z.optional(
        z.union([ChunkDistributionNetworkConfigSchema, z.null()]),
      ),
      chunkRequestRetryPeriod: z.array(z.number()),
      chunkWaitMult: z.array(z.number()),
      clientBackgroundMigrationThreads: z.number(),
      doomslugStepPeriod: z.array(z.number()),
      enableMultilineLogging: z.boolean(),
      enableStatisticsExport: z.boolean(),
      epochLength: z.number(),
      epochSync: EpochSyncConfigSchema,
      expectedShutdown: MutableConfigValueSchema,
      gc: GCConfigSchema,
      headerSyncExpectedHeightPerSecond: z.number(),
      headerSyncInitialTimeout: z.array(z.number()),
      headerSyncProgressTimeout: z.array(z.number()),
      headerSyncStallBanTimeout: z.array(z.number()),
      logSummaryPeriod: z.array(z.number()),
      logSummaryStyle: LogSummaryStyleSchema,
      maxBlockProductionDelay: z.array(z.number()),
      maxBlockWaitDelay: z.array(z.number()),
      maxGasBurntView: z.optional(z.union([z.number(), z.null()])),
      minBlockProductionDelay: z.array(z.number()),
      minNumPeers: z.number(),
      numBlockProducerSeats: z.number(),
      orphanStateWitnessMaxSize: z.number(),
      orphanStateWitnessPoolSize: z.number(),
      produceChunkAddTransactionsTimeLimit: z.string(),
      produceEmptyBlocks: z.boolean(),
      reshardingConfig: MutableConfigValueSchema,
      rpcAddr: z.optional(z.union([z.string(), z.null()])),
      saveInvalidWitnesses: z.boolean(),
      saveLatestWitnesses: z.boolean(),
      saveTrieChanges: z.boolean(),
      saveTxOutcomes: z.boolean(),
      skipSyncWait: z.boolean(),
      stateSync: StateSyncConfigSchema,
      stateSyncEnabled: z.boolean(),
      stateSyncExternalBackoff: z.array(z.number()),
      stateSyncExternalTimeout: z.array(z.number()),
      stateSyncP2pTimeout: z.array(z.number()),
      stateSyncRetryBackoff: z.array(z.number()),
      syncCheckPeriod: z.array(z.number()),
      syncHeightThreshold: z.number(),
      syncMaxBlockRequests: z.number(),
      syncStepPeriod: z.array(z.number()),
      trackedShardsConfig: TrackedShardsConfigSchema,
      transactionPoolSizeLimit: z.optional(z.union([z.number(), z.null()])),
      transactionRequestHandlerThreads: z.number(),
      trieViewerStateSizeLimit: z.optional(z.union([z.number(), z.null()])),
      ttlAccountIdRouter: z.array(z.number()),
      txRoutingHeightHorizon: z.number(),
      version: VersionSchema,
      viewClientNumStateRequestsPerThrottlePeriod: z.number(),
      viewClientThreads: z.number(),
      viewClientThrottlePeriod: z.array(z.number()),
    }),
  );

export const RpcCongestionLevelRequestSchema: z.ZodMiniType<t.RpcCongestionLevelRequest> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([
      z.object({
        blockId: BlockIdSchema,
        shardId: ShardIdSchema,
      }),
      z.object({
        chunkId: CryptoHashSchema,
      }),
    ]),
  );

export const RpcCongestionLevelResponseSchema: z.ZodMiniType<t.RpcCongestionLevelResponse> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      congestionLevel: z.number(),
    }),
  );

export const RpcErrorSchema: z.ZodMiniType<t.RpcError> = /* @__PURE__ */ z.lazy(
  () =>
    z.intersection(
      z.object({
        cause: z.optional(z.unknown()),
        code: z.number(),
        data: z.optional(z.unknown()),
        message: z.string(),
        name: z.optional(z.unknown()),
      }),
      z.union([
        z.object({
          cause: z.optional(RpcRequestValidationErrorKindSchema),
          name: z.literal('REQUEST_VALIDATION_ERROR'),
        }),
        z.object({
          cause: z.optional(z.unknown()),
          name: z.literal('HANDLER_ERROR'),
        }),
        z.object({
          cause: z.optional(z.unknown()),
          name: z.literal('INTERNAL_ERROR'),
        }),
      ]),
    ),
);

export const RpcGasPriceRequestSchema: z.ZodMiniType<t.RpcGasPriceRequest> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      blockId: z.optional(z.union([BlockIdSchema, z.null()])),
    }),
  );

export const RpcGasPriceResponseSchema: z.ZodMiniType<t.RpcGasPriceResponse> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      gasPrice: z.string(),
    }),
  );

export const RpcHealthRequestSchema: z.ZodMiniType<t.RpcHealthRequest> =
  /* @__PURE__ */ z.lazy(() => z.null());

export const RpcHealthResponseSchema: z.ZodMiniType<t.RpcHealthResponse> =
  /* @__PURE__ */ z.lazy(() => z.null());

export const RpcKnownProducerSchema: z.ZodMiniType<t.RpcKnownProducer> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      accountId: AccountIdSchema,
      addr: z.optional(z.union([z.string(), z.null()])),
      peerId: PeerIdSchema,
    }),
  );

export const RpcLightClientBlockProofRequestSchema: z.ZodMiniType<t.RpcLightClientBlockProofRequest> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      blockHash: CryptoHashSchema,
      lightClientHead: CryptoHashSchema,
    }),
  );

export const RpcLightClientBlockProofResponseSchema: z.ZodMiniType<t.RpcLightClientBlockProofResponse> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      blockHeaderLite: LightClientBlockLiteViewSchema,
      blockProof: z.array(MerklePathItemSchema),
    }),
  );

export const RpcLightClientExecutionProofRequestSchema: z.ZodMiniType<t.RpcLightClientExecutionProofRequest> =
  /* @__PURE__ */ z.lazy(() =>
    z.intersection(
      z.object({
        lightClientHead: CryptoHashSchema,
      }),
      z.union([
        z.object({
          senderId: AccountIdSchema,
          transactionHash: CryptoHashSchema,
          type: z.literal('transaction'),
        }),
        z.object({
          receiptId: CryptoHashSchema,
          receiverId: AccountIdSchema,
          type: z.literal('receipt'),
        }),
      ]),
    ),
  );

export const RpcLightClientExecutionProofResponseSchema: z.ZodMiniType<t.RpcLightClientExecutionProofResponse> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      blockHeaderLite: LightClientBlockLiteViewSchema,
      blockProof: z.array(MerklePathItemSchema),
      outcomeProof: ExecutionOutcomeWithIdViewSchema,
      outcomeRootProof: z.array(MerklePathItemSchema),
    }),
  );

export const RpcLightClientNextBlockRequestSchema: z.ZodMiniType<t.RpcLightClientNextBlockRequest> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      lastBlockHash: CryptoHashSchema,
    }),
  );

export const RpcLightClientNextBlockResponseSchema: z.ZodMiniType<t.RpcLightClientNextBlockResponse> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      approvalsAfterNext: z.optional(
        z.array(z.union([SignatureSchema, z.null()])),
      ),
      innerLite: z.optional(BlockHeaderInnerLiteViewSchema),
      innerRestHash: z.optional(CryptoHashSchema),
      nextBlockInnerHash: z.optional(CryptoHashSchema),
      nextBps: z.optional(
        z.union([z.array(ValidatorStakeViewSchema), z.null()]),
      ),
      prevBlockHash: z.optional(CryptoHashSchema),
    }),
  );

export const RpcMaintenanceWindowsRequestSchema: z.ZodMiniType<t.RpcMaintenanceWindowsRequest> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      accountId: AccountIdSchema,
    }),
  );

export const RpcNetworkInfoRequestSchema: z.ZodMiniType<t.RpcNetworkInfoRequest> =
  /* @__PURE__ */ z.lazy(() => z.null());

export const RpcNetworkInfoResponseSchema: z.ZodMiniType<t.RpcNetworkInfoResponse> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      activePeers: z.array(RpcPeerInfoSchema),
      knownProducers: z.array(RpcKnownProducerSchema),
      numActivePeers: z.number(),
      peerMaxCount: z.number(),
      receivedBytesPerSec: z.number(),
      sentBytesPerSec: z.number(),
    }),
  );

export const RpcPeerInfoSchema: z.ZodMiniType<t.RpcPeerInfo> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      accountId: z.optional(z.union([AccountIdSchema, z.null()])),
      addr: z.optional(z.union([z.string(), z.null()])),
      id: PeerIdSchema,
    }),
  );

export const RpcProtocolConfigRequestSchema: z.ZodMiniType<t.RpcProtocolConfigRequest> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([
      z.object({
        blockId: BlockIdSchema,
      }),
      z.object({
        finality: FinalitySchema,
      }),
      z.object({
        syncCheckpoint: SyncCheckpointSchema,
      }),
    ]),
  );

export const RpcProtocolConfigResponseSchema: z.ZodMiniType<t.RpcProtocolConfigResponse> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      avgHiddenValidatorSeatsPerShard: z.array(z.number()),
      blockProducerKickoutThreshold: z.number(),
      chainId: z.string(),
      chunkProducerKickoutThreshold: z.number(),
      chunkValidatorOnlyKickoutThreshold: z.number(),
      dynamicResharding: z.boolean(),
      epochLength: z.number(),
      fishermenThreshold: z.string(),
      gasLimit: z.number(),
      gasPriceAdjustmentRate: z.array(z.number()),
      genesisHeight: z.number(),
      genesisTime: z.string(),
      maxGasPrice: z.string(),
      maxInflationRate: z.array(z.number()),
      maxKickoutStakePerc: z.number(),
      minGasPrice: z.string(),
      minimumStakeDivisor: z.number(),
      minimumStakeRatio: z.array(z.number()),
      minimumValidatorsPerShard: z.number(),
      numBlockProducerSeats: z.number(),
      numBlockProducerSeatsPerShard: z.array(z.number()),
      numBlocksPerYear: z.number(),
      onlineMaxThreshold: z.array(z.number()),
      onlineMinThreshold: z.array(z.number()),
      protocolRewardRate: z.array(z.number()),
      protocolTreasuryAccount: AccountIdSchema,
      protocolUpgradeStakeThreshold: z.array(z.number()),
      protocolVersion: z.number(),
      runtimeConfig: RuntimeConfigViewSchema,
      shardLayout: ShardLayoutSchema,
      shuffleShardAssignmentForChunkProducers: z.boolean(),
      targetValidatorMandatesPerShard: z.number(),
      transactionValidityPeriod: z.number(),
    }),
  );

export const RpcQueryRequestSchema: z.ZodMiniType<t.RpcQueryRequest> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([
      z.intersection(
        z.object({
          blockId: BlockIdSchema,
        }),
        z.object({
          accountId: AccountIdSchema,
          requestType: z.literal('view_account'),
        }),
      ),
      z.intersection(
        z.object({
          blockId: BlockIdSchema,
        }),
        z.object({
          accountId: AccountIdSchema,
          requestType: z.literal('view_code'),
        }),
      ),
      z.intersection(
        z.object({
          blockId: BlockIdSchema,
        }),
        z.object({
          accountId: AccountIdSchema,
          includeProof: z.optional(z.boolean()),
          prefixBase64: StoreKeySchema,
          requestType: z.literal('view_state'),
        }),
      ),
      z.intersection(
        z.object({
          blockId: BlockIdSchema,
        }),
        z.object({
          accountId: AccountIdSchema,
          publicKey: PublicKeySchema,
          requestType: z.literal('view_access_key'),
        }),
      ),
      z.intersection(
        z.object({
          blockId: BlockIdSchema,
        }),
        z.object({
          accountId: AccountIdSchema,
          requestType: z.literal('view_access_key_list'),
        }),
      ),
      z.intersection(
        z.object({
          blockId: BlockIdSchema,
        }),
        z.object({
          accountId: AccountIdSchema,
          argsBase64: FunctionArgsSchema,
          methodName: z.string(),
          requestType: z.literal('call_function'),
        }),
      ),
      z.intersection(
        z.object({
          blockId: BlockIdSchema,
        }),
        z.object({
          codeHash: CryptoHashSchema,
          requestType: z.literal('view_global_contract_code'),
        }),
      ),
      z.intersection(
        z.object({
          blockId: BlockIdSchema,
        }),
        z.object({
          accountId: AccountIdSchema,
          requestType: z.literal('view_global_contract_code_by_account_id'),
        }),
      ),
      z.intersection(
        z.object({
          finality: FinalitySchema,
        }),
        z.object({
          accountId: AccountIdSchema,
          requestType: z.literal('view_account'),
        }),
      ),
      z.intersection(
        z.object({
          finality: FinalitySchema,
        }),
        z.object({
          accountId: AccountIdSchema,
          requestType: z.literal('view_code'),
        }),
      ),
      z.intersection(
        z.object({
          finality: FinalitySchema,
        }),
        z.object({
          accountId: AccountIdSchema,
          includeProof: z.optional(z.boolean()),
          prefixBase64: StoreKeySchema,
          requestType: z.literal('view_state'),
        }),
      ),
      z.intersection(
        z.object({
          finality: FinalitySchema,
        }),
        z.object({
          accountId: AccountIdSchema,
          publicKey: PublicKeySchema,
          requestType: z.literal('view_access_key'),
        }),
      ),
      z.intersection(
        z.object({
          finality: FinalitySchema,
        }),
        z.object({
          accountId: AccountIdSchema,
          requestType: z.literal('view_access_key_list'),
        }),
      ),
      z.intersection(
        z.object({
          finality: FinalitySchema,
        }),
        z.object({
          accountId: AccountIdSchema,
          argsBase64: FunctionArgsSchema,
          methodName: z.string(),
          requestType: z.literal('call_function'),
        }),
      ),
      z.intersection(
        z.object({
          finality: FinalitySchema,
        }),
        z.object({
          codeHash: CryptoHashSchema,
          requestType: z.literal('view_global_contract_code'),
        }),
      ),
      z.intersection(
        z.object({
          finality: FinalitySchema,
        }),
        z.object({
          accountId: AccountIdSchema,
          requestType: z.literal('view_global_contract_code_by_account_id'),
        }),
      ),
      z.intersection(
        z.object({
          syncCheckpoint: SyncCheckpointSchema,
        }),
        z.object({
          accountId: AccountIdSchema,
          requestType: z.literal('view_account'),
        }),
      ),
      z.intersection(
        z.object({
          syncCheckpoint: SyncCheckpointSchema,
        }),
        z.object({
          accountId: AccountIdSchema,
          requestType: z.literal('view_code'),
        }),
      ),
      z.intersection(
        z.object({
          syncCheckpoint: SyncCheckpointSchema,
        }),
        z.object({
          accountId: AccountIdSchema,
          includeProof: z.optional(z.boolean()),
          prefixBase64: StoreKeySchema,
          requestType: z.literal('view_state'),
        }),
      ),
      z.intersection(
        z.object({
          syncCheckpoint: SyncCheckpointSchema,
        }),
        z.object({
          accountId: AccountIdSchema,
          publicKey: PublicKeySchema,
          requestType: z.literal('view_access_key'),
        }),
      ),
      z.intersection(
        z.object({
          syncCheckpoint: SyncCheckpointSchema,
        }),
        z.object({
          accountId: AccountIdSchema,
          requestType: z.literal('view_access_key_list'),
        }),
      ),
      z.intersection(
        z.object({
          syncCheckpoint: SyncCheckpointSchema,
        }),
        z.object({
          accountId: AccountIdSchema,
          argsBase64: FunctionArgsSchema,
          methodName: z.string(),
          requestType: z.literal('call_function'),
        }),
      ),
      z.intersection(
        z.object({
          syncCheckpoint: SyncCheckpointSchema,
        }),
        z.object({
          codeHash: CryptoHashSchema,
          requestType: z.literal('view_global_contract_code'),
        }),
      ),
      z.intersection(
        z.object({
          syncCheckpoint: SyncCheckpointSchema,
        }),
        z.object({
          accountId: AccountIdSchema,
          requestType: z.literal('view_global_contract_code_by_account_id'),
        }),
      ),
    ]),
  );

export const RpcQueryResponseSchema: z.ZodMiniType<t.RpcQueryResponse> =
  /* @__PURE__ */ z.lazy(() =>
    z.intersection(
      z.object({
        blockHash: CryptoHashSchema,
        blockHeight: z.number(),
      }),
      z.union([
        AccountViewSchema,
        ContractCodeViewSchema,
        ViewStateResultSchema,
        CallResultSchema,
        AccessKeyViewSchema,
        AccessKeyListSchema,
      ]),
    ),
  );

export const RpcReceiptRequestSchema: z.ZodMiniType<t.RpcReceiptRequest> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      receiptId: CryptoHashSchema,
    }),
  );

export const RpcReceiptResponseSchema: z.ZodMiniType<t.RpcReceiptResponse> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      predecessorId: AccountIdSchema,
      priority: z.number(),
      receipt: ReceiptEnumViewSchema,
      receiptId: CryptoHashSchema,
      receiverId: AccountIdSchema,
    }),
  );

export const RpcRequestValidationErrorKindSchema: z.ZodMiniType<t.RpcRequestValidationErrorKind> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([
      z.object({
        info: z.object({
          methodName: z.string(),
        }),
        name: z.literal('METHOD_NOT_FOUND'),
      }),
      z.object({
        info: z.object({
          errorMessage: z.string(),
        }),
        name: z.literal('PARSE_ERROR'),
      }),
    ]),
  );

export const RpcSendTransactionRequestSchema: z.ZodMiniType<t.RpcSendTransactionRequest> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      signedTxBase64: SignedTransactionSchema,
      waitUntil: TxExecutionStatusSchema,
    }),
  );

export const RpcSplitStorageInfoRequestSchema: z.ZodMiniType<t.RpcSplitStorageInfoRequest> =
  /* @__PURE__ */ z.lazy(() => z.object({}));

export const RpcSplitStorageInfoResponseSchema: z.ZodMiniType<t.RpcSplitStorageInfoResponse> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      coldHeadHeight: z.optional(z.union([z.number(), z.null()])),
      finalHeadHeight: z.optional(z.union([z.number(), z.null()])),
      headHeight: z.optional(z.union([z.number(), z.null()])),
      hotDbKind: z.optional(z.union([z.string(), z.null()])),
    }),
  );

export const RpcStateChangesInBlockByTypeRequestSchema: z.ZodMiniType<t.RpcStateChangesInBlockByTypeRequest> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([
      z.intersection(
        z.object({
          blockId: BlockIdSchema,
        }),
        z.object({
          accountIds: z.array(AccountIdSchema),
          changesType: z.literal('account_changes'),
        }),
      ),
      z.intersection(
        z.object({
          blockId: BlockIdSchema,
        }),
        z.object({
          changesType: z.literal('single_access_key_changes'),
          keys: z.array(AccountWithPublicKeySchema),
        }),
      ),
      z.intersection(
        z.object({
          blockId: BlockIdSchema,
        }),
        z.object({
          changesType: z.literal('single_gas_key_changes'),
          keys: z.array(AccountWithPublicKeySchema),
        }),
      ),
      z.intersection(
        z.object({
          blockId: BlockIdSchema,
        }),
        z.object({
          accountIds: z.array(AccountIdSchema),
          changesType: z.literal('all_access_key_changes'),
        }),
      ),
      z.intersection(
        z.object({
          blockId: BlockIdSchema,
        }),
        z.object({
          accountIds: z.array(AccountIdSchema),
          changesType: z.literal('all_gas_key_changes'),
        }),
      ),
      z.intersection(
        z.object({
          blockId: BlockIdSchema,
        }),
        z.object({
          accountIds: z.array(AccountIdSchema),
          changesType: z.literal('contract_code_changes'),
        }),
      ),
      z.intersection(
        z.object({
          blockId: BlockIdSchema,
        }),
        z.object({
          accountIds: z.array(AccountIdSchema),
          changesType: z.literal('data_changes'),
          keyPrefixBase64: StoreKeySchema,
        }),
      ),
      z.intersection(
        z.object({
          finality: FinalitySchema,
        }),
        z.object({
          accountIds: z.array(AccountIdSchema),
          changesType: z.literal('account_changes'),
        }),
      ),
      z.intersection(
        z.object({
          finality: FinalitySchema,
        }),
        z.object({
          changesType: z.literal('single_access_key_changes'),
          keys: z.array(AccountWithPublicKeySchema),
        }),
      ),
      z.intersection(
        z.object({
          finality: FinalitySchema,
        }),
        z.object({
          changesType: z.literal('single_gas_key_changes'),
          keys: z.array(AccountWithPublicKeySchema),
        }),
      ),
      z.intersection(
        z.object({
          finality: FinalitySchema,
        }),
        z.object({
          accountIds: z.array(AccountIdSchema),
          changesType: z.literal('all_access_key_changes'),
        }),
      ),
      z.intersection(
        z.object({
          finality: FinalitySchema,
        }),
        z.object({
          accountIds: z.array(AccountIdSchema),
          changesType: z.literal('all_gas_key_changes'),
        }),
      ),
      z.intersection(
        z.object({
          finality: FinalitySchema,
        }),
        z.object({
          accountIds: z.array(AccountIdSchema),
          changesType: z.literal('contract_code_changes'),
        }),
      ),
      z.intersection(
        z.object({
          finality: FinalitySchema,
        }),
        z.object({
          accountIds: z.array(AccountIdSchema),
          changesType: z.literal('data_changes'),
          keyPrefixBase64: StoreKeySchema,
        }),
      ),
      z.intersection(
        z.object({
          syncCheckpoint: SyncCheckpointSchema,
        }),
        z.object({
          accountIds: z.array(AccountIdSchema),
          changesType: z.literal('account_changes'),
        }),
      ),
      z.intersection(
        z.object({
          syncCheckpoint: SyncCheckpointSchema,
        }),
        z.object({
          changesType: z.literal('single_access_key_changes'),
          keys: z.array(AccountWithPublicKeySchema),
        }),
      ),
      z.intersection(
        z.object({
          syncCheckpoint: SyncCheckpointSchema,
        }),
        z.object({
          changesType: z.literal('single_gas_key_changes'),
          keys: z.array(AccountWithPublicKeySchema),
        }),
      ),
      z.intersection(
        z.object({
          syncCheckpoint: SyncCheckpointSchema,
        }),
        z.object({
          accountIds: z.array(AccountIdSchema),
          changesType: z.literal('all_access_key_changes'),
        }),
      ),
      z.intersection(
        z.object({
          syncCheckpoint: SyncCheckpointSchema,
        }),
        z.object({
          accountIds: z.array(AccountIdSchema),
          changesType: z.literal('all_gas_key_changes'),
        }),
      ),
      z.intersection(
        z.object({
          syncCheckpoint: SyncCheckpointSchema,
        }),
        z.object({
          accountIds: z.array(AccountIdSchema),
          changesType: z.literal('contract_code_changes'),
        }),
      ),
      z.intersection(
        z.object({
          syncCheckpoint: SyncCheckpointSchema,
        }),
        z.object({
          accountIds: z.array(AccountIdSchema),
          changesType: z.literal('data_changes'),
          keyPrefixBase64: StoreKeySchema,
        }),
      ),
    ]),
  );

export const RpcStateChangesInBlockByTypeResponseSchema: z.ZodMiniType<t.RpcStateChangesInBlockByTypeResponse> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      blockHash: CryptoHashSchema,
      changes: z.array(StateChangeKindViewSchema),
    }),
  );

export const RpcStateChangesInBlockRequestSchema: z.ZodMiniType<t.RpcStateChangesInBlockRequest> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([
      z.object({
        blockId: BlockIdSchema,
      }),
      z.object({
        finality: FinalitySchema,
      }),
      z.object({
        syncCheckpoint: SyncCheckpointSchema,
      }),
    ]),
  );

export const RpcStateChangesInBlockResponseSchema: z.ZodMiniType<t.RpcStateChangesInBlockResponse> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      blockHash: CryptoHashSchema,
      changes: z.array(StateChangeWithCauseViewSchema),
    }),
  );

export const RpcStatusRequestSchema: z.ZodMiniType<t.RpcStatusRequest> =
  /* @__PURE__ */ z.lazy(() => z.null());

export const RpcStatusResponseSchema: z.ZodMiniType<t.RpcStatusResponse> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      chainId: z.string(),
      detailedDebugStatus: z.optional(
        z.union([DetailedDebugStatusSchema, z.null()]),
      ),
      genesisHash: CryptoHashSchema,
      latestProtocolVersion: z.number(),
      nodeKey: z.optional(z.union([PublicKeySchema, z.null()])),
      nodePublicKey: PublicKeySchema,
      protocolVersion: z.number(),
      rpcAddr: z.optional(z.union([z.string(), z.null()])),
      syncInfo: StatusSyncInfoSchema,
      uptimeSec: z.number(),
      validatorAccountId: z.optional(z.union([AccountIdSchema, z.null()])),
      validatorPublicKey: z.optional(z.union([PublicKeySchema, z.null()])),
      validators: z.array(ValidatorInfoSchema),
      version: VersionSchema,
    }),
  );

export const RpcTransactionResponseSchema: z.ZodMiniType<t.RpcTransactionResponse> =
  /* @__PURE__ */ z.lazy(() =>
    z.intersection(
      z.object({
        finalExecutionStatus: TxExecutionStatusSchema,
      }),
      z.union([
        FinalExecutionOutcomeWithReceiptViewSchema,
        FinalExecutionOutcomeViewSchema,
      ]),
    ),
  );

export const RpcTransactionStatusRequestSchema: z.ZodMiniType<t.RpcTransactionStatusRequest> =
  /* @__PURE__ */ z.lazy(() =>
    z.intersection(
      z.object({
        waitUntil: TxExecutionStatusSchema,
      }),
      z.union([
        z.object({
          signedTxBase64: SignedTransactionSchema,
        }),
        z.object({
          senderAccountId: AccountIdSchema,
          txHash: CryptoHashSchema,
        }),
      ]),
    ),
  );

export const RpcValidatorRequestSchema: z.ZodMiniType<t.RpcValidatorRequest> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([
      z.literal('latest'),
      z.object({
        epochId: EpochIdSchema,
      }),
      z.object({
        blockId: BlockIdSchema,
      }),
    ]),
  );

export const RpcValidatorResponseSchema: z.ZodMiniType<t.RpcValidatorResponse> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      currentFishermen: z.array(ValidatorStakeViewSchema),
      currentProposals: z.array(ValidatorStakeViewSchema),
      currentValidators: z.array(CurrentEpochValidatorInfoSchema),
      epochHeight: z.number(),
      epochStartHeight: z.number(),
      nextFishermen: z.array(ValidatorStakeViewSchema),
      nextValidators: z.array(NextEpochValidatorInfoSchema),
      prevEpochKickout: z.array(ValidatorKickoutViewSchema),
    }),
  );

export const RpcValidatorsOrderedRequestSchema: z.ZodMiniType<t.RpcValidatorsOrderedRequest> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      blockId: z.optional(z.union([BlockIdSchema, z.null()])),
    }),
  );

export const RuntimeConfigViewSchema: z.ZodMiniType<t.RuntimeConfigView> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      accountCreationConfig: AccountCreationConfigViewSchema,
      congestionControlConfig: CongestionControlConfigViewSchema,
      storageAmountPerByte: z.string(),
      transactionCosts: RuntimeFeesConfigViewSchema,
      wasmConfig: VMConfigViewSchema,
      witnessConfig: WitnessConfigViewSchema,
    }),
  );

export const RuntimeFeesConfigViewSchema: z.ZodMiniType<t.RuntimeFeesConfigView> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      actionCreationConfig: ActionCreationConfigViewSchema,
      actionReceiptCreationConfig: FeeSchema,
      burntGasReward: z.array(z.number()),
      dataReceiptCreationConfig: DataReceiptCreationConfigViewSchema,
      pessimisticGasPriceInflationRatio: z.array(z.number()),
      storageUsageConfig: StorageUsageConfigViewSchema,
    }),
  );

export const ShardIdSchema: z.ZodMiniType<t.ShardId> = /* @__PURE__ */ z.lazy(
  () => z.number(),
);

export const ShardLayoutSchema: z.ZodMiniType<t.ShardLayout> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([
      z.object({
        V0: ShardLayoutV0Schema,
      }),
      z.object({
        V1: ShardLayoutV1Schema,
      }),
      z.object({
        V2: ShardLayoutV2Schema,
      }),
    ]),
  );

export const ShardLayoutV0Schema: z.ZodMiniType<t.ShardLayoutV0> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      numShards: z.number(),
      version: z.number(),
    }),
  );

export const ShardLayoutV1Schema: z.ZodMiniType<t.ShardLayoutV1> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      boundaryAccounts: z.array(AccountIdSchema),
      shardsSplitMap: z.optional(
        z.union([z.array(z.array(ShardIdSchema)), z.null()]),
      ),
      toParentShardMap: z.optional(z.union([z.array(ShardIdSchema), z.null()])),
      version: z.number(),
    }),
  );

export const ShardLayoutV2Schema: z.ZodMiniType<t.ShardLayoutV2> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      boundaryAccounts: z.array(AccountIdSchema),
      idToIndexMap: z.object({}),
      indexToIdMap: z.object({}),
      shardIds: z.array(ShardIdSchema),
      shardsParentMap: z.optional(z.union([z.object({}), z.null()])),
      shardsSplitMap: z.optional(z.union([z.object({}), z.null()])),
      version: z.number(),
    }),
  );

export const ShardUIdSchema: z.ZodMiniType<t.ShardUId> = /* @__PURE__ */ z.lazy(
  () =>
    z.object({
      shardId: z.number(),
      version: z.number(),
    }),
);

export const SignatureSchema: z.ZodMiniType<t.Signature> =
  /* @__PURE__ */ z.lazy(() => z.string());

export const SignedDelegateActionSchema: z.ZodMiniType<t.SignedDelegateAction> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      delegateAction: DelegateActionSchema,
      signature: SignatureSchema,
    }),
  );

export const SignedTransactionSchema: z.ZodMiniType<t.SignedTransaction> =
  /* @__PURE__ */ z.lazy(() => z.string());

export const SignedTransactionViewSchema: z.ZodMiniType<t.SignedTransactionView> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      actions: z.array(ActionViewSchema),
      hash: CryptoHashSchema,
      nonce: z.number(),
      priorityFee: z.number(),
      publicKey: PublicKeySchema,
      receiverId: AccountIdSchema,
      signature: SignatureSchema,
      signerId: AccountIdSchema,
    }),
  );

export const SlashedValidatorSchema: z.ZodMiniType<t.SlashedValidator> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      accountId: AccountIdSchema,
      isDoubleSign: z.boolean(),
    }),
  );

export const StakeActionSchema: z.ZodMiniType<t.StakeAction> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      publicKey: PublicKeySchema,
      stake: z.string(),
    }),
  );

export const StateChangeCauseViewSchema: z.ZodMiniType<t.StateChangeCauseView> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([
      z.object({
        type: z.literal('not_writable_to_disk'),
      }),
      z.object({
        type: z.literal('initial_state'),
      }),
      z.object({
        txHash: CryptoHashSchema,
        type: z.literal('transaction_processing'),
      }),
      z.object({
        receiptHash: CryptoHashSchema,
        type: z.literal('action_receipt_processing_started'),
      }),
      z.object({
        receiptHash: CryptoHashSchema,
        type: z.literal('action_receipt_gas_reward'),
      }),
      z.object({
        receiptHash: CryptoHashSchema,
        type: z.literal('receipt_processing'),
      }),
      z.object({
        receiptHash: CryptoHashSchema,
        type: z.literal('postponed_receipt'),
      }),
      z.object({
        type: z.literal('updated_delayed_receipts'),
      }),
      z.object({
        type: z.literal('validator_accounts_update'),
      }),
      z.object({
        type: z.literal('migration'),
      }),
      z.object({
        type: z.literal('bandwidth_scheduler_state_update'),
      }),
    ]),
  );

export const StateChangeKindViewSchema: z.ZodMiniType<t.StateChangeKindView> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([
      z.object({
        accountId: AccountIdSchema,
        type: z.literal('account_touched'),
      }),
      z.object({
        accountId: AccountIdSchema,
        type: z.literal('access_key_touched'),
      }),
      z.object({
        accountId: AccountIdSchema,
        type: z.literal('data_touched'),
      }),
      z.object({
        accountId: AccountIdSchema,
        type: z.literal('contract_code_touched'),
      }),
    ]),
  );

export const StateChangeWithCauseViewSchema: z.ZodMiniType<t.StateChangeWithCauseView> =
  /* @__PURE__ */ z.lazy(() =>
    z.intersection(
      z.object({
        cause: StateChangeCauseViewSchema,
      }),
      z.union([
        z.object({
          change: z.object({
            accountId: AccountIdSchema,
            amount: z.string(),
            codeHash: CryptoHashSchema,
            globalContractAccountId: z.optional(
              z.union([AccountIdSchema, z.null()]),
            ),
            globalContractHash: z.optional(
              z.union([CryptoHashSchema, z.null()]),
            ),
            locked: z.string(),
            storagePaidAt: z.number(),
            storageUsage: z.number(),
          }),
          type: z.literal('account_update'),
        }),
        z.object({
          change: z.object({
            accountId: AccountIdSchema,
          }),
          type: z.literal('account_deletion'),
        }),
        z.object({
          change: z.object({
            accessKey: AccessKeyViewSchema,
            accountId: AccountIdSchema,
            publicKey: PublicKeySchema,
          }),
          type: z.literal('access_key_update'),
        }),
        z.object({
          change: z.object({
            accountId: AccountIdSchema,
            publicKey: PublicKeySchema,
          }),
          type: z.literal('access_key_deletion'),
        }),
        z.object({
          change: z.object({
            accountId: AccountIdSchema,
            gasKey: GasKeyViewSchema,
            publicKey: PublicKeySchema,
          }),
          type: z.literal('gas_key_update'),
        }),
        z.object({
          change: z.object({
            accountId: AccountIdSchema,
            index: z.number(),
            nonce: z.number(),
            publicKey: PublicKeySchema,
          }),
          type: z.literal('gas_key_nonce_update'),
        }),
        z.object({
          change: z.object({
            accountId: AccountIdSchema,
            publicKey: PublicKeySchema,
          }),
          type: z.literal('gas_key_deletion'),
        }),
        z.object({
          change: z.object({
            accountId: AccountIdSchema,
            keyBase64: StoreKeySchema,
            valueBase64: StoreValueSchema,
          }),
          type: z.literal('data_update'),
        }),
        z.object({
          change: z.object({
            accountId: AccountIdSchema,
            keyBase64: StoreKeySchema,
          }),
          type: z.literal('data_deletion'),
        }),
        z.object({
          change: z.object({
            accountId: AccountIdSchema,
            codeBase64: z.string(),
          }),
          type: z.literal('contract_code_update'),
        }),
        z.object({
          change: z.object({
            accountId: AccountIdSchema,
          }),
          type: z.literal('contract_code_deletion'),
        }),
      ]),
    ),
  );

export const StateItemSchema: z.ZodMiniType<t.StateItem> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      key: StoreKeySchema,
      value: StoreValueSchema,
    }),
  );

export const StateSyncConfigSchema: z.ZodMiniType<t.StateSyncConfig> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      concurrency: z.optional(SyncConcurrencySchema),
      dump: z.optional(z.union([DumpConfigSchema, z.null()])),
      sync: z.optional(SyncConfigSchema),
    }),
  );

export const StatusSyncInfoSchema: z.ZodMiniType<t.StatusSyncInfo> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      earliestBlockHash: z.optional(z.union([CryptoHashSchema, z.null()])),
      earliestBlockHeight: z.optional(z.union([z.number(), z.null()])),
      earliestBlockTime: z.optional(z.union([z.string(), z.null()])),
      epochId: z.optional(z.union([EpochIdSchema, z.null()])),
      epochStartHeight: z.optional(z.union([z.number(), z.null()])),
      latestBlockHash: CryptoHashSchema,
      latestBlockHeight: z.number(),
      latestBlockTime: z.string(),
      latestStateRoot: CryptoHashSchema,
      syncing: z.boolean(),
    }),
  );

export const StorageErrorSchema: z.ZodMiniType<t.StorageError> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([
      z.literal('StorageInternalError'),
      z.object({
        MissingTrieValue: MissingTrieValueSchema,
      }),
      z.literal('UnexpectedTrieValue'),
      z.object({
        StorageInconsistentState: z.string(),
      }),
      z.object({
        FlatStorageBlockNotSupported: z.string(),
      }),
      z.object({
        MemTrieLoadingError: z.string(),
      }),
    ]),
  );

export const StorageGetModeSchema: z.ZodMiniType<t.StorageGetMode> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([z.literal('FlatStorage'), z.literal('Trie')]),
  );

export const StorageUsageConfigViewSchema: z.ZodMiniType<t.StorageUsageConfigView> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      numBytesAccount: z.number(),
      numExtraBytesRecord: z.number(),
    }),
  );

export const StoreKeySchema: z.ZodMiniType<t.StoreKey> = /* @__PURE__ */ z.lazy(
  () => z.string(),
);

export const StoreValueSchema: z.ZodMiniType<t.StoreValue> =
  /* @__PURE__ */ z.lazy(() => z.string());

export const SyncCheckpointSchema: z.ZodMiniType<t.SyncCheckpoint> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([z.literal('genesis'), z.literal('earliest_available')]),
  );

export const SyncConcurrencySchema: z.ZodMiniType<t.SyncConcurrency> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      apply: z.number(),
      applyDuringCatchup: z.number(),
      peerDownloads: z.number(),
      perShard: z.number(),
    }),
  );

export const SyncConfigSchema: z.ZodMiniType<t.SyncConfig> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([
      z.literal('Peers'),
      z.object({
        ExternalStorage: ExternalStorageConfigSchema,
      }),
    ]),
  );

export const Tier1ProxyViewSchema: z.ZodMiniType<t.Tier1ProxyView> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      addr: z.string(),
      peerId: PublicKeySchema,
    }),
  );

export const TrackedShardsConfigSchema: z.ZodMiniType<t.TrackedShardsConfig> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([
      z.literal('NoShards'),
      z.object({
        Shards: z.array(ShardUIdSchema),
      }),
      z.literal('AllShards'),
      z.object({
        ShadowValidator: AccountIdSchema,
      }),
      z.object({
        Schedule: z.array(z.array(ShardIdSchema)),
      }),
      z.object({
        Accounts: z.array(AccountIdSchema),
      }),
    ]),
  );

export const TransferActionSchema: z.ZodMiniType<t.TransferAction> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      deposit: z.string(),
    }),
  );

export const TxExecutionErrorSchema: z.ZodMiniType<t.TxExecutionError> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([
      z.object({
        ActionError: ActionErrorSchema,
      }),
      z.object({
        InvalidTxError: InvalidTxErrorSchema,
      }),
    ]),
  );

export const TxExecutionStatusSchema: z.ZodMiniType<t.TxExecutionStatus> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([
      z.literal('NONE'),
      z.literal('INCLUDED'),
      z.literal('EXECUTED_OPTIMISTIC'),
      z.literal('INCLUDED_FINAL'),
      z.literal('EXECUTED'),
      z.literal('FINAL'),
    ]),
  );

export const UseGlobalContractActionSchema: z.ZodMiniType<t.UseGlobalContractAction> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      contractIdentifier: GlobalContractIdentifierSchema,
    }),
  );

export const VMConfigViewSchema: z.ZodMiniType<t.VMConfigView> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      discardCustomSections: z.boolean(),
      ethImplicitAccounts: z.boolean(),
      extCosts: ExtCostsConfigViewSchema,
      fixContractLoadingCost: z.boolean(),
      globalContractHostFns: z.boolean(),
      growMemCost: z.number(),
      implicitAccountCreation: z.boolean(),
      limitConfig: LimitConfigSchema,
      reftypesBulkMemory: z.boolean(),
      regularOpCost: z.number(),
      saturatingFloatToInt: z.boolean(),
      storageGetMode: StorageGetModeSchema,
      vmKind: VMKindSchema,
    }),
  );

export const VMKindSchema: z.ZodMiniType<t.VMKind> = /* @__PURE__ */ z.lazy(
  () =>
    z.union([
      z.literal('Wasmer0'),
      z.literal('Wasmtime'),
      z.literal('Wasmer2'),
      z.literal('NearVm'),
      z.literal('NearVm2'),
    ]),
);

export const ValidatorInfoSchema: z.ZodMiniType<t.ValidatorInfo> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      accountId: AccountIdSchema,
    }),
  );

export const ValidatorKickoutReasonSchema: z.ZodMiniType<t.ValidatorKickoutReason> =
  /* @__PURE__ */ z.lazy(() =>
    z.union([
      z.literal('_UnusedSlashed'),
      z.object({
        NotEnoughBlocks: z.object({
          expected: z.number(),
          produced: z.number(),
        }),
      }),
      z.object({
        NotEnoughChunks: z.object({
          expected: z.number(),
          produced: z.number(),
        }),
      }),
      z.literal('Unstaked'),
      z.object({
        NotEnoughStake: z.object({
          stakeU128: z.string(),
          thresholdU128: z.string(),
        }),
      }),
      z.literal('DidNotGetASeat'),
      z.object({
        NotEnoughChunkEndorsements: z.object({
          expected: z.number(),
          produced: z.number(),
        }),
      }),
      z.object({
        ProtocolVersionTooOld: z.object({
          networkVersion: z.number(),
          version: z.number(),
        }),
      }),
    ]),
  );

export const ValidatorKickoutViewSchema: z.ZodMiniType<t.ValidatorKickoutView> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      accountId: AccountIdSchema,
      reason: ValidatorKickoutReasonSchema,
    }),
  );

export const ValidatorStakeViewSchema: z.ZodMiniType<t.ValidatorStakeView> =
  /* @__PURE__ */ z.lazy(() =>
    z.intersection(
      z.object({
        validatorStakeStructVersion: z.literal('V1'),
      }),
      ValidatorStakeViewV1Schema,
    ),
  );

export const ValidatorStakeViewV1Schema: z.ZodMiniType<t.ValidatorStakeViewV1> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      accountId: AccountIdSchema,
      publicKey: PublicKeySchema,
      stake: z.string(),
    }),
  );

export const VersionSchema: z.ZodMiniType<t.Version> = /* @__PURE__ */ z.lazy(
  () =>
    z.object({
      build: z.string(),
      commit: z.string(),
      rustcVersion: z.string(),
      version: z.string(),
    }),
);

export const ViewStateResultSchema: z.ZodMiniType<t.ViewStateResult> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      proof: z.optional(z.array(z.string())),
      values: z.array(StateItemSchema),
    }),
  );

export const WasmTrapSchema: z.ZodMiniType<t.WasmTrap> = /* @__PURE__ */ z.lazy(
  () =>
    z.union([
      z.literal('Unreachable'),
      z.literal('IncorrectCallIndirectSignature'),
      z.literal('MemoryOutOfBounds'),
      z.literal('CallIndirectOOB'),
      z.literal('IllegalArithmetic'),
      z.literal('MisalignedAtomicAccess'),
      z.literal('IndirectCallToNull'),
      z.literal('StackOverflow'),
      z.literal('GenericTrap'),
    ]),
);

export const WitnessConfigViewSchema: z.ZodMiniType<t.WitnessConfigView> =
  /* @__PURE__ */ z.lazy(() =>
    z.object({
      combinedTransactionsSizeLimit: z.number(),
      mainStorageProofSizeSoftLimit: z.number(),
      newTransactionsValidationStateSizeSoftLimit: z.number(),
    }),
  );
