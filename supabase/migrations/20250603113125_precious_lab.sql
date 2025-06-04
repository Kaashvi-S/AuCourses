/*
  # Academic Catalog Restructure

  1. New Tables
    - majors (id, name, slug, created_at)
    - subfields (id, major_id, name, slug, created_at)
    - courses (id, subfield_id, code, title, ects, description, created_at)

  2. Data Migration
    - Create hierarchical structure for academic programs
    - Migrate existing course data to new structure
    - Set up proper relationships between tables

  3. Security
    - Enable RLS on all tables
    - Set up appropriate access policies
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Courses are viewable by everyone" ON courses;

-- Create majors table
CREATE TABLE IF NOT EXISTS majors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create subfields table
CREATE TABLE IF NOT EXISTS subfields (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  major_id UUID NOT NULL REFERENCES majors(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(major_id, slug)
);

-- Create new courses table
CREATE TABLE IF NOT EXISTS new_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subfield_id UUID NOT NULL REFERENCES subfields(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  title TEXT NOT NULL,
  ects INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE majors ENABLE ROW LEVEL SECURITY;
ALTER TABLE subfields ENABLE ROW LEVEL SECURITY;
ALTER TABLE new_courses ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Majors are viewable by everyone" 
  ON majors FOR SELECT USING (true);

CREATE POLICY "Subfields are viewable by everyone" 
  ON subfields FOR SELECT USING (true);

CREATE POLICY "New courses are viewable by everyone" 
  ON new_courses FOR SELECT USING (true);

-- Insert majors
INSERT INTO majors (name, slug) VALUES
  ('Academic Core', 'academic-core'),
  ('Sciences', 'sciences'),
  ('Social Sciences', 'social-sciences'),
  ('Humanities', 'humanities'),
  ('Interdisciplinary', 'interdisciplinary');

-- Insert subfields for each major
DO $$
BEGIN
  -- Academic Core subfields
  INSERT INTO subfields (major_id, name, slug) VALUES
    ((SELECT id FROM majors WHERE slug = 'academic-core'), 'Logic & Mathematics', 'logic-mathematics'),
    ((SELECT id FROM majors WHERE slug = 'academic-core'), 'Languages', 'languages'),
    ((SELECT id FROM majors WHERE slug = 'academic-core'), 'Big Questions', 'big-questions'),
    ((SELECT id FROM majors WHERE slug = 'academic-core'), 'Methods & Statistics', 'methods-statistics'),
    ((SELECT id FROM majors WHERE slug = 'academic-core'), 'Academic Skills', 'academic-skills'),
    ((SELECT id FROM majors WHERE slug = 'academic-core'), 'Global Identity', 'global-identity');

  -- Sciences subfields
  INSERT INTO subfields (major_id, name, slug) VALUES
    ((SELECT id FROM majors WHERE slug = 'sciences'), 'Biology', 'biology'),
    ((SELECT id FROM majors WHERE slug = 'sciences'), 'Chemistry', 'chemistry'),
    ((SELECT id FROM majors WHERE slug = 'sciences'), 'Physics', 'physics'),
    ((SELECT id FROM majors WHERE slug = 'sciences'), 'Computer Science', 'computer-science'),
    ((SELECT id FROM majors WHERE slug = 'sciences'), 'Mathematics', 'mathematics'),
    ((SELECT id FROM majors WHERE slug = 'sciences'), 'Earth Sciences', 'earth-sciences');

  -- Social Sciences subfields
  INSERT INTO subfields (major_id, name, slug) VALUES
    ((SELECT id FROM majors WHERE slug = 'social-sciences'), 'Psychology', 'psychology'),
    ((SELECT id FROM majors WHERE slug = 'social-sciences'), 'Sociology', 'sociology'),
    ((SELECT id FROM majors WHERE slug = 'social-sciences'), 'Economics', 'economics'),
    ((SELECT id FROM majors WHERE slug = 'social-sciences'), 'Political Science', 'political-science'),
    ((SELECT id FROM majors WHERE slug = 'social-sciences'), 'Anthropology', 'anthropology'),
    ((SELECT id FROM majors WHERE slug = 'social-sciences'), 'Geography', 'geography');

  -- Humanities subfields
  INSERT INTO subfields (major_id, name, slug) VALUES
    ((SELECT id FROM majors WHERE slug = 'humanities'), 'Philosophy', 'philosophy'),
    ((SELECT id FROM majors WHERE slug = 'humanities'), 'History', 'history'),
    ((SELECT id FROM majors WHERE slug = 'humanities'), 'Literature', 'literature'),
    ((SELECT id FROM majors WHERE slug = 'humanities'), 'Art History', 'art-history'),
    ((SELECT id FROM majors WHERE slug = 'humanities'), 'Music', 'music'),
    ((SELECT id FROM majors WHERE slug = 'humanities'), 'Religious Studies', 'religious-studies');

  -- Interdisciplinary subfields
  INSERT INTO subfields (major_id, name, slug) VALUES
    ((SELECT id FROM majors WHERE slug = 'interdisciplinary'), 'Environmental Studies', 'environmental-studies'),
    ((SELECT id FROM majors WHERE slug = 'interdisciplinary'), 'Cognitive Science', 'cognitive-science'),
    ((SELECT id FROM majors WHERE slug = 'interdisciplinary'), 'Digital Humanities', 'digital-humanities'),
    ((SELECT id FROM majors WHERE slug = 'interdisciplinary'), 'Global Health', 'global-health'),
    ((SELECT id FROM majors WHERE slug = 'interdisciplinary'), 'Urban Studies', 'urban-studies');
END $$;

-- Migrate existing course data to new structure
DO $$
DECLARE
  v_subfield_id UUID;
BEGIN
  -- Migrate Academic Core courses
  FOR v_subfield_id IN SELECT id FROM subfields WHERE major_id = (SELECT id FROM majors WHERE slug = 'academic-core')
  LOOP
    INSERT INTO new_courses (subfield_id, code, title, ects)
    SELECT 
      v_subfield_id,
      'ACC-' || LPAD(ROW_NUMBER() OVER (ORDER BY title)::TEXT, 3, '0'),
      title,
      6
    FROM courses 
    WHERE category = 'ACC';
  END LOOP;

  -- Migrate Sciences courses
  FOR v_subfield_id IN SELECT id FROM subfields WHERE major_id = (SELECT id FROM majors WHERE slug = 'sciences')
  LOOP
    INSERT INTO new_courses (subfield_id, code, title, ects)
    SELECT 
      v_subfield_id,
      'SCI-' || LPAD(ROW_NUMBER() OVER (ORDER BY title)::TEXT, 3, '0'),
      title,
      6
    FROM courses 
    WHERE category = 'SCI';
  END LOOP;

  -- Migrate Social Sciences courses
  FOR v_subfield_id IN SELECT id FROM subfields WHERE major_id = (SELECT id FROM majors WHERE slug = 'social-sciences')
  LOOP
    INSERT INTO new_courses (subfield_id, code, title, ects)
    SELECT 
      v_subfield_id,
      'SSC-' || LPAD(ROW_NUMBER() OVER (ORDER BY title)::TEXT, 3, '0'),
      title,
      6
    FROM courses 
    WHERE category = 'SSC';
  END LOOP;

  -- Migrate Humanities courses
  FOR v_subfield_id IN SELECT id FROM subfields WHERE major_id = (SELECT id FROM majors WHERE slug = 'humanities')
  LOOP
    INSERT INTO new_courses (subfield_id, code, title, ects)
    SELECT 
      v_subfield_id,
      'HUM-' || LPAD(ROW_NUMBER() OVER (ORDER BY title)::TEXT, 3, '0'),
      title,
      6
    FROM courses 
    WHERE category = 'HUM';
  END LOOP;
END $$;

-- Create RPC function for getting the full catalogue
CREATE OR REPLACE FUNCTION get_catalogue()
RETURNS JSONB
LANGUAGE SQL
AS $$
  SELECT jsonb_agg(
    jsonb_build_object(
      'major', jsonb_build_object('id', m.id, 'name', m.name, 'slug', m.slug),
      'subfields', (
        SELECT jsonb_agg(
          jsonb_build_object(
            'id', s.id,
            'name', s.name,
            'slug', s.slug,
            'courses', (
              SELECT jsonb_agg(
                jsonb_build_object(
                  'id', c.id,
                  'code', c.code,
                  'title', c.title,
                  'ects', c.ects
                )
              )
              FROM new_courses c
              WHERE c.subfield_id = s.id
            )
          )
        )
        FROM subfields s
        WHERE s.major_id = m.id
      )
    )
  )
  FROM majors m;
$$;