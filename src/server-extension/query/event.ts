export const lastEventQuery = `SELECT
    DISTINCT ne.id as id,
    COALESCE (ne.name, me.name, '') as name,
    ne.issuer as issuer,
    ne.metadata as metadata,
    e.current_owner,
    me.image as image,
    me.animation_url,
    MAX(e.timestamp) as timestamp,
    MAX(e.meta) as value

FROM event e
    JOIN nft_entity ne on e.nft_id = ne.id
    LEFT join metadata_entity me on me.id = ne.metadata
WHERE
    e.interaction = $1
    AND ne.burned = false
GROUP BY ne.id, me.id, e.current_owner, me.image
ORDER BY MAX(e.timestamp) DESC
LIMIT $2 OFFSET $3`


export const collectionEventHistory = (idList: string, dateRange: string) => `SELECT
	ce.id as id,
	DATE(e.timestamp),
	count(e)
FROM nft_entity ne
JOIN collection_entity ce on ce.id = ne.collection_id
JOIN event e on e.nft_id = ne.id
WHERE e.interaction = 'BUY'
and ce.id in (${idList})
${dateRange}
GROUP BY ce.id, DATE(e.timestamp)
ORDER BY DATE(e.timestamp)`