/*
  # Update Academic Catalog Structure

  1. Changes
    - Academic Core and Off Campus courses directly under major
    - Sciences, Social Sciences, and Humanities with subfields
    - Updated course distribution

  2. Security
    - Maintain existing RLS policies
    - Public read access
*/

-- Insert courses directly for Academic Core
DO $$
DECLARE
  v_academic_core_id UUID;
  v_off_campus_id UUID;
BEGIN
  -- Get major IDs
  SELECT id INTO v_academic_core_id FROM majors WHERE slug = 'academic-core';
  SELECT id INTO v_off_campus_id FROM majors WHERE slug = 'interdisciplinary';

  -- Delete existing subfields for Academic Core and Off Campus
  DELETE FROM subfields WHERE major_id IN (v_academic_core_id, v_off_campus_id);

  -- Create a single subfield for each to maintain structure
  INSERT INTO subfields (major_id, name, slug) VALUES
    (v_academic_core_id, 'Core Curriculum', 'core-curriculum'),
    (v_off_campus_id, 'Off Campus Programs', 'off-campus-programs');

  -- Insert Academic Core courses
  INSERT INTO new_courses (subfield_id, code, title, ects, description) VALUES
    ((SELECT id FROM subfields WHERE major_id = v_academic_core_id), 'ACC101', 'Academic Writing Skills', 6, 'Develop essential academic writing skills'),
    ((SELECT id FROM subfields WHERE major_id = v_academic_core_id), 'ACC102', 'Logic & Programming', 6, 'Introduction to logical thinking and basic programming'),
    ((SELECT id FROM subfields WHERE major_id = v_academic_core_id), 'ACC103', 'Statistics', 6, 'Fundamental statistical methods'),
    ((SELECT id FROM subfields WHERE major_id = v_academic_core_id), 'ACC201', 'Research Methods', 6, 'Research methodology across disciplines'),
    ((SELECT id FROM subfields WHERE major_id = v_academic_core_id), 'ACC202', 'Global Challenges', 6, 'Contemporary global issues and solutions'),
    ((SELECT id FROM subfields WHERE major_id = v_academic_core_id), 'ACC301', 'Capstone Preparation', 6, 'Preparation for final year project');

  -- Insert Off Campus courses
  INSERT INTO new_courses (subfield_id, code, title, ects, description) VALUES
    ((SELECT id FROM subfields WHERE major_id = v_off_campus_id), 'OCP201', 'Study Abroad', 30, 'Semester abroad at partner universities'),
    ((SELECT id FROM subfields WHERE major_id = v_off_campus_id), 'OCP202', 'International Internship', 30, 'Professional experience abroad'),
    ((SELECT id FROM subfields WHERE major_id = v_off_campus_id), 'OCP203', 'Community Project', 30, 'Local community engagement project');
END $$;