import { MarketplaceTokenPriceUpdatedEvent, MarketplaceTokenSoldEvent, NftClassCreatedEvent, NftClassDestroyedEvent, NftInstanceBurnedEvent, NftInstanceMintedEvent, NftInstanceTransferredEvent } from '../../types/events'
import { addressOf } from './helper'
import { BurnTokenEvent, CreateCollectionEvent, CreateTokenEvent, DestroyCollectionEvent, TransferTokenEvent, Context, ListTokenEvent, BuyTokenEvent } from './types'


export function getCreateCollectionEvent(ctx: Context): CreateCollectionEvent {
  const event = new NftClassCreatedEvent(ctx);
  if (event.isV39) {
    const { classId, owner, classType } = event.asV39;
    return { id: classId.toString(), caller: addressOf(owner), type: classType.__kind };
  }
  if (event.isV50) {
    const { classId, owner, metadata, classType } = event.asV50;
    return { id: classId.toString(), caller: addressOf(owner), metadata: metadata.toString(), type: classType.__kind  };
  }

  const { classId, owner, metadata, classType } = event.asLatest;
  return { id: classId.toString(), caller: addressOf(owner), metadata: metadata.toString(), type: classType.__kind  };
}

export function getCreateTokenEvent(ctx: Context): CreateTokenEvent {
  const event = new NftInstanceMintedEvent(ctx);
  if (event.isV39) {
    const { classId, owner, instanceId } = event.asV39;
    return { collectionId: classId.toString(), caller: addressOf(owner), sn: instanceId.toString() };
  }
  if (event.isV50) {
    const { classId, owner, instanceId, metadata } = event.asV50;
    return { collectionId: classId.toString(), caller: addressOf(owner), sn: instanceId.toString(), metadata: metadata.toString() };
  }

  const { classId, owner, instanceId, metadata } = event.asLatest;
  return { collectionId: classId.toString(), caller: addressOf(owner), sn: instanceId.toString(), metadata: metadata.toString() };
}

export function getTransferTokenEvent(ctx: Context): TransferTokenEvent {
  const event = new NftInstanceTransferredEvent(ctx);
  const { classId, instanceId, from, to } = event.asLatest;
  return { collectionId: classId.toString(), caller: addressOf(from), sn: instanceId.toString(), to: addressOf(to) };
}

export function getBurnTokenEvent(ctx: Context): BurnTokenEvent {
  const event = new NftInstanceBurnedEvent(ctx);
  const { classId, instanceId, owner } = event.asLatest;
  return { collectionId: classId.toString(), caller: addressOf(owner), sn: instanceId.toString()};
}

export function getDestroyCollectionEvent(ctx: Context): DestroyCollectionEvent {
  const event = new NftClassDestroyedEvent(ctx);
  const { classId, owner } = event.asLatest;
    return { id: classId.toString(), caller: addressOf(owner) };
}

export function getListTokenEvent(ctx: Context): ListTokenEvent {
  const event = new MarketplaceTokenPriceUpdatedEvent(ctx);
  const [owner, classId, instanceId, price ] = event.asLatest;
  return { collectionId: classId.toString(), caller: addressOf(owner), sn: instanceId.toString(), price: BigInt(price ?? 0) };
}

export function getBuyTokenEvent(ctx: Context): BuyTokenEvent {
  const event = new MarketplaceTokenSoldEvent(ctx);
  const [from, to, classId, instanceId, price ] = event.asLatest;
  return { collectionId: classId.toString(), caller: addressOf(to), sn: instanceId.toString(), price: BigInt(price ?? 0), currentOwner: addressOf(from) };
}
