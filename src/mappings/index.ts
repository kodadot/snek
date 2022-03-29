import { Store } from '@subsquid/substrate-processor'
import md5 from 'md5'
import {
  CollectionEntity as CE,
  CollectionEvent,
  Event,
  MetadataEntity as Metadata,
  NFTEntity as NE,
} from '../model'
import { CollectionType } from '../model/generated/_collectionType'
import { canOrElseError, exists, remint } from './utils/consolidator'
import { create, get } from './utils/entity'
import { createTokenId, unwrap } from './utils/extract'
import {
  getBurnTokenEvent,
  getCreateCollectionEvent,
  getCreateTokenEvent,
  getDestroyCollectionEvent,
  getTransferTokenEvent,
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
  ensure,
  eventFrom,
  eventId,
  Interaction,
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
  const event = unwrap(context, getCreateCollectionEvent)
  const collection = ensure<CE>(
    await get<CE>(context.store, CE, event.id)
  )
  canOrElseError<CE>(remint, collection)
  // TODO: check if collection exists and is burned
  const final = create<CE>(CE, event.id, {})
  final.id = event.id
  final.issuer = event.caller
  final.currentOwner = event.caller
  final.blockNumber = BigInt(event.blockNumber)
  final.metadata = event.metadata
  final.burned = false
  final.createdAt = event.timestamp
  final.updatedAt = event.timestamp
  final.type = event.type as CollectionType // unsafe

  logger.info(`collection: ${JSON.stringify(final, null, 2)}`)

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
  const event = unwrap(context, getDestroyCollectionEvent)
  const entity = ensure<CE>(await get(context.store, CE, event.id))
  canOrElseError<CE>(exists, entity, true)
  entity.burned = true
  logger.success(
    `[DESTROY] ${event.id} by ${event.caller}`
  )
  const meta = entity.metadata ?? ''
  await context.store.save(entity)
  await createCollectionEvent(entity, Interaction.DESTROY, event, meta, context.store)
}

export async function handleTokenCreate(context: Context): Promise<void> {
  const event = unwrap(context, getCreateTokenEvent)
  const id = createTokenId(event.collectionId, event.sn)
  const collection = ensure<CE>(
    await get<CE>(context.store, CE, event.collectionId)
  )
  const token = ensure<NE>(await get(context.store, NE, id))
  canOrElseError<CE>(exists, collection, true)
  // canOrElseError<NE>(remint, token)
  // TODO: check how the token is created when it was bured before
  const final = create<NE>(NE, id, {})
  final.id = id
  final.hash = md5(id)
  final.issuer = event.caller
  final.currentOwner = event.caller
  final.blockNumber = BigInt(event.blockNumber)
  final.collection = collection
  final.sn = event.sn
  final.metadata = event.metadata
  final.price = BigInt(0)
  final.burned = false
  final.createdAt = event.timestamp
  final.updatedAt = event.timestamp

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
  const event = unwrap(context, getTransferTokenEvent)
  const id = createTokenId(event.collectionId, event.sn)
  const entity = ensure<NE>(await get(context.store, NE, id))
  const currentOwner = entity.currentOwner
  entity.currentOwner = event.to
  logger.success(
    `[SEND] ${id} from ${event.caller} to ${event.to}`
  )
  await context.store.save(entity)
  await createEvent(entity, Interaction.SEND, event, event.to || '', context.store, currentOwner)
}

export async function handleTokenBurn(context: Context): Promise<void> {
  const event = unwrap(context, getBurnTokenEvent)
  const id = createTokenId(event.collectionId, event.sn)
  const entity = ensure<NE>(await get(context.store, NE, id))
  entity.burned = true
  logger.success(`[BURN] ${id} by ${event.caller}}`)
  await context.store.save(entity)
  const meta = entity.metadata ?? ''
  await createEvent(entity, Interaction.CONSUME, event, meta, context.store)
}

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
