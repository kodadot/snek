import { Store } from '@subsquid/substrate-processor'
import md5 from 'md5'
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
} from '../model'
import { CollectionType } from '../model/generated/_collectionType'
import { plsBe, plsNotBe, real, remintable } from './utils/consolidator'
import { create, get, getOrCreate } from './utils/entity'
import { createTokenId, unwrap } from './utils/extract'
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
} from './utils/getters'
import { isEmpty } from './utils/helper'
import logger, { logError } from './utils/logger'
import { fetchMetadata } from './utils/metadata'
import {
  attributeFrom,
  BaseCall,
  collectionEventFrom,
  CollectionInteraction,
  Context,
  createOfferId,
  ensure,
  eventFrom,
  eventId,
  Interaction,
  tokenIdOf,
  offerIdOf,
  Optional,
  TokenMetadata,
} from './utils/types'

async function handleMetadata(
  id: string,
  store: Store
): Promise<Optional<Metadata>> {
  const meta = await get<Metadata>(store, Metadata, id)
  if (meta) {
    return meta
  }

  const metadata = await fetchMetadata<TokenMetadata>({ metadata: id })
  if (isEmpty(metadata)) {
    return null
  }

  const partial: Partial<Metadata> = {
    id,
    description: metadata.description || '',
    image: metadata.image,
    animationUrl: metadata.animation_url,
    attributes: metadata.attributes?.map(attributeFrom) || [],
    name: metadata.name || '',
  }

  const final = create<Metadata>(Metadata, id, partial)
  await store.save(final)
  return final
}

export async function handleCollectionCreate(context: Context): Promise<void> {
  logger.pending(`[COLECTTION++]: ${context.event.blockNumber}`)
  const event = unwrap(context, getCreateCollectionEvent)
  logger.debug(`collection: ${JSON.stringify(event, null, 2)}`)
  const final = await getOrCreate<CE>(context.store, CE, event.id, {})
  plsBe(remintable, final)

  final.id = event.id
  final.issuer = event.caller
  final.currentOwner = event.caller
  final.blockNumber = BigInt(event.blockNumber)
  final.metadata = event.metadata || 'ipfs://ipfs/bafkreiazeqysfmeuzqcnjp6rijxfu5h7sj3t4h2rxehi7rlyegzfy7lxeq'
  final.burned = false
  final.createdAt = event.timestamp
  final.updatedAt = event.timestamp
  final.type = event.type as CollectionType // unsafe


  logger.debug(`metadata: ${event.metadata}`)

  if (final.metadata) {
    const metadata = await handleMetadata(final.metadata, context.store)
    final.meta = metadata
    final.name = metadata?.name
  }

  logger.success(`[COLLECTION] ${final.id}`)
  await context.store.save(final)
  await createCollectionEvent(final, Interaction.MINT, event, '', context.store)
}

export async function handleCollectionDestroy(context: Context): Promise<void> {
  logger.pending(`[DESTROY]: ${context.event.blockNumber}`)
  const event = unwrap(context, getDestroyCollectionEvent)
  const entity = ensure<CE>(await get(context.store, CE, event.id))
  plsBe(real, entity)

  entity.burned = true
  logger.success(
    `[DESTROY] ${event.id} by ${event.caller}`
  )
  const meta = entity.metadata ?? ''
  await context.store.save(entity)
  await createCollectionEvent(entity, Interaction.DESTROY, event, meta, context.store)
}

export async function handleTokenCreate(context: Context): Promise<void> {
  logger.pending(`[NFT++]: ${context.event.blockNumber}`)
  const event = unwrap(context, getCreateTokenEvent)
  logger.debug(`nft: ${JSON.stringify(event, null, 2)}`)
  const id = createTokenId(event.collectionId, event.sn)
  const collection = ensure<CE>(
    await get<CE>(context.store, CE, event.collectionId)
  )
  const final = await getOrCreate<NE>(context.store, NE, id, {})
  plsBe(real, collection)
  plsBe(remintable, final)

  final.id = id
  final.hash = md5(id)
  final.issuer = event.caller
  final.currentOwner = event.caller
  final.blockNumber = BigInt(event.blockNumber)
  final.collection = collection
  final.sn = event.sn
  final.metadata = event.metadata || 'ipfs://ipfs/bafkreiazeqysfmeuzqcnjp6rijxfu5h7sj3t4h2rxehi7rlyegzfy7lxeq'
  final.price = BigInt(0)
  final.burned = false
  final.createdAt = event.timestamp
  final.updatedAt = event.timestamp

  logger.debug(`metadata: ${event.metadata}`)

  if (final.metadata) {
    const metadata = await handleMetadata(final.metadata, context.store)
    final.meta = metadata
    final.name = metadata?.name
  }

  logger.success(`[MINT] ${final.id}`)
  await context.store.save(final)
  await createEvent(final, Interaction.MINTNFT, event, '', context.store)
}

export async function handleTokenTransfer(context: Context): Promise<void> {
  logger.pending(`[SEND]: ${context.event.blockNumber}`)
  const event = unwrap(context, getTransferTokenEvent)
  logger.debug(`send: ${JSON.stringify(event, null, 2)}`)
  const id = createTokenId(event.collectionId, event.sn)
  const entity = ensure<NE>(await get(context.store, NE, id))
  plsBe(real, entity)

  const currentOwner = entity.currentOwner
  entity.currentOwner = event.to
  logger.success(
    `[SEND] ${id} from ${event.caller} to ${event.to}`
  )
  await context.store.save(entity)
  await createEvent(entity, Interaction.SEND, event, event.to || '', context.store, currentOwner)
}

export async function handleTokenBurn(context: Context): Promise<void> {
  logger.pending(`[BURN]: ${context.event.blockNumber}`)
  const event = unwrap(context, getBurnTokenEvent)
  logger.debug(`burn: ${JSON.stringify(event, null, 2)}`)
  const id = createTokenId(event.collectionId, event.sn)
  const entity = ensure<NE>(await get(context.store, NE, id))
  plsBe(real, entity)

  entity.burned = true
  logger.success(`[BURN] ${id} by ${event.caller}}`)
  await context.store.save(entity)
  const meta = entity.metadata ?? ''
  await createEvent(entity, Interaction.CONSUME, event, meta, context.store)
}

export async function handleTokenList(context: Context): Promise<void> {
  logger.pending(`[LIST]: ${context.event.blockNumber}`)
  const event = unwrap(context, getListTokenEvent)
  logger.debug(`list: ${JSON.stringify({ ...event, price: String(event.price)  }, null, 2)}`)
  const id = createTokenId(event.collectionId, event.sn)
  const entity = ensure<NE>(await get(context.store, NE, id))
  plsBe(real, entity)

  entity.price = event.price
  logger.success(`[LIST] ${id} by ${event.caller}} for ${String(event.price)}`)
  await context.store.save(entity)
  const meta = String(event.price || '')
  const interaction = event.price ? Interaction.LIST : Interaction.UNLIST
  await createEvent(entity,  interaction, event, meta, context.store)
}

export async function handleTokenBuy(context: Context): Promise<void> {
  logger.pending(`[BUY]: ${context.event.blockNumber}`)
  const event = unwrap(context, getBuyTokenEvent)
  logger.debug(`buy: ${JSON.stringify({ ...event, price: String(event.price)  }, null, 2)}`)
  const id = createTokenId(event.collectionId, event.sn)
  const entity = ensure<NE>(await get(context.store, NE, id))
  plsBe(real, entity)
  entity.price = undefined // not sure if this is correct
  entity.currentOwner = event.caller

  logger.success(`[BUY] ${id} by ${event.caller}}`)
  await context.store.save(entity)
  const meta = entity.metadata ?? ''
  await createEvent(entity, Interaction.BUY, event, meta, context.store, event.currentOwner)
}

export async function handleRoyaltyAdd(context: Context): Promise<void> {
  logger.pending(`[ROYALTY]: ${context.event.blockNumber}`)
  const event = unwrap(context, getAddRoyaltyEvent)
  logger.debug(`royalty add: ${JSON.stringify(event, null, 2)}`)
  const id = createTokenId(event.collectionId, event.sn)
  const entity = ensure<NE>(await get(context.store, NE, id))
  plsBe(real, entity)

  entity.royalty = event.royalty
  entity.recipient = event.recipient

  logger.success(`[ROYALTY] ${id} by ${event.caller}}`)
  await context.store.save(entity)
  const meta = String(event.royalty || '')
  await createEvent(entity, Interaction.ROYALTY, event, meta, context.store)
}

export async function handleRoyaltyPay(context: Context): Promise<void> {
  logger.pending(`[PAY ROYALTY]: ${context.event.blockNumber}`)
  const event = unwrap(context, getPayRoyaltyEvent)
  logger.debug(`pay: ${JSON.stringify(event, null, 2)}`)
  const id = createTokenId(event.collectionId, event.sn)
  const entity = ensure<NE>(await get(context.store, NE, id))
  plsBe(real, entity)

  const meta = String(event.amount || '')
  await createEvent(entity, Interaction.PAY_ROYALTY, event, meta, context.store, event.recipient)
}

// https://github.com/galacticcouncil/Basilisk-node/issues/424
export async function handleOfferPlace(context: Context): Promise<void> {
  logger.pending(`[PLACE OFFER]: ${context.event.blockNumber}`)
  const event = unwrap(context, getPlaceOfferEvent)
  // logger.debug(`offer: ${JSON.stringify({ ...event, price: String(event.amount), expiresAt: String(event.expiresAt)  }, null, 2)}`)
  const id = createTokenId(event.collectionId, event.sn)
  const entity = ensure<NE>(await get(context.store, NE, id))
  plsBe(real, entity)

  const offerId = createOfferId(entity.id, event.caller)
  const mayOffer = await get(context.store, Offer, offerId)

  const offer = mayOffer ?? create<Offer>(Offer, offerId, {})
  offer.caller = event.caller
  offer.price = event.amount
  offer.blockNumber = BigInt(event.blockNumber)
  offer.expiration = event.expiresAt
  offer.createdAt = event.timestamp
  offer.status = OfferStatus.ACTIVE

  if (!mayOffer) {
    offer.nft = entity
  }

  logger.success(`[PLACE OFFER] for ${id} by ${event.caller}} for ${String(event.amount)}`)
  await context.store.save(offer)
  
  const meta = String(event.amount || '')
  await createOfferEvent(offer, OfferInteraction.CREATE, event, meta, context.store, entity.currentOwner)
}

export async function handleOfferAccept(context: Context): Promise<void> {
  logger.pending(`[ACCEPT OFFER]: ${context.event.blockNumber}`)
  const event = unwrap(context, getAcceptOfferEvent)
  logger.debug(`offer: ${JSON.stringify({ ...event, amount: String(event.amount)  }, null, 2)}`)
  const tokenId = tokenIdOf(event)
  const id = createOfferId(tokenId, event.caller)
  const entity = ensure<Offer>(await get(context.store, Offer, id))
  plsBe(real, entity)

  entity.status = OfferStatus.ACCEPTED
  entity.updatedAt = event.timestamp

  logger.success(`[ACCEPT OFFER] for ${id} by ${event.caller}} for ${String(event.amount)}`)
  
  const currentOwner = ensure<NE>(await get(context.store, NE, tokenId)).currentOwner

  await context.store.save(entity)
  const meta = String(event.amount || '')
  await createOfferEvent(entity, OfferInteraction.ACCEPT, event, meta, context.store, currentOwner)
}

export async function handleOfferWithdraw(context: Context): Promise<void> {
  logger.pending(`[WITHDRAW OFFER]: ${context.event.blockNumber}`)
  const event = unwrap(context, getWithdrawOfferEvent)
  logger.debug(`offer no: ${JSON.stringify(event, null, 2)}`)
  const tokenId = tokenIdOf(event)
  const id = createOfferId(tokenId, event.caller)
  const entity = ensure<Offer>(await get(context.store, Offer, id))
  plsBe(real, entity)

  entity.status = OfferStatus.WITHDRAWN
  entity.updatedAt = event.timestamp

  logger.success(`[WITHDRAW OFFER] for ${id} by ${event.caller}} for ${String(entity.price)}`)
  const currentOwner = ensure<NE>(await get(context.store, NE, tokenId)).currentOwner

  await context.store.save(entity)
  const meta = String(entity.price || '')
  await createOfferEvent(entity, OfferInteraction.CANCEL, event, meta, context.store, currentOwner)
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
  currentOwner?: string
) {
  try {
    const newEventId = eventId(final.id, interaction)
    const event = create<Event>(
      Event,
      newEventId,
      eventFrom(interaction, call, meta, currentOwner)
    )
    event.nft = final
    await store.save(event)
  } catch (e) {
    logError(e, (e) =>
      logger.warn(`[[${interaction}]]: ${final.id} Reason: ${e.message}`)
    )
  }
}

async function createCollectionEvent(
  final: CE,
  interaction: CollectionInteraction,
  call: BaseCall,
  meta: string,
  store: Store
) {
  try {
    const newEventId = eventId(final.id, interaction)
    const event = create<CollectionEvent>(
      CollectionEvent,
      newEventId,
      collectionEventFrom(interaction, call, meta)
    )
    event.collection = final
    await store.save(event)
  } catch (e) {
    logError(e, (e) =>
      logger.warn(`[[${interaction}]]: ${final.id} Reason: ${e.message}`)
    )
  }
}

async function createOfferEvent(
  final: Offer,
  interaction: OfferInteraction,
  call: BaseCall,
  meta: string,
  store: Store,
  currentOwner?: string
) {
  try {
    const newEventId = eventId(final.id, interaction)
    const event = create<OfferEvent>(
      OfferEvent,
      newEventId,
      eventFrom(interaction, call, meta, currentOwner)
    )
    event.offer = final
    await store.save(event)
  } catch (e) {
    logError(e, (e) =>
      logger.warn(`[[${interaction}]]: ${final.id} Reason: ${e.message}`)
    )
  }
}
