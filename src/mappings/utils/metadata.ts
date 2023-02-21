import { TokenMetadata } from '@kodadot1/metasquid/types';
import { $obtain } from '@kodadot1/minipfs';
import { MetadataEntity } from '../../model';
import { EntityWithId } from './entity';
import logger from './logger';
import { attributeFrom, ensure } from './types';
import { CollectionType } from '../../model/generated/_collectionType';

export const fetchMetadata = async <T>(metadata: string): Promise<T> => {
  try {
    if (!metadata) {
      return ensure<T>({});
    }
    return await $obtain<T>(metadata, ['kodadot', 'nftstorage']);
  } catch (e) {
    logger.warn('IPFS Err', e);
  }

  return ensure<T>({});
};

export const fetchAllMetadata = async <T extends TokenMetadata>(
  metadata: string[],
): Promise<(Partial<MetadataEntity> & EntityWithId)[]> => {
  const res = await Promise.allSettled(
    metadata.map((meta) => fetchMetadata<T>(meta)),
  );
  const fulfilled = res
    .map((result, index) => ({ ...result, id: metadata[index] }))
    .filter((r) => r.status === 'fulfilled') as (PromiseFulfilledResult<T> &
  EntityWithId)[];
  return fulfilled.map(({ value, id }) => makeCompatibleMetadata(id, value));
};

export const makeCompatibleMetadata = (id: string, metadata: TokenMetadata): Partial<MetadataEntity> & EntityWithId => ({
  id,
  description: metadata.description || '',
  image: metadata.image || metadata.thumbnailUri || metadata.mediaUri,
  animationUrl: metadata.animation_url || metadata.mediaUri,
  attributes: metadata.attributes?.map(attributeFrom) || [],
  name: metadata.name,
  type: metadata.type || '',
});

export const ensureMetadataUri = (metadata: string | undefined, collectionType: CollectionType): string => {
  if (metadata) {
    return metadata;
  }

  switch (collectionType) {
    case CollectionType.LiquidityMining:
    case CollectionType.Redeemable:
    case CollectionType.Auction:
    case CollectionType.HydraHeads:
      return 'ipfs://ipfs/bafkreig447xngd2gnk24xvh6ycaivqeeegbjhgwuqcaoknlq5zq7oedf4a';
    default:
      return 'ipfs://ipfs/bafkreignxq5tnh2myt3gfa3neisd3uw36ap5kkcf5afxlrbuv45dzhs5ke';
  }
};
