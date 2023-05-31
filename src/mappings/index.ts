import md5 from 'md5';
import {
  CollectionEntity as CE,
  CollectionEvent,
  Event,
  MetadataEntity as Metadata,
  NFTEntity as NE,
  Offer,
  OfferEvent,
  OfferInteraction,
  OfferStatus,
} from '../model';
import { CollectionType } from '../model/generated/_collectionType';
import { Extrinsic } from '../processable';
import { plsBe, real, remintable } from './utils/consolidator';
import {
  calculateCollectionOwnerCountAndDistribution, create, get, getOrCreate,
} from './utils/entity';
import { unwrap } from './utils/extract';
import {
  getAcceptOfferEvent,
  getAddRoyaltyEvent,
  getBurnTokenEvent,
  getBuyTokenEvent,
  getCreateCollectionEvent,
  getCreateTokenEvent,
  getDestroyCollectionEvent,
  getListTokenEvent,
  getPayRoyaltyEvent,
  getPlaceOfferEvent,
  getTransferTokenEvent,
  getWithdrawOfferEvent,
} from './utils/getters';
import { isEmpty } from './utils/helper';
import logger, { logError } from './utils/logger';
import { ensureMetadataUri, fetchMetadata, isLewd } from './utils/metadata';
import {
  attributeFrom,
  BaseCall,
  collectionEventFrom,
  CollectionInteraction,
  Context,
  createOfferId, createTokenId, ensure,
  eventFrom,
  eventId,
  Interaction, Optional, tokenIdOf, TokenMetadata,
  Store,
} from './utils/types';
import { updateCache } from './utils/cache';

async function handleMetadata(
  id: string,
  store: Store,
): Promise<Optional<Metadata>> {
  const meta = await get<Metadata>(store, Metadata, id);
  if (meta) {
    return meta;
  }

  const metadata = await fetchMetadata<TokenMetadata>(id);
  if (isEmpty(metadata)) {
    return null;
  }

  const partial: Partial<Metadata> = {
    id,
    description: metadata.description || '',
    image: metadata.image,
    animationUrl: metadata.animation_url,
    attributes: metadata.attributes?.map(attributeFrom) || [],
    name: metadata.name || '',
  };

  const final = create<Metadata>(Metadata, id, partial);
  await store.save(final);
  return final;
}

export async function handleCollectionCreate(context: Context): Promise<void> {
  logger.pending(`[COLECTTION++]: ${context.block.height}`);
  const event = unwrap(context, getCreateCollectionEvent);
  logger.debug(`collection: ${JSON.stringify(event, null, 2)}`);
  const final = await getOrCreate<CE>(context.store, CE, event.id, {});
  plsBe(remintable, final);

  const type = event.type as CollectionType;

  final.id = event.id;
  final.issuer = event.caller;
  final.blockNumber = BigInt(event.blockNumber);
  final.burned = false;
  final.currentOwner = event.caller;
  final.distribution = 0;
  final.floor = BigInt(0);
  final.highestSale = BigInt(0);
  final.lewd = false;
  final.metadata = ensureMetadataUri(event.metadata, type);
  final.createdAt = event.timestamp;
  final.updatedAt = event.timestamp;
  final.nftCount = 0;
  final.supply = 0;
  final.type = type;
  final.volume = BigInt(0);

  logger.debug(`metadata: ${final.metadata}`);

  if (final.metadata) {
    const metadata = await handleMetadata(final.metadata, context.store);
    final.meta = metadata;
    final.name = metadata?.name;
    final.image = metadata?.image;
    final.media = metadata?.animationUrl;
    final.lewd = metadata ? isLewd(metadata) : false;
  }

  logger.success(`[COLLECTION] ${final.id}`);
  await context.store.save(final);
  await createCollectionEvent(final, Interaction.MINT, event, '', context.store);
}

export async function handleCollectionDestroy(context: Context): Promise<void> {
  logger.pending(`[DESTROY]: ${context.block.height}`);
  const event = unwrap(context, getDestroyCollectionEvent);
  const entity = ensure<CE>(await get(context.store, CE, event.id));
  plsBe(real, entity);

  entity.burned = true;
  logger.success(
    `[DESTROY] ${event.id} by ${event.caller}`,
  );
  const meta = entity.metadata ?? '';
  await context.store.save(entity);
  await createCollectionEvent(entity, Interaction.DESTROY, event, meta, context.store);
}

export async function handleTokenCreate(context: Context): Promise<void> {
  logger.pending(`[NFT++]: ${context.block.height}`);
  const event = unwrap(context, getCreateTokenEvent);
  logger.debug(`nft: ${JSON.stringify(event, null, 2)}`);
  const id = createTokenId(event.collectionId, event.sn);
  const collection = ensure<CE>(
    await get<CE>(context.store, CE, event.collectionId),
  );
  const final = await getOrCreate<NE>(context.store, NE, id, {});
  plsBe(real, collection);
  plsBe(remintable, final);

  final.id = id;
  final.hash = md5(id);
  final.issuer = event.caller;
  final.lewd = false;
  final.currentOwner = event.caller;
  final.blockNumber = BigInt(event.blockNumber);
  final.collection = collection;
  final.sn = event.sn;
  final.metadata = ensureMetadataUri(event.metadata, collection.type);
  final.price = BigInt(0);
  final.burned = false;
  final.createdAt = event.timestamp;
  final.updatedAt = event.timestamp;

  collection.updatedAt = event.timestamp;
  collection.nftCount += 1;
  collection.supply += 1;
  logger.debug(`metadata: ${final.metadata}`);

  if (final.metadata) {
    const metadata = await handleMetadata(final.metadata, context.store);
    final.meta = metadata;
    final.name = metadata?.name;
    final.image = metadata?.image;
    final.media = metadata?.animationUrl;
    if (metadata && isLewd(metadata)) {
      final.lewd = true;
      collection.lewd = true;
    }
  }

  logger.success(`[MINT] ${final.id}`);
  await context.store.save(final);
  await context.store.save(collection);
  await createEvent(final, Interaction.MINTNFT, event, '', context.store);
}

export async function handleTokenTransfer(context: Context): Promise<void> {
  if (context.event.call && [Extrinsic.buy].includes(context.event.call?.name as Extrinsic)) {
    logger.info(`[SEND] SKIP: ${context.block.height}, because of ${context.event.call?.name}`);
    return;
  }

  logger.pending(`[SEND]: ${context.block.height}`);
  const event = unwrap(context, getTransferTokenEvent);
  logger.debug(`send: ${JSON.stringify(event, null, 2)}`);
  const id = createTokenId(event.collectionId, event.sn);
  const entity = ensure<NE>(await get(context.store, NE, id));
  plsBe(real, entity);

  const { currentOwner } = entity;
  entity.currentOwner = event.to;
  entity.updatedAt = event.timestamp;

  const collection = ensure<CE>(
    await get<CE>(context.store, CE, event.collectionId),
  );
  plsBe(real, collection);
  const { ownerCount, distribution } = await calculateCollectionOwnerCountAndDistribution(
    context.store,
    event.collectionId,
    event.to,
    currentOwner,
  );
  collection.ownerCount = ownerCount;
  collection.distribution = distribution;

  logger.success(
    `[SEND] ${id} from ${event.caller} to ${event.to}`,
  );
  await context.store.save(entity);
  await context.store.save(collection);
  await createEvent(entity, Interaction.SEND, event, event.to || '', context.store, currentOwner);
  await updateCache(event.timestamp, context.store);
}

export async function handleTokenBurn(context: Context): Promise<void> {
  logger.pending(`[BURN]: ${context.block.height}`);
  const event = unwrap(context, getBurnTokenEvent);
  logger.debug(`burn: ${JSON.stringify(event, null, 2)}`);
  const id = createTokenId(event.collectionId, event.sn);
  const entity = ensure<NE>(await get(context.store, NE, id));
  plsBe(real, entity);

  entity.burned = true;
  entity.updatedAt = event.timestamp;
  logger.success(`[BURN] ${id} by ${event.caller}`);

  const collection = ensure<CE>(await get<CE>(context.store, CE, event.collectionId));
  plsBe(real, collection);
  collection.updatedAt = event.timestamp;
  collection.supply -= 1;

  const { ownerCount, distribution } = await calculateCollectionOwnerCountAndDistribution(
    context.store,
    event.collectionId,
    undefined,
    entity.currentOwner,
  );
  collection.ownerCount = ownerCount;
  collection.distribution = distribution;

  await context.store.save(entity);
  await context.store.save(collection);
  const meta = entity.metadata ?? '';
  await createEvent(entity, Interaction.CONSUME, event, meta, context.store);
  await updateCache(event.timestamp, context.store);
}

export async function handleTokenList(context: Context): Promise<void> {
  logger.pending(`[LIST]: ${context.block.height}`);
  const event = unwrap(context, getListTokenEvent);
  logger.debug(`list: ${JSON.stringify({ ...event, price: String(event.price) }, null, 2)}`);
  const id = createTokenId(event.collectionId, event.sn);
  const entity = ensure<NE>(await get(context.store, NE, id));
  plsBe(real, entity);

  entity.price = event.price;

  const collection = ensure<CE>(await get<CE>(context.store, CE, event.collectionId));
  plsBe(real, collection);
  if (event.price && (collection.floor === 0n || event.price < collection.floor)) {
    collection.floor = event.price;
  }

  logger.success(`[LIST] ${id} by ${event.caller}} for ${String(event.price)}`);
  await context.store.save(entity);
  await context.store.save(collection);
  const meta = String(event.price || '');
  const interaction = event.price ? Interaction.LIST : Interaction.UNLIST;
  await createEvent(entity, interaction, event, meta, context.store);
}

export async function handleTokenBuy(context: Context): Promise<void> {
  logger.pending(`[BUY]: ${context.block.height}`);
  const event = unwrap(context, getBuyTokenEvent);
  logger.debug(`buy: ${JSON.stringify({ ...event, price: String(event.price) }, null, 2)}`);
  const id = createTokenId(event.collectionId, event.sn);
  const entity = ensure<NE>(await get(context.store, NE, id));
  plsBe(real, entity);
  const { currentOwner } = entity;
  entity.price = BigInt(0);
  entity.currentOwner = event.caller;
  entity.updatedAt = event.timestamp;

  const collection = ensure<CE>(await get<CE>(context.store, CE, event.collectionId));
  plsBe(real, collection);
  collection.volume += event.price || BigInt(0);
  if (event.price && collection.highestSale < event.price) {
    collection.highestSale = event.price;
  }
  collection.updatedAt = event.timestamp;

  const { ownerCount, distribution } = await calculateCollectionOwnerCountAndDistribution(
    context.store,
    event.collectionId,
    event.caller,
    currentOwner,
  );
  collection.ownerCount = ownerCount;
  collection.distribution = distribution;

  logger.success(`[BUY] ${id} by ${event.caller}`);
  await context.store.save(entity);
  await context.store.save(collection);
  const meta = String(event.price || '');
  await createEvent(entity, Interaction.BUY, event, meta, context.store, event.currentOwner);
  await updateCache(event.timestamp, context.store);
}

export async function handleRoyaltyAdd(context: Context): Promise<void> {
  logger.pending(`[ROYALTY]: ${context.block.height}`);
  const event = unwrap(context, getAddRoyaltyEvent);
  logger.debug(`royalty add: ${JSON.stringify(event, null, 2)}`);
  const id = createTokenId(event.collectionId, event.sn);
  const entity = ensure<NE>(await get(context.store, NE, id));
  plsBe(real, entity);

  entity.royalty = event.royalty;
  entity.recipient = event.recipient;

  logger.success(`[ROYALTY] ${id} by ${event.caller}`);
  await context.store.save(entity);
  const meta = String(event.royalty || '');
  await createEvent(entity, Interaction.ROYALTY, event, meta, context.store);
}

export async function handleRoyaltyPay(context: Context): Promise<void> {
  logger.pending(`[PAY ROYALTY]: ${context.block.height}`);
  const event = unwrap(context, getPayRoyaltyEvent);
  logger.debug(`pay: ${JSON.stringify({ ...event, amount: String(event.amount) }, null, 2)}`);
  const id = createTokenId(event.collectionId, event.sn);
  const entity = ensure<NE>(await get(context.store, NE, id));
  plsBe(real, entity);

  const meta = String(event.amount || '');
  await createEvent(entity, Interaction.PAY_ROYALTY, event, meta, context.store, event.recipient);
}

// https://github.com/galacticcouncil/Basilisk-node/issues/424
export async function handleOfferPlace(context: Context): Promise<void> {
  logger.pending(`[PLACE OFFER]: ${context.block.height}`);
  const event = unwrap(context, getPlaceOfferEvent);
  // logger.debug(`offer: ${JSON.stringify({ ...event, price: String(event.amount), expiresAt: String(event.expiresAt)  }, null, 2)}`)
  const id = createTokenId(event.collectionId, event.sn);
  const entity = ensure<NE>(await get(context.store, NE, id));

  // entity doesn't need to exist
  // plsBe(real, entity);

  const offerId = createOfferId(id, event.caller);
  const mayOffer = await get(context.store, Offer, offerId);

  const offer = mayOffer ?? create<Offer>(Offer, offerId, {});
  offer.caller = event.caller;
  offer.price = event.amount;
  offer.blockNumber = BigInt(event.blockNumber);
  offer.expiration = event.expiresAt;
  offer.createdAt = event.timestamp;
  offer.status = OfferStatus.ACTIVE;

  if (!mayOffer && entity) {
    offer.nft = entity;
  }

  logger.success(`[PLACE OFFER] for ${id} by ${event.caller} for ${String(event.amount)}`);
  await context.store.save(offer);

  const meta = String(event.amount || '');
  await createOfferEvent(offer, OfferInteraction.CREATE, event, meta, context.store, entity ? entity.currentOwner : '');
}

export async function handleOfferAccept(context: Context): Promise<void> {
  logger.pending(`[ACCEPT OFFER]: ${context.block.height}`);
  const event = unwrap(context, getAcceptOfferEvent);
  logger.debug(`offer: ${JSON.stringify({ ...event, amount: String(event.amount) }, null, 2)}`);
  const tokenId = tokenIdOf(event);

  if (!event.maker) {
    logger.error(`[ACCEPT OFFER] no maker for ${tokenId}`);
    return;
  }

  const id = createOfferId(tokenId, event.maker);
  const entity = ensure<Offer>(await get(context.store, Offer, id));

  plsBe(real, entity);

  entity.status = OfferStatus.ACCEPTED;
  entity.updatedAt = event.timestamp;

  logger.success(`[ACCEPT OFFER] for ${id} by ${event.caller} for ${String(event.amount)}`);

  const { currentOwner } = ensure<NE>(await get(context.store, NE, tokenId));

  await context.store.save(entity);
  const meta = String(event.amount || '');
  await createOfferEvent(entity, OfferInteraction.ACCEPT, event, meta, context.store, currentOwner);
  await updateCache(event.timestamp, context.store);
}

export async function handleOfferWithdraw(context: Context): Promise<void> {
  logger.pending(`[WITHDRAW OFFER]: ${context.block.height}`);
  const event = unwrap(context, getWithdrawOfferEvent);
  logger.debug(`offer no: ${JSON.stringify(event, null, 2)}`);
  const tokenId = tokenIdOf(event);
  const { currentOwner } = ensure<NE>(await get(context.store, NE, tokenId));

  const offerMaker = currentOwner === event.caller ? event.maker : event.caller;
  const id = createOfferId(tokenId, offerMaker);

  const entity = ensure<Offer>(await get(context.store, Offer, id));
  plsBe(real, entity);

  entity.status = OfferStatus.WITHDRAWN;
  entity.updatedAt = event.timestamp;

  logger.success(`[WITHDRAW OFFER] for ${id} by ${event.caller} for ${String(entity.price)}`);

  await context.store.save(entity);
  const meta = String(entity.price || '');
  await createOfferEvent(entity, OfferInteraction.CANCEL, event, meta, context.store, currentOwner);
  // TODO: Set expired offers to expired
}

// async function markOfferExpired(collectionId: string, sn: string, blockNumber: bigint, store: Store): Promise<void> {
// }

async function createEvent(
  final: NE,
  interaction: Interaction,
  call: BaseCall,
  meta: string,
  store: Store,
  currentOwner?: string,
) {
  try {
    const newEventId = eventId(final.id, interaction);
    const event = create<Event>(
      Event,
      newEventId,
      eventFrom(interaction, call, meta, currentOwner),
    );
    event.nft = final;
    await store.save(event);
  } catch (e) {
    logError(e, (err) => logger.warn(`[[${interaction}]]: ${final.id} Reason: ${err.message}`));
  }
}

async function createCollectionEvent(
  final: CE,
  interaction: CollectionInteraction,
  call: BaseCall,
  meta: string,
  store: Store,
) {
  try {
    const newEventId = eventId(final.id, interaction);
    const event = create<CollectionEvent>(
      CollectionEvent,
      newEventId,
      collectionEventFrom(interaction, call, meta),
    );
    event.collection = final;
    await store.save(event);
  } catch (e) {
    logError(e, (err) => logger.warn(`[[${interaction}]]: ${final.id} Reason: ${err.message}`));
  }
}

async function createOfferEvent(
  final: Offer,
  interaction: OfferInteraction,
  call: BaseCall,
  meta: string,
  store: Store,
  currentOwner?: string,
) {
  try {
    const newEventId = eventId(final.id, interaction);
    const event = create<OfferEvent>(
      OfferEvent,
      newEventId,
      eventFrom(interaction, call, meta, currentOwner),
    );
    event.offer = final;
    await store.save(event);
  } catch (e) {
    logError(e, (err) => logger.warn(`[[${interaction}]]: ${final.id} Reason: ${err.message}`));
  }
}
