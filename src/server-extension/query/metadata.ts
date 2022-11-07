export const emptyMetadata = `
    SELECT distinct metadata
    FROM nft_entity ne
    WHERE ne.meta_id IS NULL;`;
