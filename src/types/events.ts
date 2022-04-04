import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'
import * as v39 from './v39'
import * as v50 from './v50'

export class NftClassCreatedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'nft.ClassCreated')
  }

  /**
   * A class was created \[owner, class_id, class_type\]
   */
  get isV39(): boolean {
    return this.ctx._chain.getEventHash('nft.ClassCreated') === '7adeb3f2ae9b2b9c39201542a741e44b5484fadd52179e412e45be77a794f225'
  }

  /**
   * A class was created \[owner, class_id, class_type\]
   */
  get asV39(): {owner: v39.AccountId32, classId: bigint, classType: v39.ClassType} {
    assert(this.isV39)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * A class was created \[owner, class_id, class_type\]
   */
  get isV50(): boolean {
    return this.ctx._chain.getEventHash('nft.ClassCreated') === '964234ae203d3207b740072bc8630eee21c72fe7995f3fc03e62f0bb443cca32'
  }

  /**
   * A class was created \[owner, class_id, class_type\]
   */
  get asV50(): {owner: v50.AccountId32, classId: bigint, classType: v50.ClassType, metadata: Uint8Array} {
    assert(this.isV50)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV50
  }

  get asLatest(): {owner: v50.AccountId32, classId: bigint, classType: v50.ClassType, metadata: Uint8Array} {
    deprecateLatest()
    return this.asV50
  }
}

export class NftClassDestroyedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'nft.ClassDestroyed')
  }

  /**
   * A class was destroyed \[class_id\]
   */
  get isV39(): boolean {
    return this.ctx._chain.getEventHash('nft.ClassDestroyed') === '51309f98603f5eeb2eb07f9373848f1874c4bfaea4a29b0e0d21dd93b98da94a'
  }

  /**
   * A class was destroyed \[class_id\]
   */
  get asV39(): {owner: v39.AccountId32, classId: bigint} {
    assert(this.isV39)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV39
  }

  get asLatest(): {owner: v39.AccountId32, classId: bigint} {
    deprecateLatest()
    return this.asV39
  }
}

export class NftInstanceBurnedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'nft.InstanceBurned')
  }

  /**
   * An instance was burned \[sender, class_id, instance_id\]
   */
  get isV39(): boolean {
    return this.ctx._chain.getEventHash('nft.InstanceBurned') === 'cbf0740ecac063f0cc91759153cc494f3d948025e716ccd16da079129444cc1d'
  }

  /**
   * An instance was burned \[sender, class_id, instance_id\]
   */
  get asV39(): {owner: v39.AccountId32, classId: bigint, instanceId: bigint} {
    assert(this.isV39)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV39
  }

  get asLatest(): {owner: v39.AccountId32, classId: bigint, instanceId: bigint} {
    deprecateLatest()
    return this.asV39
  }
}

export class NftInstanceMintedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'nft.InstanceMinted')
  }

  /**
   * An instance was minted \[owner, class_id, instance_id\]
   */
  get isV39(): boolean {
    return this.ctx._chain.getEventHash('nft.InstanceMinted') === 'cbf0740ecac063f0cc91759153cc494f3d948025e716ccd16da079129444cc1d'
  }

  /**
   * An instance was minted \[owner, class_id, instance_id\]
   */
  get asV39(): {owner: v39.AccountId32, classId: bigint, instanceId: bigint} {
    assert(this.isV39)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * An instance was minted \[owner, class_id, instance_id\]
   */
  get isV50(): boolean {
    return this.ctx._chain.getEventHash('nft.InstanceMinted') === 'eb2d7da6cd031b1051bd4c0ebcbe8cd70b244f54737e21a7f8279dccee6fa006'
  }

  /**
   * An instance was minted \[owner, class_id, instance_id\]
   */
  get asV50(): {owner: v50.AccountId32, classId: bigint, instanceId: bigint, metadata: Uint8Array} {
    assert(this.isV50)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV50
  }

  get asLatest(): {owner: v50.AccountId32, classId: bigint, instanceId: bigint, metadata: Uint8Array} {
    deprecateLatest()
    return this.asV50
  }
}

export class NftInstanceTransferredEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'nft.InstanceTransferred')
  }

  /**
   * An instance was transferred \[from, to, class_id, instance_id\]
   */
  get isV39(): boolean {
    return this.ctx._chain.getEventHash('nft.InstanceTransferred') === 'e0a071978a33a540c15a46174c5018087ae648a19419f54dab0cb069ce949563'
  }

  /**
   * An instance was transferred \[from, to, class_id, instance_id\]
   */
  get asV39(): {from: v39.AccountId32, to: v39.AccountId32, classId: bigint, instanceId: bigint} {
    assert(this.isV39)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV39
  }

  get asLatest(): {from: v39.AccountId32, to: v39.AccountId32, classId: bigint, instanceId: bigint} {
    deprecateLatest()
    return this.asV39
  }
}
