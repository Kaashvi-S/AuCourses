import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Calendar } from 'lucide-react';
import type { Course } from '../../lib/supabase';
import { getCategoryName } from '../../lib/supabase';
import { formatSemesterCode } from '../../lib/supabase';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const categoryName = course.category ? getCategoryName(course.category) : null;
  
  return (
    <Link 
      to={`/courses/${course.id}`}
      className="block p-5 rounded-lg overflow-hidden bg-white border border-[#E8E7E4] shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-[#F8F7F4] rounded-md">
          <Book className="h-5 w-5 text-[#728775]" />
        </div>
        
        <div>
          <h3 className="text-[16px] font-medium text-[#1F1F1F] mb-1">{course.title}</h3>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {categoryName && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#F8F7F4] text-[#728775]">
                {categoryName}
              </span>
            )}

            {course.level && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#F8F7F4] text-[#728775]">
                {course.level}-level
              </span>
            )}

            {course.semester && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#F8F7F4] text-[#728775]">
                Semester {course.semester}
              </span>
            )}

            {course.is_intensive && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#F8F7F4] text-[#728775]">
                Intensive
              </span>
            )}
            
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#F8F7F4] text-[#728775]">
              {course.ects} ECTS
            </span>
            
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#F8F7F4] text-[#728775]">
              <Calendar className="h-3 w-3 mr-1" />
              {formatSemesterCode(course.offered_in)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;