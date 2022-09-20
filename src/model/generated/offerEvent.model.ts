import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {OfferInteraction} from "./_offerInteraction"
import {Offer} from "./offer.model"

@Entity_()
export class OfferEvent {
  constructor(props?: Partial<OfferEvent>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
  blockNumber!: bigint | undefined | null

  @Column_("text", {nullable: false})
  caller!: string

  @Column_("text", {nullable: true})
  currentOwner!: string | undefined | null

  @Column_("varchar", {length: 6, nullable: false})
  interaction!: OfferInteraction

  @Column_("text", {nullable: false})
  meta!: string

  @Index_()
  @ManyToOne_(() => Offer, {nullable: true})
  offer!: Offer

  @Column_("timestamp with time zone", {nullable: false})
  timestamp!: Date
}
