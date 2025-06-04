/*
  # Add semester offering to courses

  1. Changes
    - Create semester_code enum type
    - Add offered_in column to new_courses table
    - Update existing courses with semester information

  2. Security
    - Maintain existing RLS policies
*/

-- Create the semester code enum
CREATE TYPE semester_code AS ENUM (
  '1',          -- Semester 1
  '1.1',        -- January intensive
  '2',          -- Semester 2
  '2.1',        -- June intensive
  'both sem',   -- Both Semesters
  'both intensive'  -- Both Intensives
);

-- Add the column to new_courses
ALTER TABLE new_courses
  ADD COLUMN offered_in semester_code;

-- Update existing courses with sample data
UPDATE new_courses SET offered_in = '1'
WHERE code LIKE '%101' OR code LIKE '%103' OR code LIKE '%105';

UPDATE new_courses SET offered_in = '2'
WHERE code LIKE '%102' OR code LIKE '%104' OR code LIKE '%106';

UPDATE new_courses SET offered_in = 'both sem'
WHERE code LIKE '%201' OR code LIKE '%301';

UPDATE new_courses SET offered_in = '1.1'
WHERE code LIKE '%202';

UPDATE new_courses SET offered_in = '2.1'
WHERE code LIKE '%203';