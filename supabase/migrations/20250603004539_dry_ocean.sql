/*
  # Academic Core Course Management System

  1. Tables
    - admin_users: Tracks users with administrative privileges
    - courses: Stores all academic course information
      - id (uuid, primary key)
      - title (text)
      - level (100/200/300)
      - category (ACC/SCI/SSC/HUM)
      - semester (1/2)
      - is_intensive (boolean)
      - cross_listings (text array)
      - timestamps

  2. Security
    - RLS enabled on both tables
    - Public read access for courses
    - Admin-only write access for courses
    - Admin table protected
*/

-- Create admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Only allow admins to manage other admins
CREATE POLICY "Only admins can view admin list"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Only admins can insert admins"
  ON admin_users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (SELECT user_id FROM admin_users));

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  level smallint NOT NULL CHECK (level IN (100, 200, 300)),
  category text NOT NULL CHECK (category IN ('ACC', 'SCI', 'SSC', 'HUM')),
  semester smallint NOT NULL CHECK (semester IN (1, 2)),
  is_intensive boolean NOT NULL DEFAULT false,
  cross_listings text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Courses are viewable by everyone" 
  ON courses
  FOR SELECT 
  USING (true);

CREATE POLICY "Only admins can insert courses"
  ON courses
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (
    SELECT user_id FROM admin_users
  ));

CREATE POLICY "Only admins can update courses"
  ON courses
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (
    SELECT user_id FROM admin_users
  ));

-- Insert Academic Core courses
INSERT INTO courses (title, level, category, semester, cross_listings) VALUES
-- 100-level courses
('Logic Information Argumentation', 100, 'ACC', 1, NULL),
('Programming Your World', 100, 'ACC', 1, NULL),
('Intermediate Programming Principles & Practice', 100, 'ACC', 1, NULL),
('Programming in Digital Societies', 100, 'ACC', 1, NULL),
('Calculus', 100, 'ACC', 1, NULL),
('Methods in Life and Earth Sciences', 100, 'ACC', 1, NULL),
('Linear Algebra', 100, 'ACC', 1, NULL),
('Statistics for Sciences', 100, 'ACC', 1, NULL),
('Mathematical Methods for Economics', 100, 'ACC', 1, NULL),
('Methods for Social Sciences Research', 100, 'ACC', 1, NULL),
('Methods in the Humanities 1', 100, 'ACC', 1, NULL),
('Academic Writing Skills', 100, 'ACC', 1, NULL),
('Global Identity Experience', 100, 'ACC', 1, NULL),
('Dutch 1a Language and Culture', 100, 'ACC', 1, NULL),
('Dutch 1b Language and Culture', 100, 'ACC', 2, NULL),
('Spanish 1 Language and Culture', 100, 'ACC', 1, NULL),
('Arabic 1 Language and Culture', 100, 'ACC', 1, NULL),
('Chinese 1 Language and Culture', 100, 'ACC', 1, NULL),

-- 200-level courses
('Statistical Methods for Social Sciences Research', 200, 'ACC', 1, ARRAY['SSC']),
('Qualitative Research Methods', 200, 'ACC', 1, NULL),
('Methods in the Humanities 2', 200, 'ACC', 1, NULL),
('Advanced Research Writing', 200, 'ACC', 1, NULL),
('Dutch 2 Language and Culture', 200, 'ACC', 1, NULL),
('Spanish 2 Language and Culture', 200, 'ACC', 1, NULL),
('Arabic 2 Language and Culture', 200, 'ACC', 1, NULL),
('Chinese 2 Language and Culture', 200, 'ACC', 1, NULL),
('Big Questions in Artificial Intelligence & Data', 200, 'ACC', 2, NULL),
('Big Questions in Anthropocene', 200, 'ACC', 2, NULL),
('Big Questions in Bioethics', 200, 'ACC', 2, NULL),
('Big Questions in Consciousness', 200, 'ACC', 2, NULL),
('Big Questions in Environment', 200, 'ACC', 2, NULL),
('Big Questions in Language Power & Disempowerment', 200, 'ACC', 2, NULL),
('Big Questions in Senses', 200, 'ACC', 2, NULL),
('Big Questions in Time', 200, 'ACC', 2, NULL),

-- 300-level courses
('Advanced Research Methods and Statistics', 300, 'ACC', 1, NULL),
('Dutch 3 Language and Culture', 300, 'ACC', 1, NULL),
('Spanish 3 Language and Culture', 300, 'ACC', 1, NULL),
('Capstone', 300, 'ACC', 2, NULL),
('Community Project and Internship', 300, 'ACC', 2, NULL);