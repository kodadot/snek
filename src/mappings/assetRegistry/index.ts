import { BlockHandlerContext } from '@subsquid/substrate-processor';
import { AssetEntity } from '../../model';
import { create, get } from '../utils/entity';
import { unwrap } from '../utils/extract';
import logger from '../utils/logger';
import { Context, Store } from '../utils/types';
import { getAssetMetadataEvent, getAssetRegisterEvent, getAssetUpdateEvent } from './getters';

export async function forceCreateBasiliskAsset(context: BlockHandlerContext<Store>): Promise<void> {
  logger.pending(`[REGISTER BASILISK]: ${context.block.height}`);
  const asset = create<AssetEntity>(AssetEntity, '0', {
    name: 'BSX',
    symbol: 'BSX',
    decimals: 12,
  });
  logger.success(`[ASSET REGISTER]: by ${asset.id} is ${asset.name || ''}`);
  await context.store.save<AssetEntity>(asset);
}

export async function handleAssetRegister(context: Context): Promise<void> {
  logger.pending(`[ASSET REGISTER]: ${context.block.height}`);
  const event = unwrap(context, getAssetRegisterEvent);
  const asset = create<AssetEntity>(AssetEntity, event.id, {});

  if (!event.isToken) {
    logger.warn(`[ASSET NOT TOKEN]: ${event.id}`);
    return;
  }

  asset.name = event.name;
  logger.success(`[ASSET REGISTER]: by ${event.id} is ${event.name}`);
  await context.store.save<AssetEntity>(asset);
}

export async function handleAssetUpdate(context: Context): Promise<void> {
  logger.pending(`[ASSET UPDATE]: ${context.block.height}`);
  const event = unwrap(context, getAssetUpdateEvent);
  const asset = await get<AssetEntity>(context.store, AssetEntity, event.id);
  if (!asset) {
    logger.warn(`[ASSET UPDATE]: ${event.id} not found`);
    return;
  }

  if (!event.isToken) {
    logger.warn(`[ASSET NOT TOKEN]: ${event.id}`);
    return;
  }

  asset.name = event.name;
  logger.success(`[ASSET UPDATE]: by ${event.id} is ${event.name}`);
  await context.store.save<AssetEntity>(asset);
}

export async function handleAssetMetadata(context: Context): Promise<void> {
  logger.pending(`[ASSET METADATA]: ${context.block.height}`);
  const event = unwrap(context, getAssetMetadataEvent);
  const asset = await get<AssetEntity>(context.store, AssetEntity, event.id);
  if (!asset) {
    logger.warn(`[ASSET METADATA]: ${event.id} not found`);
    return;
  }

  asset.symbol = event.symbol;
  asset.decimals = event.decimals;
  logger.success(`[ASSET METADATA]: by ${event.id} is ${event.symbol}`);
  await context.store.save<AssetEntity>(asset);
}
