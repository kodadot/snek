import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {OfferEvent} from "./offerEvent.model"
import {NFTEntity} from "./nftEntity.model"
import {OfferStatus} from "./_offerStatus"

@Entity_()
export class Offer {
    constructor(props?: Partial<Offer>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    blockNumber!: bigint

    @Column_("text", {nullable: false})
    caller!: string

    @Column_("timestamp with time zone", {nullable: false})
    createdAt!: Date

    @OneToMany_(() => OfferEvent, e => e.offer)
    events!: OfferEvent[]

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    expiration!: bigint

    @Index_()
    @ManyToOne_(() => NFTEntity, {nullable: true})
    nft!: NFTEntity

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    price!: bigint

    @Column_("varchar", {length: 9, nullable: false})
    status!: OfferStatus

    @Column_("timestamp with time zone", {nullable: true})
    updatedAt!: Date | undefined | null
}
