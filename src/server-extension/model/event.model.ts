import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class LastEventEntity {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  issuer!: string;

  @Field(() => Date, { nullable: false })
  timestamp!: Date;

  @Field(() => String, { nullable: false })
  metadata!: string;

  @Field(() => String, { nullable: false })
  value!: string;

  @Field(() => String, { nullable: false, name: 'currentOwner' })
  current_owner!: string;

  @Field(() => String, { nullable: true })
  image!: string;

  @Field(() => String, {nullable: true, name: 'animationUrl'})
  animation_url!: string | undefined | null

  constructor(props: Partial<LastEventEntity>) {
    Object.assign(this, props);
  }
}
