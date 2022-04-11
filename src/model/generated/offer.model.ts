import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {NFTEntity} from "./nftEntity.model"

@Entity_()
export class Offer {
  constructor(props?: Partial<Offer>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("text", {nullable: false})
  caller!: string

  @Index_()
  @ManyToOne_(() => NFTEntity, {nullable: false})
  nft!: NFTEntity

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  blockNumber!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  expiration!: bigint

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
  price!: bigint
}
