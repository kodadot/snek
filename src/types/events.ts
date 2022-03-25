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
    return this.ctx._chain.getEventHash('nft.ClassCreated') === 'e5ba1c0085c1faaf7ada6485d9aa18c5e6ed625403fb4641aa06416b38c7eada'
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
    return this.ctx._chain.getEventHash('nft.ClassCreated') === 'ce3713641150a419581dc719e818fcd693c4cea897dfce1be8ed7cbd749498fc'
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
    return this.ctx._chain.getEventHash('nft.ClassDestroyed') === 'f04371ea3b0ac69e55d1c975ad8fbdc308f1dee37ebfdb2351ac189370b568ff'
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
    return this.ctx._chain.getEventHash('nft.InstanceBurned') === 'baa08b83bc16cebc818192f9e551a533e3945d39c52416aff7af254d13ddab40'
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
    return this.ctx._chain.getEventHash('nft.InstanceMinted') === '4c21cb1c3dd57664667294c38ca430c1713ef83678b8823da51ee75558fa2b92'
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
    return this.ctx._chain.getEventHash('nft.InstanceMinted') === '0fd54946aedb7b39910e7d095f123ab20efd8a3aebf4386f2c9620706a588697'
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
    return this.ctx._chain.getEventHash('nft.InstanceTransferred') === '755be91558a0f192872755d165315d444206ce854c731f88d1684fdbaddcf282'
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
