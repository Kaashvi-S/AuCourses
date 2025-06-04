import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import Button from '../components/ui/Button';
import { supabase, fetchCourseById, type Course } from '../lib/supabase';

const WriteReviewPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const courseId = searchParams.get('course');
  
  const [course, setCourse] = useState<Course | null>(null);
  const [rating, setRating] = useState(0);
  const [difficulty, setDifficulty] = useState(0);
  const [workload, setWorkload] = useState(0);
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (courseId) {
      fetchCourseById(courseId).then(setCourse);
    }
  }, [courseId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseId) return;

    setSubmitting(true);
    setError('');

    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        throw new Error('Please sign in to submit a review');
      }

      const { error } = await supabase
        .from('course_reviews')
        .insert({
          course_id: courseId,
          user_id: user.data.user.id,
          rating,
          difficulty,
          workload,
          content: content.trim()
        });

      if (error) throw error;

      navigate(`/courses/${courseId}`);
    } catch (err) {
      console.error('Error submitting review:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const RatingInput = ({ 
    value, 
    onChange, 
    label 
  }: { 
    value: number; 
    onChange: (val: number) => void; 
    label: string;
  }) => (
    <div>
      <label className="block text-sm font-medium text-text-dark mb-2">{label}</label>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => onChange(num)}
            className={`p-2 rounded-md transition-colors ${
              value >= num 
                ? 'text-yellow-400 hover:text-yellow-500' 
                : 'text-gray-300 hover:text-gray-400'
            }`}
          >
            <Star className="h-6 w-6 fill-current" />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <Link 
        to={courseId ? `/courses/${courseId}` : '/courses'} 
        className="inline-flex items-center text-accent hover:underline mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to course
      </Link>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-3xl font-playfair font-bold text-text-dark mb-2">
            Write a Review
          </h1>
          
          {course && (
            <div className="mb-6">
              <h2 className="text-lg font-medium text-text-dark">
                {course.code} - {course.title}
              </h2>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <RatingInput 
              value={rating} 
              onChange={setRating} 
              label="Overall Rating" 
            />

            <RatingInput 
              value={difficulty} 
              onChange={setDifficulty} 
              label="Difficulty" 
            />

            <RatingInput 
              value={workload} 
              onChange={setWorkload} 
              label="Workload" 
            />

            <div>
              <label 
                htmlFor="content" 
                className="block text-sm font-medium text-text-dark mb-2"
              >
                Your Review
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="w-full p-3 border border-[#E8E7E4] rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Share your experience with this course..."
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            <Button
              type="submit"
              variant="primary"
              disabled={submitting || !rating || !content.trim()}
              className="w-full"
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WriteReviewPage;