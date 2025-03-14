DELETE FROM messages
WHERE id NOT IN (
    SELECT id 
    FROM messages 
    WHERE session_id = $1
    ORDER BY id DESC
    LIMIT $2
);
