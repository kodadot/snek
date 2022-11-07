import { Arg, Query, Resolver } from 'type-graphql';
import type { EntityManager } from 'typeorm';
import { handleMetadata } from '../../mappings';
import { NFTEntity } from '../../model/generated';
import { URIEntity } from '../model/metadata.model';
import { missingMetadata } from '../query/metadata';
import { getStore, makeQuery } from '../utils';

enum Task {
  REFETCH = 'REFETCH',
}

@Resolver()
export class SquidVMResolver {
  constructor(private tx: () => Promise<EntityManager>) {}

  @Query(() => Number)
  async squidVM(
    @Arg('interaction', { nullable: true, defaultValue: Task.REFETCH }) interaction: Task,
    @Arg('limit', { nullable: true, defaultValue: 20 }) limit: number,
    @Arg('key', { nullable: false }) key: string,
  ): Promise<number> {
    switch (interaction) {
      case Task.REFETCH:
        this.isKeyValid(key);
        return this.refetchMetadata(limit);
      default:
        return 0;
    }
  }

  private async refetchMetadata(limit: number): Promise<number> {
    const maxLimit = Math.min(limit, 20); // max 20
    const result: [URIEntity] = await makeQuery(this.tx, NFTEntity, missingMetadata, [maxLimit]);
    const uriList = result.map((r) => r.uri);
    const store = await getStore(this.tx);
    for (const uri of uriList) {
      try {
        const meta = await handleMetadata(uri, store);
      } catch (e) {
        console.error(`Error while fetching metadata for ${uri}`, e);
      }
    }
    // TODO: call squidvm to refetch metadata
    return result.length;
  }

  private isKeyValid(key: string): boolean {
    return key === 'ADMIN_KEY';
  }
}
