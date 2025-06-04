/*
  # Add Likes System for Forum Posts
  
  1. New Tables
    - forum_post_likes: Track likes on forum posts
      - id (uuid)
      - post_id (uuid, references forum_posts)
      - user_id (uuid, references profiles)
      - created_at (timestamptz)

  2. Security
    - Enable RLS
    - Public read access
    - Authenticated users can like/unlike
*/

-- Create forum post likes table
CREATE TABLE IF NOT EXISTS forum_post_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES forum_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(post_id, user_id)
);

-- Enable RLS
ALTER TABLE forum_post_likes ENABLE ROW LEVEL SECURITY;

-- Policies for likes
CREATE POLICY "Anyone can view likes"
  ON forum_post_likes FOR SELECT USING (true);

CREATE POLICY "Authenticated users can like posts"
  ON forum_post_likes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike (delete) their own likes"
  ON forum_post_likes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Add likes count to forum posts query
CREATE OR REPLACE VIEW forum_posts_with_stats AS
SELECT 
  p.*,
  COALESCE(
    (SELECT COUNT(*) FROM forum_post_likes l WHERE l.post_id = p.id),
    0
  ) as likes,
  COALESCE(
    (SELECT COUNT(*) FROM forum_replies r WHERE r.post_id = p.id),
    0
  ) as reply_count
FROM forum_posts p;