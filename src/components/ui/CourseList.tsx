import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Tag, Calendar } from 'lucide-react';
import type { Course } from '../../lib/supabase';

interface CourseListProps {
  courses: Course[];
}

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map(course => (
        <Link 
          key={course.id}
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
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#F8F7F4] text-[#728775]">
                  {course.code}
                </span>
                
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#F8F7F4] text-[#728775]">
                  {course.ects} ECTS
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CourseList;