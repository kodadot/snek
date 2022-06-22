export const offerStats = `
    SELECT status,
           COUNT(o.id)  as total_count,
           SUM(o.price) as total_price
    FROM offer o
    GROUP BY o.status;
`;
