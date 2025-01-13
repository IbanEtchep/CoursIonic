CREATE TABLE todos (
                       id BIGINT PRIMARY KEY,
                       title TEXT NOT NULL,
                       description TEXT,
                       completed BOOLEAN DEFAULT false,
                       due_date TIMESTAMP WITH TIME ZONE,
                       user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
                       created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own todos"
    ON todos FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own todos"
    ON todos FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own todos"
    ON todos FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own todos"
    ON todos FOR DELETE
USING (auth.uid() = user_id);

CREATE INDEX todos_user_id_idx ON todos(user_id);
