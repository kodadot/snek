import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {CollectionEvent} from "./collectionEvent.model"
import {MetadataEntity} from "./metadataEntity.model"
import {NFTEntity} from "./nftEntity.model"
import {CollectionType} from "./_collectionType"

@Entity_()
export class CollectionEntity {
    constructor(props?: Partial<CollectionEntity>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    blockNumber!: bigint | undefined | null

    @Column_("bool", {nullable: false})
    burned!: boolean

    @Column_("timestamp with time zone", {nullable: false})
    createdAt!: Date

    @Column_("text", {nullable: false})
    currentOwner!: string

    @Column_("int4", {nullable: false})
    distribution!: number

    @OneToMany_(() => CollectionEvent, e => e.collection)
    events!: CollectionEvent[]

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    floor!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    highestSale!: bigint

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
    metadata!: string | undefined | null

    @Column_("text", {nullable: true})
    media!: string | undefined | null

    @Index_()
    @Column_("text", {nullable: true})
    name!: string | undefined | null

    @OneToMany_(() => NFTEntity, e => e.collection)
    nfts!: NFTEntity[]

    @Column_("int4", {nullable: false})
    ownerCount!: number

    @Column_("timestamp with time zone", {nullable: false})
    updatedAt!: Date

    @Column_("int4", {nullable: false})
    nftCount!: number

    @Column_("int4", {nullable: false})
    supply!: number

    @Column_("varchar", {length: 15, nullable: false})
    type!: CollectionType

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    volume!: bigint
}
