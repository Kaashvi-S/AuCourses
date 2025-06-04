/*
  # Add Sample Course Discussions

  1. New Data
    - Add sample forum posts about courses
    - Add sample replies to discussions
    - Create realistic course-related content
*/

-- Insert sample forum posts
INSERT INTO forum_posts (id, title, content, user_id, course_id, created_at)
SELECT 
  gen_random_uuid(),
  'How difficult is Logic & Programming?',
  'I''m considering taking Logic & Programming next semester. Can anyone share their experience with the course workload and difficulty level? Any tips for success?',
  (SELECT id FROM profiles LIMIT 1),
  (SELECT id FROM new_courses WHERE code = 'ACC102' LIMIT 1),
  now() - interval '2 days'
WHERE EXISTS (SELECT 1 FROM profiles LIMIT 1);

INSERT INTO forum_posts (id, title, content, user_id, course_id, created_at)
SELECT 
  gen_random_uuid(),
  'Research Methods group project experience',
  'Just finished the group project in Research Methods. The collaboration with students from different majors really helped bring diverse perspectives. Highly recommend taking this course!',
  (SELECT id FROM profiles LIMIT 1),
  (SELECT id FROM new_courses WHERE code = 'ACC201' LIMIT 1),
  now() - interval '1 day'
WHERE EXISTS (SELECT 1 FROM profiles LIMIT 1);

INSERT INTO forum_posts (id, title, content, user_id, course_id, created_at)
SELECT 
  gen_random_uuid(),
  'Statistics for Sciences - Math background needed?',
  'What level of math background is recommended for Statistics for Sciences? I took basic calculus in high school but wondering if that''s enough.',
  (SELECT id FROM profiles LIMIT 1),
  (SELECT id FROM new_courses WHERE code = 'ACC103' LIMIT 1),
  now() - interval '12 hours'
WHERE EXISTS (SELECT 1 FROM profiles LIMIT 1);

-- Insert sample replies
INSERT INTO forum_replies (id, post_id, content, user_id, created_at)
SELECT 
  gen_random_uuid(),
  (SELECT id FROM forum_posts WHERE title LIKE '%Logic & Programming%' LIMIT 1),
  'The course is challenging but very rewarding! Make sure to start the programming assignments early and attend the help sessions. The logic part builds up gradually, so keeping up with the weekly exercises is key.',
  (SELECT id FROM profiles LIMIT 1),
  now() - interval '1 day'
WHERE EXISTS (SELECT 1 FROM profiles LIMIT 1);

INSERT INTO forum_replies (id, post_id, content, user_id, created_at)
SELECT 
  gen_random_uuid(),
  (SELECT id FROM forum_posts WHERE title LIKE '%Logic & Programming%' LIMIT 1),
  'I took it last semester. The workload is manageable if you stay organized. The professor is really helpful during office hours. Focus on understanding the concepts rather than memorizing.',
  (SELECT id FROM profiles LIMIT 1),
  now() - interval '12 hours'
WHERE EXISTS (SELECT 1 FROM profiles LIMIT 1);

INSERT INTO forum_replies (id, post_id, content, user_id, created_at)
SELECT 
  gen_random_uuid(),
  (SELECT id FROM forum_posts WHERE title LIKE '%Statistics%' LIMIT 1),
  'Basic calculus is enough! The course focuses more on understanding statistical concepts and using software for analysis. The professors explain everything clearly.',
  (SELECT id FROM profiles LIMIT 1),
  now() - interval '6 hours'
WHERE EXISTS (SELECT 1 FROM profiles LIMIT 1);