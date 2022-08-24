import { AssetRegistryMetadataSetEvent, AssetRegistryRegisteredEvent, AssetRegistryUpdatedEvent } from '../../types/events';
import { Context } from '../utils/types';
import { AssetMetadata, AssetRegisterEvent } from './types';

export function getAssetRegisterEvent(ctx: Context): AssetRegisterEvent {
  const event = new AssetRegistryRegisteredEvent(ctx);
  if (event.isV48) {
    const [id, name, type] = event.asV48;
    return {
      id: id.toString(), name: name.toString(), type: type.__kind, isToken: type.__kind === 'Token',
    };
  }

  const { assetId: id, assetName: name, assetType: type } = event.asLatest;
  return {
    id: id.toString(), name: name.toString(), type: type.__kind, isToken: type.__kind === 'Token',
  };
}

export function getAssetUpdateEvent(ctx: Context): AssetRegisterEvent {
  const event = new AssetRegistryUpdatedEvent(ctx);
  if (event.isV48) {
    const [id, name, type] = event.asV48;
    return {
      id: id.toString(), name: name.toString(), type: type.__kind, isToken: type.__kind === 'Token',
    };
  }

  const { assetId: id, assetName: name, assetType: type } = event.asLatest;
  return {
    id: id.toString(), name: name.toString(), type: type.__kind, isToken: type.__kind === 'Token',
  };
}

export function getAssetMetadataEvent(ctx: Context): AssetMetadata {
  const event = new AssetRegistryMetadataSetEvent(ctx);
  if (event.isV48) {
    const [id, symbol, decimals] = event.asV48;
    return {
      id: id.toString(), symbol: symbol.toString(), decimals,
    };
  }

  const { assetId: id, symbol, decimals } = event.asLatest;
  return {
    id: id.toString(), symbol: symbol.toString(), decimals,
  };
}
