import assert from 'assert'
import {Chain, ChainContext, EventContext, Event, Result, Option} from './support'
import * as v16 from './v16'
import * as v25 from './v25'
import * as v38 from './v38'
import * as v43 from './v43'
import * as v55 from './v55'
import * as v65 from './v65'
import * as v71 from './v71'

export class AssetRegistryMetadataSetEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'AssetRegistry.MetadataSet')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   *  Metadata set for an asset. \[asset_id, symbol, decimals\]
   */
  get isV16(): boolean {
    return this._chain.getEventHash('AssetRegistry.MetadataSet') === 'cad7da1bfdc997e45555af3932618a9edaf0bdcedd143aba212bd33a734a2ff9'
  }

  /**
   *  Metadata set for an asset. \[asset_id, symbol, decimals\]
   */
  get asV16(): [number, Uint8Array, number] {
    assert(this.isV16)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Metadata set for an asset.
   */
  get isV55(): boolean {
    return this._chain.getEventHash('AssetRegistry.MetadataSet') === '5733a2ab6f544e91ef9651644e4a8f3fc7257fa3a961ba51dd1f0c862b7a7a0a'
  }

  /**
   * Metadata set for an asset.
   */
  get asV55(): {assetId: number, symbol: Uint8Array, decimals: number} {
    assert(this.isV55)
    return this._chain.decodeEvent(this.event)
  }
}

export class AssetRegistryRegisteredEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'AssetRegistry.Registered')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   *  Asset was registered. \[asset_id, name, type\]
   */
  get isV16(): boolean {
    return this._chain.getEventHash('AssetRegistry.Registered') === 'baaca4ca65e3a329f2bd4da1bb290a37ffe550080fa6f022db8adef5413812c2'
  }

  /**
   *  Asset was registered. \[asset_id, name, type\]
   */
  get asV16(): [number, Uint8Array, v16.AssetType] {
    assert(this.isV16)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Asset was registered. \[asset_id, name, type\]
   */
  get isV25(): boolean {
    return this._chain.getEventHash('AssetRegistry.Registered') === '510495ed7e324b369098067e61ab7fafe595b625beb491dd78b4bef707e70be0'
  }

  /**
   * Asset was registered. \[asset_id, name, type\]
   */
  get asV25(): [number, Uint8Array, v25.AssetType] {
    assert(this.isV25)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Asset was registered.
   */
  get isV55(): boolean {
    return this._chain.getEventHash('AssetRegistry.Registered') === '630ef237faec740bf89f2ba6fec4038447ad86f6dfd1d9b5df4dcfdd30d82d78'
  }

  /**
   * Asset was registered.
   */
  get asV55(): {assetId: number, assetName: Uint8Array, assetType: v55.AssetType} {
    assert(this.isV55)
    return this._chain.decodeEvent(this.event)
  }
}

export class AssetRegistryUpdatedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'AssetRegistry.Updated')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   *  Asset was updated. \[asset_id, name, type\]
   */
  get isV16(): boolean {
    return this._chain.getEventHash('AssetRegistry.Updated') === 'baaca4ca65e3a329f2bd4da1bb290a37ffe550080fa6f022db8adef5413812c2'
  }

  /**
   *  Asset was updated. \[asset_id, name, type\]
   */
  get asV16(): [number, Uint8Array, v16.AssetType] {
    assert(this.isV16)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Asset was updated. \[asset_id, name, type\]
   */
  get isV25(): boolean {
    return this._chain.getEventHash('AssetRegistry.Updated') === '510495ed7e324b369098067e61ab7fafe595b625beb491dd78b4bef707e70be0'
  }

  /**
   * Asset was updated. \[asset_id, name, type\]
   */
  get asV25(): [number, Uint8Array, v25.AssetType] {
    assert(this.isV25)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Asset was updated.
   */
  get isV55(): boolean {
    return this._chain.getEventHash('AssetRegistry.Updated') === '630ef237faec740bf89f2ba6fec4038447ad86f6dfd1d9b5df4dcfdd30d82d78'
  }

  /**
   * Asset was updated.
   */
  get asV55(): {assetId: number, assetName: Uint8Array, assetType: v55.AssetType} {
    assert(this.isV55)
    return this._chain.decodeEvent(this.event)
  }
}

export class MarketplaceOfferAcceptedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Marketplace.OfferAccepted')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Offer was accepted \[sender, class_id, instance_id\]
   */
  get isV43(): boolean {
    return this._chain.getEventHash('Marketplace.OfferAccepted') === '426271b0ff71255c125e9a4ea897d86d39682c8454bbff4c6c9a8d50e0d966a4'
  }

  /**
   * Offer was accepted \[sender, class_id, instance_id\]
   */
  get asV43(): [Uint8Array, bigint, bigint, bigint] {
    assert(this.isV43)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Offer was accepted
   */
  get isV55(): boolean {
    return this._chain.getEventHash('Marketplace.OfferAccepted') === '809213614dd888d0b0df83a1b4bb816a4bb8f7d702f40d7145c4c9532e70508e'
  }

  /**
   * Offer was accepted
   */
  get asV55(): {who: Uint8Array, class: bigint, instance: bigint, amount: bigint} {
    assert(this.isV55)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Offer was accepted
   */
  get isV65(): boolean {
    return this._chain.getEventHash('Marketplace.OfferAccepted') === 'f0c64969aa0bb38598d60ee40e1c6befae4abc5b1835302ebc1b957c05eb0c42'
  }

  /**
   * Offer was accepted
   */
  get asV65(): {who: Uint8Array, class: bigint, instance: bigint, amount: bigint, maker: Uint8Array} {
    assert(this.isV65)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Offer was accepted
   */
  get isV81(): boolean {
    return this._chain.getEventHash('Marketplace.OfferAccepted') === 'eae1197c912d392e55b9ac86f19cb7e8165cdb1100c1b0b20af7b1fb67cef1ca'
  }

  /**
   * Offer was accepted
   */
  get asV81(): {who: Uint8Array, collection: bigint, item: bigint, amount: bigint, maker: Uint8Array} {
    assert(this.isV81)
    return this._chain.decodeEvent(this.event)
  }
}

export class MarketplaceOfferPlacedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Marketplace.OfferPlaced')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Offer was placed on a token \[offerer, class_id, instance_id, price, expires\]
   */
  get isV43(): boolean {
    return this._chain.getEventHash('Marketplace.OfferPlaced') === '0c0020b8a59f4c44bfafff6516e075c67efa07d49d2257040c27bd47de251831'
  }

  /**
   * Offer was placed on a token \[offerer, class_id, instance_id, price, expires\]
   */
  get asV43(): [Uint8Array, bigint, bigint, bigint, number] {
    assert(this.isV43)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Offer was placed on a token
   */
  get isV55(): boolean {
    return this._chain.getEventHash('Marketplace.OfferPlaced') === 'e16435d4410d4a6b6ffce5b4169856dae7831e563e44572ff395cd265d9d64d1'
  }

  /**
   * Offer was placed on a token
   */
  get asV55(): {who: Uint8Array, class: bigint, instance: bigint, amount: bigint, expires: number} {
    assert(this.isV55)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Offer was placed on a token
   */
  get isV81(): boolean {
    return this._chain.getEventHash('Marketplace.OfferPlaced') === '98823704ea62ccb131ec6305a396c309c632f68d2ea4d6706a8185e4d195314c'
  }

  /**
   * Offer was placed on a token
   */
  get asV81(): {who: Uint8Array, collection: bigint, item: bigint, amount: bigint, expires: number} {
    assert(this.isV81)
    return this._chain.decodeEvent(this.event)
  }
}

export class MarketplaceOfferWithdrawnEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Marketplace.OfferWithdrawn')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Offer was withdrawn \[sender, class_id, instance_id\]
   */
  get isV43(): boolean {
    return this._chain.getEventHash('Marketplace.OfferWithdrawn') === '0f263bfdefa394edfb38d20d33662423a2e0902235b599f9b2b0292f157f0902'
  }

  /**
   * Offer was withdrawn \[sender, class_id, instance_id\]
   */
  get asV43(): [Uint8Array, bigint, bigint] {
    assert(this.isV43)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Offer was withdrawn
   */
  get isV55(): boolean {
    return this._chain.getEventHash('Marketplace.OfferWithdrawn') === '669141c2bfed250cfd51ec61736d5b23f65d22716737b27cfa84f9a287f1412f'
  }

  /**
   * Offer was withdrawn
   */
  get asV55(): {who: Uint8Array, class: bigint, instance: bigint} {
    assert(this.isV55)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Offer was withdrawn
   */
  get isV81(): boolean {
    return this._chain.getEventHash('Marketplace.OfferWithdrawn') === 'ee93cc05328a6d2834c0a788c41b829d2a6b45200ac9477bdd40eca698e8e0ef'
  }

  /**
   * Offer was withdrawn
   */
  get asV81(): {who: Uint8Array, collection: bigint, item: bigint} {
    assert(this.isV81)
    return this._chain.decodeEvent(this.event)
  }
}

export class MarketplaceRoyaltyAddedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Marketplace.RoyaltyAdded')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Marketplace data has been added \[class_type, sender, class_id, instance_id\]
   */
  get isV43(): boolean {
    return this._chain.getEventHash('Marketplace.RoyaltyAdded') === 'b25c5b1351882b8049f26b3ffe8318b0c04beabe7f3b1174b983af490abf68f7'
  }

  /**
   * Marketplace data has been added \[class_type, sender, class_id, instance_id\]
   */
  get asV43(): [bigint, bigint, Uint8Array, number] {
    assert(this.isV43)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Marketplace data has been added
   */
  get isV55(): boolean {
    return this._chain.getEventHash('Marketplace.RoyaltyAdded') === 'f0b773a6ad41ebc0b1145b9a33782c7e6ea900db44e465cd5ee41e90a342ce57'
  }

  /**
   * Marketplace data has been added
   */
  get asV55(): {class: bigint, instance: bigint, author: Uint8Array, royalty: number} {
    assert(this.isV55)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Marketplace data has been added
   */
  get isV76(): boolean {
    return this._chain.getEventHash('Marketplace.RoyaltyAdded') === '18115ec476316fefe14576ec64313da7708cf5ff92d25bca21c7cb2e50a12098'
  }

  /**
   * Marketplace data has been added
   */
  get asV76(): {class: bigint, instance: bigint, author: Uint8Array, royalty: number} {
    assert(this.isV76)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Marketplace data has been added
   */
  get isV81(): boolean {
    return this._chain.getEventHash('Marketplace.RoyaltyAdded') === '5e4ab73965bd5a972b14b44fef4552c644677f7e2a0973c09c185dc3cbe68566'
  }

  /**
   * Marketplace data has been added
   */
  get asV81(): {collection: bigint, item: bigint, author: Uint8Array, royalty: number} {
    assert(this.isV81)
    return this._chain.decodeEvent(this.event)
  }
}

export class MarketplaceRoyaltyPaidEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Marketplace.RoyaltyPaid')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Royalty hs been paid to the author \[class_id, instance_id, author, royalty, royalty_amount\]
   */
  get isV43(): boolean {
    return this._chain.getEventHash('Marketplace.RoyaltyPaid') === '82293205d464a489606def2289dde2ad7444a78cb3ae19f599a2160d68a0b720'
  }

  /**
   * Royalty hs been paid to the author \[class_id, instance_id, author, royalty, royalty_amount\]
   */
  get asV43(): [bigint, bigint, Uint8Array, number, bigint] {
    assert(this.isV43)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Royalty hs been paid to the author
   */
  get isV55(): boolean {
    return this._chain.getEventHash('Marketplace.RoyaltyPaid') === '3f9760ce8b8d78244eecfd769b57213a52326480392d53bcbaef555fda8245b2'
  }

  /**
   * Royalty hs been paid to the author
   */
  get asV55(): {class: bigint, instance: bigint, author: Uint8Array, royalty: number, royaltyAmount: bigint} {
    assert(this.isV55)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Royalty hs been paid to the author
   */
  get isV76(): boolean {
    return this._chain.getEventHash('Marketplace.RoyaltyPaid') === 'c299a673e7fd4c339f13007a754569929c4cf22b3f425157c44da6cb3ede4136'
  }

  /**
   * Royalty hs been paid to the author
   */
  get asV76(): {class: bigint, instance: bigint, author: Uint8Array, royalty: number, royaltyAmount: bigint} {
    assert(this.isV76)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Royalty hs been paid to the author
   */
  get isV81(): boolean {
    return this._chain.getEventHash('Marketplace.RoyaltyPaid') === 'b593f90234c934574d11488293030b10e208d4846d2dbae9219f0445f53a71f3'
  }

  /**
   * Royalty hs been paid to the author
   */
  get asV81(): {collection: bigint, item: bigint, author: Uint8Array, royalty: number, royaltyAmount: bigint} {
    assert(this.isV81)
    return this._chain.decodeEvent(this.event)
  }
}

export class MarketplaceTokenPriceUpdatedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Marketplace.TokenPriceUpdated')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * The price for a token was updated \[owner, class_id, instance_id, price\]
   */
  get isV43(): boolean {
    return this._chain.getEventHash('Marketplace.TokenPriceUpdated') === '4100700286e3b39a636551e9e9872940d3c125d1b8729ac058742455e638fbe2'
  }

  /**
   * The price for a token was updated \[owner, class_id, instance_id, price\]
   */
  get asV43(): [Uint8Array, bigint, bigint, (bigint | undefined)] {
    assert(this.isV43)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * The price for a token was updated
   */
  get isV55(): boolean {
    return this._chain.getEventHash('Marketplace.TokenPriceUpdated') === '36db2c5ce4786a5437e40968bfcb5727b1548bed0fec7d93b771e5f589c2233a'
  }

  /**
   * The price for a token was updated
   */
  get asV55(): {who: Uint8Array, class: bigint, instance: bigint, price: (bigint | undefined)} {
    assert(this.isV55)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * The price for a token was updated
   */
  get isV81(): boolean {
    return this._chain.getEventHash('Marketplace.TokenPriceUpdated') === '3b9bed77760f1818f97f7faecbfdb6f0b7bba944b7fa3c02e85d5e99f26fe81b'
  }

  /**
   * The price for a token was updated
   */
  get asV81(): {who: Uint8Array, collection: bigint, item: bigint, price: (bigint | undefined)} {
    assert(this.isV81)
    return this._chain.decodeEvent(this.event)
  }
}

export class MarketplaceTokenSoldEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Marketplace.TokenSold')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Token was sold to a new owner \[owner, buyer, class_id, instance_id, price\]
   */
  get isV43(): boolean {
    return this._chain.getEventHash('Marketplace.TokenSold') === '4a3bc2182538af0cb911036daeda76c419c2f42491eda8f66b9ca681035507c0'
  }

  /**
   * Token was sold to a new owner \[owner, buyer, class_id, instance_id, price\]
   */
  get asV43(): [Uint8Array, Uint8Array, bigint, bigint, bigint] {
    assert(this.isV43)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Token was sold to a new owner
   */
  get isV55(): boolean {
    return this._chain.getEventHash('Marketplace.TokenSold') === 'c30b6db0fb1c37eb14b31c9148a9b2c3afdbe6f034f90a5f7160a284a8388c46'
  }

  /**
   * Token was sold to a new owner
   */
  get asV55(): {owner: Uint8Array, buyer: Uint8Array, class: bigint, instance: bigint, price: bigint} {
    assert(this.isV55)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * Token was sold to a new owner
   */
  get isV81(): boolean {
    return this._chain.getEventHash('Marketplace.TokenSold') === '7a6d20f671c26f7acbc95164fe57b2fe6785320c0556d8f75673307e477f4f3a'
  }

  /**
   * Token was sold to a new owner
   */
  get asV81(): {owner: Uint8Array, buyer: Uint8Array, collection: bigint, item: bigint, price: bigint} {
    assert(this.isV81)
    return this._chain.decodeEvent(this.event)
  }
}

export class NftClassCreatedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'NFT.ClassCreated')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * A class was created \[owner, class_id, class_type\]
   */
  get isV38(): boolean {
    return this._chain.getEventHash('NFT.ClassCreated') === '7adeb3f2ae9b2b9c39201542a741e44b5484fadd52179e412e45be77a794f225'
  }

  /**
   * A class was created \[owner, class_id, class_type\]
   */
  get asV38(): {owner: Uint8Array, classId: bigint, classType: v38.ClassType} {
    assert(this.isV38)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * A class was created \[owner, class_id, class_type\]
   */
  get isV43(): boolean {
    return this._chain.getEventHash('NFT.ClassCreated') === '964234ae203d3207b740072bc8630eee21c72fe7995f3fc03e62f0bb443cca32'
  }

  /**
   * A class was created \[owner, class_id, class_type\]
   */
  get asV43(): {owner: Uint8Array, classId: bigint, classType: v43.ClassType, metadata: Uint8Array} {
    assert(this.isV43)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * A class was created \[owner, class_id, class_type\]
   */
  get isV65(): boolean {
    return this._chain.getEventHash('NFT.ClassCreated') === '7adeb3f2ae9b2b9c39201542a741e44b5484fadd52179e412e45be77a794f225'
  }

  /**
   * A class was created \[owner, class_id, class_type\]
   */
  get asV65(): {owner: Uint8Array, classId: bigint, classType: v65.ClassType} {
    assert(this.isV65)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * A class was created
   */
  get isV71(): boolean {
    return this._chain.getEventHash('NFT.ClassCreated') === '964234ae203d3207b740072bc8630eee21c72fe7995f3fc03e62f0bb443cca32'
  }

  /**
   * A class was created
   */
  get asV71(): {owner: Uint8Array, classId: bigint, classType: v71.ClassType, metadata: Uint8Array} {
    assert(this.isV71)
    return this._chain.decodeEvent(this.event)
  }
}

export class NftClassDestroyedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'NFT.ClassDestroyed')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * A class was destroyed \[class_id\]
   */
  get isV38(): boolean {
    return this._chain.getEventHash('NFT.ClassDestroyed') === '51309f98603f5eeb2eb07f9373848f1874c4bfaea4a29b0e0d21dd93b98da94a'
  }

  /**
   * A class was destroyed \[class_id\]
   */
  get asV38(): {owner: Uint8Array, classId: bigint} {
    assert(this.isV38)
    return this._chain.decodeEvent(this.event)
  }
}

export class NftInstanceBurnedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'NFT.InstanceBurned')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * An instance was burned \[sender, class_id, instance_id\]
   */
  get isV38(): boolean {
    return this._chain.getEventHash('NFT.InstanceBurned') === 'cbf0740ecac063f0cc91759153cc494f3d948025e716ccd16da079129444cc1d'
  }

  /**
   * An instance was burned \[sender, class_id, instance_id\]
   */
  get asV38(): {owner: Uint8Array, classId: bigint, instanceId: bigint} {
    assert(this.isV38)
    return this._chain.decodeEvent(this.event)
  }
}

export class NftInstanceMintedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'NFT.InstanceMinted')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * An instance was minted \[owner, class_id, instance_id\]
   */
  get isV38(): boolean {
    return this._chain.getEventHash('NFT.InstanceMinted') === 'cbf0740ecac063f0cc91759153cc494f3d948025e716ccd16da079129444cc1d'
  }

  /**
   * An instance was minted \[owner, class_id, instance_id\]
   */
  get asV38(): {owner: Uint8Array, classId: bigint, instanceId: bigint} {
    assert(this.isV38)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * An instance was minted \[owner, class_id, instance_id\]
   */
  get isV43(): boolean {
    return this._chain.getEventHash('NFT.InstanceMinted') === 'eb2d7da6cd031b1051bd4c0ebcbe8cd70b244f54737e21a7f8279dccee6fa006'
  }

  /**
   * An instance was minted \[owner, class_id, instance_id\]
   */
  get asV43(): {owner: Uint8Array, classId: bigint, instanceId: bigint, metadata: Uint8Array} {
    assert(this.isV43)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * An instance was minted \[owner, class_id, instance_id\]
   */
  get isV65(): boolean {
    return this._chain.getEventHash('NFT.InstanceMinted') === 'cbf0740ecac063f0cc91759153cc494f3d948025e716ccd16da079129444cc1d'
  }

  /**
   * An instance was minted \[owner, class_id, instance_id\]
   */
  get asV65(): {owner: Uint8Array, classId: bigint, instanceId: bigint} {
    assert(this.isV65)
    return this._chain.decodeEvent(this.event)
  }

  /**
   * An instance was minted
   */
  get isV71(): boolean {
    return this._chain.getEventHash('NFT.InstanceMinted') === 'eb2d7da6cd031b1051bd4c0ebcbe8cd70b244f54737e21a7f8279dccee6fa006'
  }

  /**
   * An instance was minted
   */
  get asV71(): {owner: Uint8Array, classId: bigint, instanceId: bigint, metadata: Uint8Array} {
    assert(this.isV71)
    return this._chain.decodeEvent(this.event)
  }
}

export class NftInstanceTransferredEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'NFT.InstanceTransferred')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * An instance was transferred \[from, to, class_id, instance_id\]
   */
  get isV38(): boolean {
    return this._chain.getEventHash('NFT.InstanceTransferred') === 'e0a071978a33a540c15a46174c5018087ae648a19419f54dab0cb069ce949563'
  }

  /**
   * An instance was transferred \[from, to, class_id, instance_id\]
   */
  get asV38(): {from: Uint8Array, to: Uint8Array, classId: bigint, instanceId: bigint} {
    assert(this.isV38)
    return this._chain.decodeEvent(this.event)
  }
}
