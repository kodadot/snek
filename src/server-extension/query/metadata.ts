export const missingMetadata = `
    SELECT distinct ne.metadata as uri
    FROM nft_entity ne
    WHERE ne.meta_id IS NULL
    AND ne.metadata IS NOT NULL;`;
