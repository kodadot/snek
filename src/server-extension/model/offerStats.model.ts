import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class OfferStats {
  @Field(() => String, { nullable: false, name: "status" })
  status!: string;

  @Field(() => Number, { nullable: false, name: "totalCount" })
  total_count!: number;

  @Field(() => BigInt, { nullable: false, name: "totalPrice" })
  total_price!: bigint;
  //constructor
  constructor(props: Partial<OfferStats>) {
    Object.assign(this, props);
  }
}
