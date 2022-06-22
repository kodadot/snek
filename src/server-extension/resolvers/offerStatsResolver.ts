import { Query, Resolver } from "type-graphql";
import type { EntityManager } from "typeorm";
import { Event } from "../../model";
import { makeQuery } from "../utils";
import { offerStats } from "../query/offerStats";
import { OfferStats } from "../model/offerStats.model";

@Resolver()
export class OfferStatsResolver {
  constructor (private tx: () => Promise<EntityManager>) {}

  @Query(() => [OfferStats])
  async offerStats(): Promise<OfferStats[]> {
    const result: OfferStats[] = await makeQuery(
      this.tx,
      Event,
      offerStats
    );
    console.log(result)
    return result;
  }
}
