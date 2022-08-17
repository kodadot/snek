export const totalNftsByCollectionIdQuery = `SELECT COUNT(ne.*) as totalNfts
FROM nft_entity ne
WHERE collection_id = $1
AND ne.burned = false;`
