import { NftClassCreatedEvent, NftClassDestroyedEvent, NftInstanceBurnedEvent, NftInstanceMintedEvent, NftInstanceTransferredEvent } from '../../types/events'
import { BurnTokenEvent, CreateCollectionEvent, CreateTokenEvent, DestroyCollectionEvent, TransferTokenEvent, Context } from './types'


export function getCreateCollectionEvent(ctx: Context): CreateCollectionEvent {
  const event = new NftClassCreatedEvent(ctx);
  if (event.isV39) {
    const { classId, owner, classType } = event.asV39;
    return { id: classId.toString(), caller: owner.toString(), type: classType.toString()};
  }
  if (event.isV50) {
    const { classId, owner, metadata, classType } = event.asV50;
    return { id: classId.toString(), caller: owner.toString(), metadata: metadata.toString(), type: classType.toString()  };
  }

  const { classId, owner, metadata, classType } = event.asLatest;
  return { id: classId.toString(), caller: owner.toString(), metadata: metadata.toString(), type: classType.toString()  };
}

export function getCreateTokenEvent(ctx: Context): CreateTokenEvent {
  const event = new NftInstanceMintedEvent(ctx);
  if (event.isV39) {
    const { classId, owner, instanceId } = event.asV39;
    return { collectionId: classId.toString(), caller: owner.toString(), sn: instanceId.toString() };
  }
  if (event.isV50) {
    const { classId, owner, instanceId, metadata } = event.asV50;
    return { collectionId: classId.toString(), caller: owner.toString(), sn: instanceId.toString(), metadata: metadata.toString() };
  }

  const { classId, owner, instanceId, metadata } = event.asLatest;
  return { collectionId: classId.toString(), caller: owner.toString(), sn: instanceId.toString(), metadata: metadata.toString() };
}

export function getTransferTokenEvent(ctx: Context): TransferTokenEvent {
  const event = new NftInstanceTransferredEvent(ctx);
  const { classId, instanceId, from, to } = event.asLatest;
  return { collectionId: classId.toString(), caller: from.toString(), sn: instanceId.toString(), to: to.toString() };
}

export function getBurnTokenEvent(ctx: Context): BurnTokenEvent {
  const event = new NftInstanceBurnedEvent(ctx);
  const { classId, instanceId, owner } = event.asLatest;
  return { collectionId: classId.toString(), caller: owner.toString(), sn: instanceId.toString()};
}

export function getDestroyCollectionEvent(ctx: Context): DestroyCollectionEvent {
  const event = new NftClassDestroyedEvent(ctx);
  const { classId, owner } = event.asLatest;
    return { id: classId.toString(), caller: owner.toString() };
}