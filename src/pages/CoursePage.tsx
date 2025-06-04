import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCourseById, Course, formatSemesterCode } from '../lib/supabase';
import { ArrowLeft, Book, ChevronRight, Calendar } from 'lucide-react';

const CoursePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await fetchCourseById(id);

        setCourse(data);
      } catch (err) {
        console.error('Error fetching course:', err);
        setError('Could not load course details');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center py-12">
          <div className="animate-pulse text-text-medium">Loading course details...</div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-12">
          <p className="text-text-medium">{error || 'Course not found'}</p>
          <Link to="/courses" className="text-accent hover:underline mt-4 inline-block">
            Back to courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center text-sm text-accent mb-4">
        <Link to="/majors" className="hover:underline">Majors</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        {course.subfield?.major && (
          <>
            <Link to={`/majors/${course.subfield.major.slug}`} className="hover:underline">
              {course.subfield.major.name}
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
          </>
        )}
        {course.subfield && (
          <>
            <Link to={`/majors/${course.subfield.major?.slug}/${course.subfield.slug}`} className="hover:underline">
              {course.subfield.name}
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
          </>
        )}
        <span>Course</span>
      </div>
      
      <Link to={course.subfield ? `/majors/${course.subfield.major?.slug}/${course.subfield.slug}` : "/courses"} className="inline-flex items-center text-accent hover:underline mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to courses
      </Link>

      <div className="bg-white p-8 rounded-lg shadow-sm">
        <h1 className="text-3xl font-playfair font-bold text-text-dark mb-4">
          <span className="text-accent mr-2">{course.code}</span>
          {course.title}
        </h1>
        
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-[#F8F7F4] text-[#728775]">
            <Book className="h-4 w-4 mr-1" />
            {course.ects} ECTS
          </span>
          
          <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-[#F8F7F4] text-[#728775]">
            <Calendar className="h-4 w-4 mr-1" />
            {formatSemesterCode(course.offered_in)}
          </span>
          
          {course.subfield && (
          <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-[#F8F7F4] text-[#728775]">
            {course.subfield.name}
          </span>
          )}
        </div>
        
        <div className="mb-6">
          {course.description ? (
            <p className="text-text-medium">{course.description}</p>
          ) : (
            <p className="text-text-medium italic">No description available for this course.</p>
          )}
        </div>
        
        <div className="mt-8 border-t border-[#E8E7E4] pt-6">
          <h2 className="text-xl font-playfair font-bold text-text-dark mb-4">Reviews</h2>
          <p className="text-text-medium">No reviews yet. Be the first to review this course!</p>
          
          <Link 
            to={`/write-review?course=${course.id}`}
            className="mt-4 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#728775] hover:bg-[#657769]"
          >
            Write a Review
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;