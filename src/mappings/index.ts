import { createTokenId, unwrap } from './utils/extract'
import { Context, ensure, Optional, TokenMetadata, attributeFrom, Interaction, eventFrom, eventId } from './utils/types'
import { getBurnTokenEvent, getCreateCollectionEvent, getCreateTokenEvent, getDestroyCollectionEvent, getTransferTokenEvent } from './utils/getters'
import { create, get } from './utils/entity'
import { CollectionEntity as CE, NFTEntity as NE, MetadataEntity as Metadata, Event } from '../model'
import logger, { logError } from './utils/logger'
import md5 from 'md5'
import { Store } from '@subsquid/substrate-processor'
import { fetchMetadata } from './utils/metadata'

async function handleMetadata(
  id: string,
  store: Store
): Promise<Optional<Metadata>> {
  const meta = await get<Metadata>(store, Metadata, id)
  if (meta) {
    return meta
  }

  const metadata = await fetchMetadata<TokenMetadata>({ metadata: id })
  // if (isEmpty(metadata)) {
  //   return null
  // }

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
  const collectionEvent = unwrap(context, getCreateCollectionEvent)
  const entity = await get<CE>(context.store, CE, collectionEvent.id)
  const final = create<CE>(CE, collectionEvent.id, {})

  // TODO: Finish
  // final.blockNumber = collectionEvent.blockNumber
  logger.success(`[COLLECTION] ${final.id}`)
  await context.store.save(final)

}

export async function handleCollectionDestroy(context: Context): Promise<void> {
  const collectionEvent = unwrap(context, getDestroyCollectionEvent)
  const entity = await ensure<CE>(get(context.store, CE, collectionEvent.id))
  // canOrElseError<CE>(exists, nft, true)
  entity.burned = true
  logger.success(`[DESTROY] ${collectionEvent.id} from ${collectionEvent.caller}`)
  await context.store.save(entity)

}

export async function handleTokenCreate(context: Context): Promise<void> {
  const event = unwrap(context, getCreateTokenEvent)
  const id = createTokenId(event.collectionId, event.sn)
  const entity = await get<NE>(context.store, NE, id) 
  // TODO: check how the token is created when it was bured before
  const final = create<NE>(NE, id, {})
  // TODO: Finish
  final.id = id
  final.hash = md5(id)
  final.issuer = event.caller
  final.currentOwner = event.caller
  final.blockNumber = BigInt(event.blockNumber)
  // final.collection = collection
  final.sn = event.sn
  final.metadata = event.metadata
  final.price = BigInt(0)
  final.burned = false
  final.createdAt = event.timestamp
  final.updatedAt = event.timestamp

  if (final.metadata) {
    const metadata = await handleMetadata(final.metadata, context.store)
    final.meta = metadata
    // final.name = metadata?.name || ''
  }
  
  logger.success(`[MINT] ${final.id}`)
  await context.store.save(final)
  // await createEvent(final, Interaction.MINTNFT, remark, '', store)
}

export async function handleTokenTransfer(context: Context): Promise<void> {
  const tokenEvent = unwrap(context, getTransferTokenEvent)
  const id = createTokenId(tokenEvent.collectionId, tokenEvent.sn)
  const entity = await ensure<NE>(get(context.store, NE, id))
  entity.currentOwner = tokenEvent.to
  logger.success(`[TRANSFER] ${id} from ${tokenEvent.caller} to ${tokenEvent.to}`)
  await context.store.save(entity)
}


export async function handleTokenBurn(context: Context): Promise<void> {
  const tokenEvent = unwrap(context, getBurnTokenEvent)
  const id = createTokenId(tokenEvent.collectionId, tokenEvent.sn)
  const entity = await ensure<NE>(get(context.store, NE, id))
  entity.burned = true
  logger.success(`[BURN] ${id} by ${tokenEvent.caller}}`)
  await context.store.save(entity)
}

// async function createEvent(final: NE, interaction: Interaction, remark: RemarkResult, meta: string, store: Store) {
//   try {
//     const newEventId = eventId(final.id, interaction)
//     const event = create<Event>(Event, newEventId, eventFrom(interaction, remark, meta))
//     event.nft = final
//     await store.save(event)
//   } catch (e) {
//     logError(e, (e) => logger.warn(`[[${interaction}]]: ${final.id} Reason: ${e.message}`))
//   }
  
// }