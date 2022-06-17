import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'
import * as v48 from './v48'

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

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV48
  }

  get asLatest(): [v48.AccountId32, bigint, bigint, bigint, v48.AccountId32] {
    deprecateLatest()
    return this.asV48
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

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV48
  }

  get asLatest(): [v48.AccountId32, bigint, bigint, bigint, number] {
    deprecateLatest()
    return this.asV48
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

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV48
  }

  get asLatest(): [v48.AccountId32, bigint, bigint] {
    deprecateLatest()
    return this.asV48
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

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV48
  }

  get asLatest(): [bigint, bigint, v48.AccountId32, number] {
    deprecateLatest()
    return this.asV48
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

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV48
  }

  get asLatest(): [bigint, bigint, v48.AccountId32, number, bigint] {
    deprecateLatest()
    return this.asV48
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

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV48
  }

  get asLatest(): [v48.AccountId32, bigint, bigint, (bigint | undefined)] {
    deprecateLatest()
    return this.asV48
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

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV48
  }

  get asLatest(): [v48.AccountId32, v48.AccountId32, bigint, bigint, bigint] {
    deprecateLatest()
    return this.asV48
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

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV48
  }

  get asLatest(): {owner: v48.AccountId32, classId: bigint, classType: v48.ClassType, metadata: Uint8Array} {
    deprecateLatest()
    return this.asV48
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

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV48
  }

  get asLatest(): {owner: v48.AccountId32, classId: bigint, instanceId: bigint, metadata: Uint8Array} {
    deprecateLatest()
    return this.asV48
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
