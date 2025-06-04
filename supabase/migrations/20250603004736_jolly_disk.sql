/*
  # Add Sciences, Social Sciences and Humanities courses

  1. New Data
    - Add Sciences (SCI) courses
    - Add Social Sciences (SSC) courses  
    - Add Humanities (HUM) courses

  2. Changes
    - Insert new courses with proper level, category and semester info
    - Include cross-listings where applicable
*/

-- Sciences (SCI) courses
INSERT INTO courses (title, level, category, semester, cross_listings) VALUES
-- 100-level
('Introduction to Biology', 100, 'SCI', 1, NULL),
('Introduction to Chemistry', 100, 'SCI', 1, NULL), 
('Introduction to Physics', 100, 'SCI', 1, NULL),
('Introduction to Computer Science', 100, 'SCI', 1, NULL),
('Introduction to Mathematics', 100, 'SCI', 1, NULL),
('Introduction to Earth Sciences', 100, 'SCI', 1, NULL),

-- 200-level
('Molecular Biology', 200, 'SCI', 1, NULL),
('Organic Chemistry', 200, 'SCI', 1, NULL),
('Classical Mechanics', 200, 'SCI', 1, NULL),
('Data Structures & Algorithms', 200, 'SCI', 1, NULL),
('Linear Algebra & Analysis', 200, 'SCI', 1, NULL),
('Environmental Sciences', 200, 'SCI', 1, ARRAY['SSC']),

-- 300-level
('Advanced Biology', 300, 'SCI', 1, NULL),
('Advanced Chemistry', 300, 'SCI', 1, NULL),
('Advanced Physics', 300, 'SCI', 1, NULL),
('Advanced Computer Science', 300, 'SCI', 1, NULL),
('Advanced Mathematics', 300, 'SCI', 1, NULL),
('Advanced Earth Sciences', 300, 'SCI', 1, NULL);

-- Social Sciences (SSC) courses
INSERT INTO courses (title, level, category, semester, cross_listings) VALUES
-- 100-level
('Introduction to Psychology', 100, 'SSC', 1, NULL),
('Introduction to Sociology', 100, 'SSC', 1, NULL),
('Introduction to Economics', 100, 'SSC', 1, NULL),
('Introduction to Political Science', 100, 'SSC', 1, NULL),
('Introduction to Anthropology', 100, 'SSC', 1, NULL),
('Introduction to Geography', 100, 'SSC', 1, NULL),

-- 200-level
('Cognitive Psychology', 200, 'SSC', 1, NULL),
('Social Theory', 200, 'SSC', 1, NULL),
('Microeconomics', 200, 'SSC', 1, NULL),
('Comparative Politics', 200, 'SSC', 1, NULL),
('Cultural Anthropology', 200, 'SSC', 1, ARRAY['HUM']),
('Urban Geography', 200, 'SSC', 1, NULL),

-- 300-level
('Advanced Psychology', 300, 'SSC', 1, NULL),
('Advanced Sociology', 300, 'SSC', 1, NULL),
('Advanced Economics', 300, 'SSC', 1, NULL),
('Advanced Political Science', 300, 'SSC', 1, NULL),
('Advanced Anthropology', 300, 'SSC', 1, NULL),
('Advanced Geography', 300, 'SSC', 1, NULL);

-- Humanities (HUM) courses
INSERT INTO courses (title, level, category, semester, cross_listings) VALUES
-- 100-level
('Introduction to Philosophy', 100, 'HUM', 1, NULL),
('Introduction to History', 100, 'HUM', 1, NULL),
('Introduction to Literature', 100, 'HUM', 1, NULL),
('Introduction to Art History', 100, 'HUM', 1, NULL),
('Introduction to Music', 100, 'HUM', 1, NULL),
('Introduction to Religious Studies', 100, 'HUM', 1, NULL),

-- 200-level
('Ethics', 200, 'HUM', 1, NULL),
('Modern History', 200, 'HUM', 1, NULL),
('World Literature', 200, 'HUM', 1, NULL),
('Modern Art', 200, 'HUM', 1, NULL),
('Music Theory', 200, 'HUM', 1, NULL),
('Comparative Religion', 200, 'HUM', 1, ARRAY['SSC']),

-- 300-level
('Advanced Philosophy', 300, 'HUM', 1, NULL),
('Advanced History', 300, 'HUM', 1, NULL),
('Advanced Literature', 300, 'HUM', 1, NULL),
('Advanced Art History', 300, 'HUM', 1, NULL),
('Advanced Music', 300, 'HUM', 1, NULL),
('Advanced Religious Studies', 300, 'HUM', 1, NULL);