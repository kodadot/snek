import type {Result} from './support'

export type AssetType = AssetType_Token | AssetType_PoolShare

export interface AssetType_Token {
  __kind: 'Token'
}

export interface AssetType_PoolShare {
  __kind: 'PoolShare'
  value: [number, number]
}

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
