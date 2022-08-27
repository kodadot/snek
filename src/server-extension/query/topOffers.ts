export const topOffers = `SELECT
    ne.id as id,
    ne.name as name,
    ce.name as collection_name,
    ce.id as collection_id,
    o.total_amount as total_amount,
    o.total_count as total_count,
    o.latest_offer_timestamp as latest_offer_timestamp
FROM (select nft_id, count(id) as total_count, sum(price) as total_amount, max(created_at) as latest_offer_timestamp from offer GROUP BY nft_id) o
    LEFT JOIN nft_entity ne on o.nft_id = ne.id
    LEFT JOIN collection_entity ce on ne.collection_id = ce.id
;
`;
