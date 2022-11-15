import type {Result, Option} from './support'

export type CollectionType = CollectionType_Marketplace | CollectionType_LiquidityMining | CollectionType_Redeemable | CollectionType_Auction | CollectionType_HydraHeads

export interface CollectionType_Marketplace {
  __kind: 'Marketplace'
}

export interface CollectionType_LiquidityMining {
  __kind: 'LiquidityMining'
}

export interface CollectionType_Redeemable {
  __kind: 'Redeemable'
}

export interface CollectionType_Auction {
  __kind: 'Auction'
}

export interface CollectionType_HydraHeads {
  __kind: 'HydraHeads'
}
