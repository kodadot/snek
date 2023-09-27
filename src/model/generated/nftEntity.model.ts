import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {CollectionEntity} from "./collectionEntity.model"
import {Event} from "./event.model"
import {Offer} from "./offer.model"
import {MetadataEntity} from "./metadataEntity.model"

@Entity_()
export class NFTEntity {
    constructor(props?: Partial<NFTEntity>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    blockNumber!: bigint | undefined | null

    @Column_("bool", {nullable: false})
    burned!: boolean

    @Index_()
    @ManyToOne_(() => CollectionEntity, {nullable: true})
    collection!: CollectionEntity

    @Column_("timestamp with time zone", {nullable: false})
    createdAt!: Date

    @Index_()
    @Column_("text", {nullable: false})
    currentOwner!: string

    @OneToMany_(() => Event, e => e.nft)
    events!: Event[]

    @OneToMany_(() => Offer, e => e.nft)
    offers!: Offer[]

    @Index_()
    @Column_("text", {nullable: false})
    hash!: string

    @Column_("text", {nullable: true})
    image!: string | undefined | null

    @Column_("text", {nullable: false})
    issuer!: string

    @Column_("bool", {nullable: false})
    lewd!: boolean

    @Index_()
    @ManyToOne_(() => MetadataEntity, {nullable: true})
    meta!: MetadataEntity | undefined | null

    @Column_("text", {nullable: true})
    media!: string | undefined | null

    @Column_("text", {nullable: true})
    metadata!: string | undefined | null

    @Index_()
    @Column_("text", {nullable: true})
    name!: string | undefined | null

    @Index_()
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    price!: bigint | undefined | null

    @Column_("numeric", {transformer: marshal.floatTransformer, nullable: true})
    royalty!: number | undefined | null

    @Column_("text", {nullable: true})
    recipient!: string | undefined | null

    @Index_()
    @Column_("text", {nullable: false})
    sn!: string

    @Index_()
    @Column_("timestamp with time zone", {nullable: false})
    updatedAt!: Date
}
