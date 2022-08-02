import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'
import * as v43 from './v43'
import * as v48 from './v48'
import * as v55 from './v55'
import * as v62 from './v62'

export class MarketplaceOfferAcceptedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'marketplace.OfferAccepted')
  }

  /**
   * Offer was accepted \[sender, class_id, instance_id, amount, maker\]
   */
  get isV48(): boolean {
    return this.ctx._chain.getEventHash('marketplace.OfferAccepted') === '83fa789650cf7e0a68ea0f67c2a68a8e0de3f500393a77592cb755fdb5787c36'
  }

  /**
   * Offer was accepted \[sender, class_id, instance_id, amount, maker\]
   */
  get asV48(): [v48.AccountId32, bigint, bigint, bigint, v48.AccountId32] {
    assert(this.isV48)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Offer was accepted \[sender, class_id, instance_id\]
   */
  get isV43(): boolean {
    return this.ctx._chain.getEventHash('marketplace.OfferAccepted') === '426271b0ff71255c125e9a4ea897d86d39682c8454bbff4c6c9a8d50e0d966a4'
  }

  /**
   * Offer was accepted \[sender, class_id, instance_id\]
   */
  get asV43(): [v43.AccountId32, bigint, bigint, bigint] {
    assert(this.isV43)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Offer was accepted
   */
  get isV55(): boolean {
    return this.ctx._chain.getEventHash('marketplace.OfferAccepted') === '809213614dd888d0b0df83a1b4bb816a4bb8f7d702f40d7145c4c9532e70508e'
  }

  /**
   * Offer was accepted
   */
  get asV55(): {who: v55.AccountId32, class: bigint, instance: bigint, amount: bigint} {
    assert(this.isV55)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Offer was accepted
   */
  get isV62(): boolean {
    return this.ctx._chain.getEventHash('marketplace.OfferAccepted') === 'f0c64969aa0bb38598d60ee40e1c6befae4abc5b1835302ebc1b957c05eb0c42'
  }

  /**
   * Offer was accepted
   */
  get asV62(): {who: v62.AccountId32, class: bigint, instance: bigint, amount: bigint, maker: v62.AccountId32} {
    assert(this.isV62)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV62
  }

  get asLatest(): {who: v62.AccountId32, class: bigint, instance: bigint, amount: bigint, maker: v62.AccountId32} {
    deprecateLatest()
    return this.asV62
  }
}

export class MarketplaceOfferPlacedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'marketplace.OfferPlaced')
  }

  /**
   * Offer was placed on a token \[offerer, class_id, instance_id, price, expires\]
   */
  get isV48(): boolean {
    return this.ctx._chain.getEventHash('marketplace.OfferPlaced') === '0c0020b8a59f4c44bfafff6516e075c67efa07d49d2257040c27bd47de251831'
  }

  /**
   * Offer was placed on a token \[offerer, class_id, instance_id, price, expires\]
   */
  get asV48(): [v48.AccountId32, bigint, bigint, bigint, number] {
    assert(this.isV48)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Offer was placed on a token
   */
  get isV55(): boolean {
    return this.ctx._chain.getEventHash('marketplace.OfferPlaced') === 'e16435d4410d4a6b6ffce5b4169856dae7831e563e44572ff395cd265d9d64d1'
  }

  /**
   * Offer was placed on a token
   */
  get asV55(): {who: v55.AccountId32, class: bigint, instance: bigint, amount: bigint, expires: number} {
    assert(this.isV55)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV55
  }

  get asLatest(): {who: v55.AccountId32, class: bigint, instance: bigint, amount: bigint, expires: number} {
    deprecateLatest()
    return this.asV55
  }
}

export class MarketplaceOfferWithdrawnEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'marketplace.OfferWithdrawn')
  }

  /**
   * Offer was withdrawn \[sender, class_id, instance_id\]
   */
  get isV48(): boolean {
    return this.ctx._chain.getEventHash('marketplace.OfferWithdrawn') === '0f263bfdefa394edfb38d20d33662423a2e0902235b599f9b2b0292f157f0902'
  }

  /**
   * Offer was withdrawn \[sender, class_id, instance_id\]
   */
  get asV48(): [v48.AccountId32, bigint, bigint] {
    assert(this.isV48)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Offer was withdrawn
   */
  get isV55(): boolean {
    return this.ctx._chain.getEventHash('marketplace.OfferWithdrawn') === '669141c2bfed250cfd51ec61736d5b23f65d22716737b27cfa84f9a287f1412f'
  }

  /**
   * Offer was withdrawn
   */
  get asV55(): {who: v55.AccountId32, class: bigint, instance: bigint} {
    assert(this.isV55)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV55
  }

  get asLatest(): {who: v55.AccountId32, class: bigint, instance: bigint} {
    deprecateLatest()
    return this.asV55
  }
}

export class MarketplaceRoyaltyAddedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'marketplace.RoyaltyAdded')
  }

  /**
   * Marketplace data has been added \[class_type, sender, class_id, instance_id\]
   */
  get isV48(): boolean {
    return this.ctx._chain.getEventHash('marketplace.RoyaltyAdded') === 'b25c5b1351882b8049f26b3ffe8318b0c04beabe7f3b1174b983af490abf68f7'
  }

  /**
   * Marketplace data has been added \[class_type, sender, class_id, instance_id\]
   */
  get asV48(): [bigint, bigint, v48.AccountId32, number] {
    assert(this.isV48)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Marketplace data has been added
   */
  get isV55(): boolean {
    return this.ctx._chain.getEventHash('marketplace.RoyaltyAdded') === 'f0b773a6ad41ebc0b1145b9a33782c7e6ea900db44e465cd5ee41e90a342ce57'
  }

  /**
   * Marketplace data has been added
   */
  get asV55(): {class: bigint, instance: bigint, author: v55.AccountId32, royalty: number} {
    assert(this.isV55)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV55
  }

  get asLatest(): {class: bigint, instance: bigint, author: v55.AccountId32, royalty: number} {
    deprecateLatest()
    return this.asV55
  }
}

export class MarketplaceRoyaltyPaidEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'marketplace.RoyaltyPaid')
  }

  /**
   * Royalty hs been paid to the author \[class_id, instance_id, author, royalty, royalty_amount\]
   */
  get isV48(): boolean {
    return this.ctx._chain.getEventHash('marketplace.RoyaltyPaid') === '82293205d464a489606def2289dde2ad7444a78cb3ae19f599a2160d68a0b720'
  }

  /**
   * Royalty hs been paid to the author \[class_id, instance_id, author, royalty, royalty_amount\]
   */
  get asV48(): [bigint, bigint, v48.AccountId32, number, bigint] {
    assert(this.isV48)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Royalty hs been paid to the author
   */
  get isV55(): boolean {
    return this.ctx._chain.getEventHash('marketplace.RoyaltyPaid') === '3f9760ce8b8d78244eecfd769b57213a52326480392d53bcbaef555fda8245b2'
  }

  /**
   * Royalty hs been paid to the author
   */
  get asV55(): {class: bigint, instance: bigint, author: v55.AccountId32, royalty: number, royaltyAmount: bigint} {
    assert(this.isV55)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV55
  }

  get asLatest(): {class: bigint, instance: bigint, author: v55.AccountId32, royalty: number, royaltyAmount: bigint} {
    deprecateLatest()
    return this.asV55
  }
}

export class MarketplaceTokenPriceUpdatedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'marketplace.TokenPriceUpdated')
  }

  /**
   * The price for a token was updated \[owner, class_id, instance_id, price\]
   */
  get isV48(): boolean {
    return this.ctx._chain.getEventHash('marketplace.TokenPriceUpdated') === '4100700286e3b39a636551e9e9872940d3c125d1b8729ac058742455e638fbe2'
  }

  /**
   * The price for a token was updated \[owner, class_id, instance_id, price\]
   */
  get asV48(): [v48.AccountId32, bigint, bigint, (bigint | undefined)] {
    assert(this.isV48)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * The price for a token was updated
   */
  get isV55(): boolean {
    return this.ctx._chain.getEventHash('marketplace.TokenPriceUpdated') === '36db2c5ce4786a5437e40968bfcb5727b1548bed0fec7d93b771e5f589c2233a'
  }

  /**
   * The price for a token was updated
   */
  get asV55(): {who: v55.AccountId32, class: bigint, instance: bigint, price: (bigint | undefined)} {
    assert(this.isV55)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV55
  }

  get asLatest(): {who: v55.AccountId32, class: bigint, instance: bigint, price: (bigint | undefined)} {
    deprecateLatest()
    return this.asV55
  }
}

export class MarketplaceTokenSoldEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'marketplace.TokenSold')
  }

  /**
   * Token was sold to a new owner \[owner, buyer, class_id, instance_id, price\]
   */
  get isV48(): boolean {
    return this.ctx._chain.getEventHash('marketplace.TokenSold') === '4a3bc2182538af0cb911036daeda76c419c2f42491eda8f66b9ca681035507c0'
  }

  /**
   * Token was sold to a new owner \[owner, buyer, class_id, instance_id, price\]
   */
  get asV48(): [v48.AccountId32, v48.AccountId32, bigint, bigint, bigint] {
    assert(this.isV48)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Token was sold to a new owner
   */
  get isV55(): boolean {
    return this.ctx._chain.getEventHash('marketplace.TokenSold') === 'c30b6db0fb1c37eb14b31c9148a9b2c3afdbe6f034f90a5f7160a284a8388c46'
  }

  /**
   * Token was sold to a new owner
   */
  get asV55(): {owner: v55.AccountId32, buyer: v55.AccountId32, class: bigint, instance: bigint, price: bigint} {
    assert(this.isV55)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV55
  }

  get asLatest(): {owner: v55.AccountId32, buyer: v55.AccountId32, class: bigint, instance: bigint, price: bigint} {
    deprecateLatest()
    return this.asV55
  }
}

export class NftClassCreatedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'nft.ClassCreated')
  }

  /**
   * A class was created \[owner, class_id, class_type\]
   */
  get isV48(): boolean {
    return this.ctx._chain.getEventHash('nft.ClassCreated') === '964234ae203d3207b740072bc8630eee21c72fe7995f3fc03e62f0bb443cca32'
  }

  /**
   * A class was created \[owner, class_id, class_type\]
   */
  get asV48(): {owner: v48.AccountId32, classId: bigint, classType: v48.ClassType, metadata: Uint8Array} {
    assert(this.isV48)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * A class was created \[owner, class_id, class_type\]
   */
  get isV62(): boolean {
    return this.ctx._chain.getEventHash('nft.ClassCreated') === '7adeb3f2ae9b2b9c39201542a741e44b5484fadd52179e412e45be77a794f225'
  }

  /**
   * A class was created \[owner, class_id, class_type\]
   */
  get asV62(): {owner: v62.AccountId32, classId: bigint, classType: v62.ClassType} {
    assert(this.isV62)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV62
  }

  get asLatest(): {owner: v62.AccountId32, classId: bigint, classType: v62.ClassType} {
    deprecateLatest()
    return this.asV62
  }
}

export class NftClassDestroyedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'nft.ClassDestroyed')
  }

  /**
   * A class was destroyed \[class_id\]
   */
  get isV48(): boolean {
    return this.ctx._chain.getEventHash('nft.ClassDestroyed') === '51309f98603f5eeb2eb07f9373848f1874c4bfaea4a29b0e0d21dd93b98da94a'
  }

  /**
   * A class was destroyed \[class_id\]
   */
  get asV48(): {owner: v48.AccountId32, classId: bigint} {
    assert(this.isV48)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV48
  }

  get asLatest(): {owner: v48.AccountId32, classId: bigint} {
    deprecateLatest()
    return this.asV48
  }
}

export class NftInstanceBurnedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'nft.InstanceBurned')
  }

  /**
   * An instance was burned \[sender, class_id, instance_id\]
   */
  get isV48(): boolean {
    return this.ctx._chain.getEventHash('nft.InstanceBurned') === 'cbf0740ecac063f0cc91759153cc494f3d948025e716ccd16da079129444cc1d'
  }

  /**
   * An instance was burned \[sender, class_id, instance_id\]
   */
  get asV48(): {owner: v48.AccountId32, classId: bigint, instanceId: bigint} {
    assert(this.isV48)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV48
  }

  get asLatest(): {owner: v48.AccountId32, classId: bigint, instanceId: bigint} {
    deprecateLatest()
    return this.asV48
  }
}

export class NftInstanceMintedEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'nft.InstanceMinted')
  }

  /**
   * An instance was minted \[owner, class_id, instance_id\]
   */
  get isV48(): boolean {
    return this.ctx._chain.getEventHash('nft.InstanceMinted') === 'eb2d7da6cd031b1051bd4c0ebcbe8cd70b244f54737e21a7f8279dccee6fa006'
  }

  /**
   * An instance was minted \[owner, class_id, instance_id\]
   */
  get asV48(): {owner: v48.AccountId32, classId: bigint, instanceId: bigint, metadata: Uint8Array} {
    assert(this.isV48)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * An instance was minted \[owner, class_id, instance_id\]
   */
  get isV62(): boolean {
    return this.ctx._chain.getEventHash('nft.InstanceMinted') === 'cbf0740ecac063f0cc91759153cc494f3d948025e716ccd16da079129444cc1d'
  }

  /**
   * An instance was minted \[owner, class_id, instance_id\]
   */
  get asV62(): {owner: v62.AccountId32, classId: bigint, instanceId: bigint} {
    assert(this.isV62)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV62
  }

  get asLatest(): {owner: v62.AccountId32, classId: bigint, instanceId: bigint} {
    deprecateLatest()
    return this.asV62
  }
}

export class NftInstanceTransferredEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'nft.InstanceTransferred')
  }

  /**
   * An instance was transferred \[from, to, class_id, instance_id\]
   */
  get isV48(): boolean {
    return this.ctx._chain.getEventHash('nft.InstanceTransferred') === 'e0a071978a33a540c15a46174c5018087ae648a19419f54dab0cb069ce949563'
  }

  /**
   * An instance was transferred \[from, to, class_id, instance_id\]
   */
  get asV48(): {from: v48.AccountId32, to: v48.AccountId32, classId: bigint, instanceId: bigint} {
    assert(this.isV48)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV48
  }

  get asLatest(): {from: v48.AccountId32, to: v48.AccountId32, classId: bigint, instanceId: bigint} {
    deprecateLatest()
    return this.asV48
  }
}
