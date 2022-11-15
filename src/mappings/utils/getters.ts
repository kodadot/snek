import {
  MarketplaceOfferAcceptedEvent, MarketplaceOfferPlacedEvent, MarketplaceOfferWithdrawnEvent, MarketplaceRoyaltyAddedEvent, MarketplaceRoyaltyPaidEvent, MarketplaceTokenPriceUpdatedEvent, MarketplaceTokenSoldEvent, NftClassCreatedEvent, NftClassDestroyedEvent, NftInstanceBurnedEvent, NftInstanceMintedEvent, NftInstanceTransferredEvent,
} from '../../types/events';
import { addressOf, toPercent } from './helper';
import {
  BurnTokenEvent, CreateCollectionEvent, CreateTokenEvent, DestroyCollectionEvent, TransferTokenEvent, Context, ListTokenEvent, BuyTokenEvent, AddRoyaltyEvent, PayRoyaltyEvent, BaseOfferEvent, MakeOfferEvent, AcceptOfferEvent,
} from './types';

export function getCreateCollectionEvent(ctx: Context): CreateCollectionEvent {
  const event = new NftClassCreatedEvent(ctx);
  // logger.debug('NftClassCreatedEvent', event.isV39)
  if (event.isV38) {
    const {
      classId, owner, classType,
    } = event.asV38;
    return {
      id: classId.toString(), caller: addressOf(owner), metadata: undefined, type: classType.__kind,
    };
  }

  if (event.isV43) {
    const {
      classId, owner, metadata, classType,
    } = event.asV43;
    return {
      id: classId.toString(), caller: addressOf(owner), metadata: metadata.toString(), type: classType.__kind,
    };
  }

  if (event.isV65) {
    const {
      classId, owner, classType,
    } = event.asV65;

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
  } = event.asV38;
  return {
    collectionId: classId.toString(), caller: addressOf(from), sn: instanceId.toString(), to: addressOf(to),
  };
}

export function getBurnTokenEvent(ctx: Context): BurnTokenEvent {
  const event = new NftInstanceBurnedEvent(ctx);
  const { classId, instanceId, owner } = event.asV38;
  return { collectionId: classId.toString(), caller: addressOf(owner), sn: instanceId.toString() };
}

export function getDestroyCollectionEvent(ctx: Context): DestroyCollectionEvent {
  const event = new NftClassDestroyedEvent(ctx);
  const { classId, owner } = event.asV38;
  return { id: classId.toString(), caller: addressOf(owner) };
}

export function getListTokenEvent(ctx: Context): ListTokenEvent {
  const event = new MarketplaceTokenPriceUpdatedEvent(ctx);
  if (event.isV55) {
    const {
      who: owner, class: classId, instance: instanceId, price,
    } = event.asV55;
    return {
      collectionId: classId.toString(), caller: addressOf(owner), sn: instanceId.toString(), price,
    };
  }

  const {
    who: owner, collection: classId, item: instanceId, price,
  } = event.asV81;
  return {
    collectionId: classId.toString(), caller: addressOf(owner), sn: instanceId.toString(), price,
  };
}

export function getBuyTokenEvent(ctx: Context): BuyTokenEvent {
  const event = new MarketplaceTokenSoldEvent(ctx);

  if (event.isV43) {
    const [
      from, to, classId, instanceId, price,
    ] = event.asV43;
    return {
      collectionId: classId.toString(), caller: addressOf(to), sn: instanceId.toString(), price: BigInt(price ?? 0), currentOwner: addressOf(from),
    };
  }

  if (event.isV55) {
    const {
      owner: from, buyer: to, class: classId, instance: instanceId, price,
    } = event.asV55;
    return {
      collectionId: classId.toString(), caller: addressOf(to), sn: instanceId.toString(), price: BigInt(price ?? 0), currentOwner: addressOf(from),
    };
  }
  const {
    owner: from, buyer: to, collection: classId, item: instanceId, price,
  } = event.asV81;
  return {
    collectionId: classId.toString(), caller: addressOf(to), sn: instanceId.toString(), price: BigInt(price ?? 0), currentOwner: addressOf(from),
  };
}

export function getAddRoyaltyEvent(ctx: Context): AddRoyaltyEvent {
  const event = new MarketplaceRoyaltyAddedEvent(ctx);

  if (event.isV55 || event.isV76) {
    const {
      class: classId, instance: instanceId, author: recipient, royalty,
    } = event.isV55 ? event.asV55 : event.asV76;
    return {
      collectionId: classId.toString(), sn: instanceId.toString(), recipient: addressOf(recipient), royalty: event.isV55 ? royalty : toPercent(royalty),
    };
  }

  const {
    collection: classId, item: instanceId, author: recipient, royalty,
  } = event.asV81;
  return {
    collectionId: classId.toString(), sn: instanceId.toString(), recipient: addressOf(recipient), royalty: event.isV55 ? royalty : toPercent(royalty),
  };
}

export function getPayRoyaltyEvent(ctx: Context): PayRoyaltyEvent {
  const event = new MarketplaceRoyaltyPaidEvent(ctx);
  if (event.isV55 || event.isV76) {
    const {
      class: classId, instance: instanceId, author: recipient, royalty, royaltyAmount: amount,
    } = event.isV55 ? event.asV55 : event.asV76;
    return {
      collectionId: classId.toString(), sn: instanceId.toString(), recipient: addressOf(recipient), royalty: event.isV55 ? royalty : toPercent(royalty), amount,
    };
  }

  const {
    collection: classId, item: instanceId, author: recipient, royalty, royaltyAmount: amount,
  } = event.asV81;
  return {
    collectionId: classId.toString(), sn: instanceId.toString(), recipient: addressOf(recipient), royalty: event.isV55 ? royalty : toPercent(royalty), amount,
  };
}

export function getPlaceOfferEvent(ctx: Context): MakeOfferEvent {
  const event = new MarketplaceOfferPlacedEvent(ctx);
  // if (event.isV39) {
  //   const [caller, class: classId, instance: instanceId,, amount] = event.asV39;
  //   return { collectionId: classId.toString(), sn: instanceId.toString(), caller: addressOf(caller), amount, expiresAt: BigInt(0), };
  // }

  if (event.isV55) {
    const {
      who: caller, class: classId, instance: instanceId, amount, expires: blockNumber,
    } = event.asV55;
    return {
      collectionId: classId.toString(), sn: instanceId.toString(), caller: addressOf(caller), amount, expiresAt: BigInt(blockNumber),
    };
  }

  const {
    who: caller, collection: classId, item: instanceId, amount, expires: blockNumber,
  } = event.asV81;
  return {
    collectionId: classId.toString(), sn: instanceId.toString(), caller: addressOf(caller), amount, expiresAt: BigInt(blockNumber),
  };
}

export function getWithdrawOfferEvent(ctx: Context): BaseOfferEvent {
  const event = new MarketplaceOfferWithdrawnEvent(ctx);
  if (event.isV55) {
    const { who: caller, class: classId, instance: instanceId } = event.asV55;
    return { collectionId: classId.toString(), sn: instanceId.toString(), caller: addressOf(caller) };
  }

  const { who: caller, collection: classId, item: instanceId } = event.asV81;
  return { collectionId: classId.toString(), sn: instanceId.toString(), caller: addressOf(caller) };
}

export function getAcceptOfferEvent(ctx: Context): AcceptOfferEvent {
  const event = new MarketplaceOfferAcceptedEvent(ctx);
  // if (event.isV39) {
  //   const [caller, class: classId, instance: instanceId,, amount] = event.asV39;
  //   return { collectionId: classId.toString(), sn: instanceId.toString(), caller: addressOf(caller), amount, maker: '' };
  // }
  if (event.isV55) {
    const {
      who: caller, class: classId, instance: instanceId, amount, maker,
    } = event.asV65;
    return {
      collectionId: classId.toString(), sn: instanceId.toString(), caller: addressOf(caller), amount, maker: addressOf(maker),
    };
  }

  const {
    who: caller, collection: classId, item: instanceId, amount, maker,
  } = event.asV81;
  return {
    collectionId: classId.toString(), sn: instanceId.toString(), caller: addressOf(caller), amount, maker: addressOf(maker),
  };
}
