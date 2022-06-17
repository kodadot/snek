import type {Result} from './support'

export type AccountId32 = Uint8Array

export type ClassType = ClassType_Marketplace | ClassType_LiquidityMining | ClassType_Redeemable | ClassType_Auction | ClassType_HydraHeads

export interface ClassType_Marketplace {
  __kind: 'Marketplace'
}

export interface ClassType_LiquidityMining {
  __kind: 'LiquidityMining'
}

export interface ClassType_Redeemable {
  __kind: 'Redeemable'
}

export interface ClassType_Auction {
  __kind: 'Auction'
}

export interface ClassType_HydraHeads {
  __kind: 'HydraHeads'
}
