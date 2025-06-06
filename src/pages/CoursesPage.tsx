import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  fetchCourses,
  fetchSubfields,
  Course,
  Subfield,
  formatSemesterCode,
} from '../lib/supabase';
import CourseList from '../components/ui/CourseList';
import SearchBar from '../components/ui/SearchBar';
import CourseFilterBar from '../components/ui/CourseFilterBar';
import { ChevronRight } from 'lucide-react';

const CoursesPage: React.FC = () => {
  const { majorSlug, subfieldSlug } = useParams<{ majorSlug: string; subfieldSlug: string }>();
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [subfield, setSubfield] = useState<Subfield | null>(null);
  const [semesterFilter, setSemesterFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');

  useEffect(() => {
    const loadData = async () => {
      if (!majorSlug || !subfieldSlug) return;
      
      setLoading(true);
      
      // First get the subfield to get its ID
      const subfields = await fetchSubfields(majorSlug);
      const currentSubfield = subfields.find(s => s.slug === subfieldSlug) || null;
      setSubfield(currentSubfield);
      
      if (currentSubfield) {
        const courseData = await fetchCourses(currentSubfield.id);
        setCourses(courseData);
        setFilteredCourses(courseData);
      }
      
      setLoading(false);
    };

    loadData();
  }, [majorSlug, subfieldSlug]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    let result = courses;

    if (searchTerm.trim()) {
      result = result.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (semesterFilter !== 'all') {
      result = result.filter(course =>
        formatSemesterCode(course.offered_in) === semesterFilter
      );
    }

    if (levelFilter !== 'all') {
      result = result.filter(
        course => course.level && course.level.toString() === levelFilter
      );
    }

    setFilteredCourses(result);
  }, [courses, searchTerm, semesterFilter, levelFilter]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center text-sm text-accent mb-4">
        <Link to="/majors" className="hover:underline">Majors</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link to={`/majors/${majorSlug}`} className="hover:underline">
          {subfield?.major?.name || majorSlug}
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span>{subfield?.name || subfieldSlug}</span>
      </div>
      
      <h1 className="text-3xl font-playfair font-bold text-text-dark mb-8">
        Courses in {subfield?.name || ''}
      </h1>
      
      <div className="max-w-lg mb-8">
        <SearchBar
          placeholder="Search courses by code or title..."
          onSearch={handleSearch}
        />
      </div>

      <CourseFilterBar
        semester={semesterFilter}
        level={levelFilter}
        onSemesterChange={setSemesterFilter}
        onLevelChange={setLevelFilter}
        className="mb-8"
      />
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-pulse text-text-medium">Loading courses...</div>
        </div>
      ) : filteredCourses.length > 0 ? (
        <CourseList courses={filteredCourses} />
      ) : (
        <div className="text-center py-12">
          <p className="text-text-medium">No courses found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;