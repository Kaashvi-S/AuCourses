/*
  # Add foreign key constraint to forum_posts table

  1. Changes
    - Add foreign key constraint between forum_posts.user_id and profiles.id
    - This enables proper joins between forum posts and user profiles

  2. Security
    - No changes to RLS policies
*/

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.table_constraints 
    WHERE constraint_name = 'forum_posts_user_id_fkey'
  ) THEN
    ALTER TABLE forum_posts
    ADD CONSTRAINT forum_posts_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES profiles(id)
    ON DELETE CASCADE;
  END IF;
END $$;