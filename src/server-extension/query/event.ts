export const lastEventQuery = `SELECT
    DISTINCT ne.id as id,
    COALESCE (ne.name, me.name, '') as name,
    ne.issuer as issuer,
    ne.metadata as metadata,
    e.current_owner,
    me.image as image,
    me.animation_url,
    MAX(e.timestamp) as timestamp,
    MAX(e.meta) as value,
    ne.collection_id as collection_id,
    ce.name as collection_name

FROM event e
    JOIN nft_entity ne on e.nft_id = ne.id
    LEFT join metadata_entity me on me.id = ne.metadata
    LEFT JOIN collection_entity ce on ne.collection_id = ce.id
WHERE
    e.interaction = $1
    AND ne.burned = false
GROUP BY ne.id, me.id, e.current_owner, me.image, ce.name
ORDER BY MAX(e.timestamp) DESC
LIMIT $2 OFFSET $3`;
