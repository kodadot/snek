import { CollectionEntity, NFTEntity } from '../../model/generated'
// import { decodeAddress } from '@polkadot/util-crypto'
type Entity = CollectionEntity | NFTEntity

export function exists<T>(entity: T | undefined): boolean {
  return !!entity
}

export function isBurned({ burned }: Entity): boolean {
  return burned
}

export function entityOf(entity: Entity): string {
  if (entity instanceof CollectionEntity) {
    return 'Collection'
  }

  if (entity instanceof NFTEntity) {
    return 'NFT'
  }

  return ''
}

export function existButBurned(entity: Entity): boolean {
  return exists(entity) && isBurned(entity)
}

export function canOrElseError<T extends Entity>(callback: (arg: T) => boolean, entity: T, negation?: boolean) {
  const entityName = entityOf(entity)
  if (negation ? !callback(entity) : callback(entity)) {
    throw new ReferenceError(`[PROBLEM] Entity ${entityName} ${negation ? ' not' : ''} ${callback.name}`)
  }
}
