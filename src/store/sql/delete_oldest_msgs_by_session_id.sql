DELETE FROM chat_memory
WHERE id IN (
    SELECT id FROM (
        SELECT id,
               ROW_NUMBER() OVER (PARTITION BY session_id ORDER BY id DESC) AS row_num
        FROM chat_memory
    ) sub
    WHERE sub.row_num > $2
);
