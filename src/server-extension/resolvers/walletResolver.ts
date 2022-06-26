import { Query, Resolver } from 'type-graphql';
import type { EntityManager } from 'typeorm';
import { activeWallets } from '../query/activeWallets';
import { Event } from '../../model';
import { makeQuery } from '../utils';
import { CountEntity } from '../model/count.model';

@Resolver()
export class WalletResolver {
  constructor(private tx: () => Promise<EntityManager>) {}

  @Query(() => [CountEntity])
  async activeWallets(): Promise<CountEntity[]> {
    const result: CountEntity[] = await makeQuery(
      this.tx,
      Event,
      activeWallets,
    );
    return result;
  }
}
