import type {Result, Option} from './support'

export type CollectionType = CollectionType_Marketplace | CollectionType_LiquidityMining

export interface CollectionType_Marketplace {
    __kind: 'Marketplace'
}

export interface CollectionType_LiquidityMining {
    __kind: 'LiquidityMining'
}
