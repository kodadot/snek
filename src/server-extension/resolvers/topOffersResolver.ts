import { Query, Resolver } from 'type-graphql';
import type { EntityManager } from 'typeorm';
import { Event } from '../../model';
import { makeQuery } from '../utils';
import { topOffers } from '../query/topOffers';
import { TopOffers } from '../model/topOffers.model';

@Resolver()
export class TopOffersResolver {
  constructor(private tx: () => Promise<EntityManager>) {}

  @Query(() => [TopOffers])
  async topOffers(): Promise<TopOffers[]> {
    const result: TopOffers[] = await makeQuery(
      this.tx,
      Event,
      topOffers,
    );
    return result;
  }
}
