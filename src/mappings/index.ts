import { unwrap } from './utils/extract'
import { Context, CreateTokenEvent, ensure } from './utils/types'
import { getCreateCollectionEvent, getDestroyCollectionEvent } from './utils/getters'
import { create, get } from './utils/entity'
import { CollectionEntity as CE, NFTEntity as NE } from '../model'
import logger from './utils/logger'

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
export async function handleTokenCreate(context: Context): Promise<void> {}
export async function handleTokenTransfer(context: Context): Promise<void> {}
export async function handleTokenBurn(context: Context): Promise<void> {}