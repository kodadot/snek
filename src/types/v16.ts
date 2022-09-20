import type {Result} from './support'

export type AssetType = AssetType_Token | AssetType_PoolShare

export interface AssetType_Token {
  __kind: 'Token'
  value: null
}

export interface AssetType_PoolShare {
  __kind: 'PoolShare'
  value: [number, number]
}
