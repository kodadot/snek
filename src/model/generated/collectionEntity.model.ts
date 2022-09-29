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

  @Column_("timestamp with time zone", {nullable: false})
  createdAt!: Date

  @Column_("text", {nullable: false})
  currentOwner!: string

  @Column_("bool", {nullable: false})
  burned!: boolean

  @OneToMany_(() => CollectionEvent, e => e.collection)
  events!: CollectionEvent[]

  @Column_("text", {nullable: false})
  issuer!: string

  @Index_()
  @ManyToOne_(() => MetadataEntity, {nullable: true})
  meta!: MetadataEntity | undefined | null

  @Column_("text", {nullable: true})
  metadata!: string | undefined | null

  @Index_()
  @Column_("text", {nullable: true})
  name!: string | undefined | null

  @OneToMany_(() => NFTEntity, e => e.collection)
  nfts!: NFTEntity[]

  @Column_("timestamp with time zone", {nullable: false})
  updatedAt!: Date

  @Column_("varchar", {length: 15, nullable: false})
  type!: CollectionType

  @Column_("int4", {nullable: false})
  totalItems!: number

  @Column_("int4", {nullable: false})
  totalAvailableItems!: number
}
