/*
  # Add Forum functionality
  
  1. New Tables
    - forum_posts: Stores main forum posts/questions
      - id (uuid, primary key)
      - title (text)
      - content (text)
      - user_id (uuid, references auth.users)
      - created_at (timestamptz)
      - updated_at (timestamptz)
      - course_id (uuid, optional reference to courses)
    
    - forum_replies: Stores replies to forum posts
      - id (uuid, primary key)
      - post_id (uuid, references forum_posts)
      - content (text)
      - user_id (uuid, references auth.users)
      - created_at (timestamptz)
      - updated_at (timestamptz)
  
  2. Security
    - Enable RLS on both tables
    - Anyone can read posts and replies
    - Only authenticated users can create posts and replies
    - Users can only edit/delete their own content
*/

-- Create forum_posts table
CREATE TABLE forum_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES new_courses(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create forum_replies table
CREATE TABLE forum_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES forum_posts(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_replies ENABLE ROW LEVEL SECURITY;

-- Policies for forum_posts
CREATE POLICY "Anyone can view forum posts"
  ON forum_posts FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create forum posts"
  ON forum_posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update their own posts"
  ON forum_posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts"
  ON forum_posts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for forum_replies
CREATE POLICY "Anyone can view forum replies"
  ON forum_replies FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create replies"
  ON forum_replies FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update their own replies"
  ON forum_replies FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own replies"
  ON forum_replies FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);