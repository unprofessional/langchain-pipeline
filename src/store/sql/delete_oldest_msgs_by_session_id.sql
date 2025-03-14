DELETE FROM chat_memory
WHERE id NOT IN (
    SELECT id 
    FROM chat_memory 
    WHERE session_id = $1
    ORDER BY id DESC
    LIMIT $2
);
