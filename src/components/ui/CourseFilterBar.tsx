import React from 'react';

interface CourseFilterBarProps {
  semester: string;
  level: string;
  onSemesterChange: (value: string) => void;
  onLevelChange: (value: string) => void;
  className?: string;
}

const CourseFilterBar: React.FC<CourseFilterBarProps> = ({
  semester,
  level,
  onSemesterChange,
  onLevelChange,
  className = '',
}) => {
  return (
    <div className={`flex gap-4 ${className}`}>
      <select
        value={semester}
        onChange={e => onSemesterChange(e.target.value)}
        className="h-[40px] px-3 rounded-md border border-[#E8E7E4] bg-white text-[#1F1F1F] focus:outline-none"
      >
        <option value="all">All Semesters</option>
        <option value="Semester 1">Semester 1</option>
        <option value="January Intensive">January Intensive</option>
        <option value="Semester 2">Semester 2</option>
        <option value="June Intensive">June Intensive</option>
      </select>
      <select
        value={level}
        onChange={e => onLevelChange(e.target.value)}
        className="h-[40px] px-3 rounded-md border border-[#E8E7E4] bg-white text-[#1F1F1F] focus:outline-none"
      >
        <option value="all">All Levels</option>
        <option value="100">100</option>
        <option value="200">200</option>
        <option value="300">300</option>
      </select>
    </div>
  );
};

export default CourseFilterBar;
