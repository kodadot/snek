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
  if (event.isV42) {
    const {
      classId, owner, metadata, classType,
    } = event.asV42;
    return {
      id: classId.toString(), caller: addressOf(owner), metadata: metadata.toString(), type: classType.__kind,
    };
  }

  if (event.isV62) {
    const {
      classId, owner, classType,
    } = event.asV62;
    return {
      id: classId.toString(), caller: addressOf(owner), metadata: undefined, type: classType.__kind,
    };
  }

  const {
    classId, owner, metadata, classType,
  } = event.asV71;
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
  } = event.asV71;
  return {
    collectionId: classId.toString(), caller: addressOf(owner), sn: instanceId.toString(), metadata: metadata.toString(),
  };
}

export function getTransferTokenEvent(ctx: Context): TransferTokenEvent {
  const event = new NftInstanceTransferredEvent(ctx);
  const {
    classId, instanceId, from, to,
  } = event.asV42;
  return {
    collectionId: classId.toString(), caller: addressOf(from), sn: instanceId.toString(), to: addressOf(to),
  };
}

export function getBurnTokenEvent(ctx: Context): BurnTokenEvent {
  const event = new NftInstanceBurnedEvent(ctx);
  const { classId, instanceId, owner } = event.asV42;
  return { collectionId: classId.toString(), caller: addressOf(owner), sn: instanceId.toString() };
}

export function getDestroyCollectionEvent(ctx: Context): DestroyCollectionEvent {
  const event = new NftClassDestroyedEvent(ctx);
  const { classId, owner } = event.asV42;
  return { id: classId.toString(), caller: addressOf(owner) };
}

export function getListTokenEvent(ctx: Context): ListTokenEvent {
  const event = new MarketplaceTokenPriceUpdatedEvent(ctx);
  const {
    who: owner, class: classId, instance: instanceId, price,
  } = event.asV55;
  return {
    collectionId: classId.toString(), caller: addressOf(owner), sn: instanceId.toString(), price,
  };
}

export function getBuyTokenEvent(ctx: Context): BuyTokenEvent {
  const event = new MarketplaceTokenSoldEvent(ctx);
  const {
    owner: from, buyer: to, class: classId, instance: instanceId, price,
  } = event.asV55;
  return {
    collectionId: classId.toString(), caller: addressOf(to), sn: instanceId.toString(), price: BigInt(price ?? 0), currentOwner: addressOf(from),
  };
}

export function getAddRoyaltyEvent(ctx: Context): AddRoyaltyEvent {
  const event = new MarketplaceRoyaltyAddedEvent(ctx);
  const {
    class: classId, instance: instanceId, author: recipient, royalty,
  } = event.asV55;
  return {
    collectionId: classId.toString(), sn: instanceId.toString(), recipient: addressOf(recipient), royalty,
  };
}

export function getPayRoyaltyEvent(ctx: Context): PayRoyaltyEvent {
  const event = new MarketplaceRoyaltyPaidEvent(ctx);
  const {
    class: classId, instance: instanceId, author: recipient, royalty, royaltyAmount: amount,
  } = event.asV55;
  return {
    collectionId: classId.toString(), sn: instanceId.toString(), recipient: addressOf(recipient), royalty, amount,
  };
}

export function getPlaceOfferEvent(ctx: Context): MakeOfferEvent {
  const event = new MarketplaceOfferPlacedEvent(ctx);
  // if (event.isV39) {
  //   const [caller, class: classId, instance: instanceId,, amount] = event.asV39;
  //   return { collectionId: classId.toString(), sn: instanceId.toString(), caller: addressOf(caller), amount, expiresAt: BigInt(0), };
  // }

  const {
    who: caller, class: classId, instance: instanceId, amount, expires: blockNumber,
  } = event.asV55;
  return {
    collectionId: classId.toString(), sn: instanceId.toString(), caller: addressOf(caller), amount, expiresAt: BigInt(blockNumber),
  };
}

export function getWithdrawOfferEvent(ctx: Context): BaseOfferEvent {
  const event = new MarketplaceOfferWithdrawnEvent(ctx);
  const { who: caller, class: classId, instance: instanceId } = event.asV55;
  return { collectionId: classId.toString(), sn: instanceId.toString(), caller: addressOf(caller) };
}

export function getAcceptOfferEvent(ctx: Context): AcceptOfferEvent {
  const event = new MarketplaceOfferAcceptedEvent(ctx);
  // if (event.isV39) {
  //   const [caller, class: classId, instance: instanceId,, amount] = event.asV39;
  //   return { collectionId: classId.toString(), sn: instanceId.toString(), caller: addressOf(caller), amount, maker: '' };
  // }

  const {
    who: caller, class: classId, instance: instanceId, amount, maker,
  } = event.asV62;
  return {
    collectionId: classId.toString(), sn: instanceId.toString(), caller: addressOf(caller), amount, maker: addressOf(maker),
  };
}
