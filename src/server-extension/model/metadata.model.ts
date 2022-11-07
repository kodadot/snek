import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class URIEntity {
  @Field(() => String, { nullable: true })
  uri!: string;

  constructor(uri: string) {
    this.uri = uri;
  }
}
