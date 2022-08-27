import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class TopOffers {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: true})
  name!: string;

  @Field(() => String, { nullable: false, name: 'collectionId' })
  collection_id!: string;

  @Field(() => String, { nullable: true, name: 'collectionName' })
  collection_name!: string;

  @Field(() => Number, { nullable: false, name: 'totalCount' })
  total_count!: number;

  @Field(() => Number, { nullable: false, name: 'totalAmount' })
  total_amount!: number;

  @Field(() => Date, { nullable: false })
  latest_offer_timestamp!: Date;

  // constructor
  constructor(props: Partial<TopOffers>) {
    Object.assign(this, props);
  }
}
