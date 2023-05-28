/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { isProd } from '../../../environment';
import { Context } from '../../utils/types';
import { AssetMetadata, AssetRegisterEvent } from '../types';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const proc: any = isProd ? require('./basilisk') : require('./snek');

export function getAssetRegisterEvent(ctx: Context): AssetRegisterEvent {
  return proc.getAssetRegisterEvent(ctx);
}
export function getAssetUpdateEvent(ctx: Context): AssetRegisterEvent {
  return proc.getAssetUpdateEvent(ctx);
}
export function getAssetMetadataEvent(ctx: Context): AssetMetadata {
  return proc.getAssetMetadataEvent(ctx);
}
