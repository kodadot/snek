import {
  MarketplaceOfferAcceptedEvent, MarketplaceOfferPlacedEvent, MarketplaceOfferWithdrawnEvent, MarketplaceRoyaltyAddedEvent, MarketplaceRoyaltyPaidEvent, MarketplaceTokenPriceUpdatedEvent, MarketplaceTokenSoldEvent, NftClassCreatedEvent, NftClassDestroyedEvent, NftInstanceBurnedEvent, NftInstanceMintedEvent, NftInstanceTransferredEvent,
} from '../../types/events';
import { addressOf } from './helper';
import {
  BurnTokenEvent, CreateCollectionEvent, CreateTokenEvent, DestroyCollectionEvent, TransferTokenEvent, Context, ListTokenEvent, BuyTokenEvent, AddRoyaltyEvent, PayRoyaltyEvent, BaseOfferEvent, MakeOfferEvent, AcceptOfferEvent,
} from './types';

export function getCreateCollectionEvent(ctx: Context): CreateCollectionEvent {
  const event = new NftClassCreatedEvent(ctx);
  // logger.debug('NftClassCreatedEvent', event.isV39)
  // if (event.isV39) {
  //   const { classId, owner, classType } = event.asV39;
  //   return { id: classId.toString(), caller: addressOf(owner), type: classType.__kind };
  // }
  // if (event.isV50) {
  //   const { classId, owner, metadata, classType } = event.asV50;
  //   return { id: classId.toString(), caller: addressOf(owner), metadata: metadata.toString(), type: classType.__kind  };
  // }

  const {
    classId, owner, metadata, classType,
  } = event.asLatest;
  return {
    id: classId.toString(), caller: addressOf(owner), metadata: metadata.toString(), type: classType.__kind,
  };
}

export function getCreateTokenEvent(ctx: Context): CreateTokenEvent {
  const event = new NftInstanceMintedEvent(ctx);
  // logger.debug('NftInstanceMintedEvent', event.isV39)
  // if (event.isV39) {
  //   const { classId, owner, instanceId } = event.asV39;
  //   return { collectionId: classId.toString(), caller: addressOf(owner), sn: instanceId.toString() };
  // }
  // if (event.isV50) {
  //   const { classId, owner, instanceId, metadata } = event.asV50;
  //   return { collectionId: classId.toString(), caller: addressOf(owner), sn: instanceId.toString(), metadata: metadata.toString() };
  // }

  const {
    classId, owner, instanceId, metadata,
  } = event.asLatest;
  return {
    collectionId: classId.toString(), caller: addressOf(owner), sn: instanceId.toString(), metadata: metadata.toString(),
  };
}

export function getTransferTokenEvent(ctx: Context): TransferTokenEvent {
  const event = new NftInstanceTransferredEvent(ctx);
  const {
    classId, instanceId, from, to,
  } = event.asLatest;
  return {
    collectionId: classId.toString(), caller: addressOf(from), sn: instanceId.toString(), to: addressOf(to),
  };
}

export function getBurnTokenEvent(ctx: Context): BurnTokenEvent {
  const event = new NftInstanceBurnedEvent(ctx);
  const { classId, instanceId, owner } = event.asLatest;
  return { collectionId: classId.toString(), caller: addressOf(owner), sn: instanceId.toString() };
}

export function getDestroyCollectionEvent(ctx: Context): DestroyCollectionEvent {
  const event = new NftClassDestroyedEvent(ctx);
  const { classId, owner } = event.asLatest;
  return { id: classId.toString(), caller: addressOf(owner) };
}

export function getListTokenEvent(ctx: Context): ListTokenEvent {
  const event = new MarketplaceTokenPriceUpdatedEvent(ctx);
  const [owner, classId, instanceId, price] = event.asLatest;
  return {
    collectionId: classId.toString(), caller: addressOf(owner), sn: instanceId.toString(), price,
  };
}

export function getBuyTokenEvent(ctx: Context): BuyTokenEvent {
  const event = new MarketplaceTokenSoldEvent(ctx);
  const [from, to, classId, instanceId, price] = event.asLatest;
  return {
    collectionId: classId.toString(), caller: addressOf(to), sn: instanceId.toString(), price: BigInt(price ?? 0), currentOwner: addressOf(from),
  };
}

export function getAddRoyaltyEvent(ctx: Context): AddRoyaltyEvent {
  const event = new MarketplaceRoyaltyAddedEvent(ctx);
  const [classId, instanceId, recipient, royalty] = event.asLatest;
  return {
    collectionId: classId.toString(), sn: instanceId.toString(), recipient: addressOf(recipient), royalty,
  };
}

export function getPayRoyaltyEvent(ctx: Context): PayRoyaltyEvent {
  const event = new MarketplaceRoyaltyPaidEvent(ctx);
  const [classId, instanceId, recipient, royalty, amount] = event.asLatest;
  return {
    collectionId: classId.toString(), sn: instanceId.toString(), recipient: addressOf(recipient), royalty, amount,
  };
}

export function getPlaceOfferEvent(ctx: Context): MakeOfferEvent {
  const event = new MarketplaceOfferPlacedEvent(ctx);
  // if (event.isV39) {
  //   const [caller, classId, instanceId, amount] = event.asV39;
  //   return { collectionId: classId.toString(), sn: instanceId.toString(), caller: addressOf(caller), amount, expiresAt: BigInt(0), };
  // }

  const [caller, classId, instanceId, amount, blockNumber] = event.asLatest;
  return {
    collectionId: classId.toString(), sn: instanceId.toString(), caller: addressOf(caller), amount, expiresAt: BigInt(blockNumber),
  };
}

export function getWithdrawOfferEvent(ctx: Context): BaseOfferEvent {
  const event = new MarketplaceOfferWithdrawnEvent(ctx);
  const [caller, classId, instanceId] = event.asLatest;
  return { collectionId: classId.toString(), sn: instanceId.toString(), caller: addressOf(caller) };
}

export function getAcceptOfferEvent(ctx: Context): AcceptOfferEvent {
  const event = new MarketplaceOfferAcceptedEvent(ctx);
  // if (event.isV39) {
  //   const [caller, classId, instanceId, amount] = event.asV39;
  //   return { collectionId: classId.toString(), sn: instanceId.toString(), caller: addressOf(caller), amount, maker: '' };
  // }

  const [caller, classId, instanceId, amount, maker] = event.asLatest;
  return {
    collectionId: classId.toString(), sn: instanceId.toString(), caller: addressOf(caller), amount, maker: addressOf(maker),
  };
}
