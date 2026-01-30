UPDATE module m
JOIN (
  SELECT id,
         ROW_NUMBER() OVER (ORDER BY createdAt) AS new_order
  FROM module
) o ON o.id = m.id
SET m.order = o.new_order;
