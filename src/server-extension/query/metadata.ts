export const missingMetadata = `
    SELECT distinct ne.metadata as uri
    FROM nft_entity ne
    WHERE ne.meta_id IS NULL
    AND ne.metadata IS NOT NULL;`;

export const updateMissingMetadata = `
    UPDATE nft_entity ne
    SET meta_id = me.id
    FROM metadata_entity me
    WHERE ne.metadata = me.id`;