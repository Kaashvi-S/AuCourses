import React from 'react';
import { Link } from 'react-router-dom';
import type { Major } from '../../lib/supabase';

interface MajorCardProps {
  major: Major;
  className?: string;
}

/* one reusable fallback */
const PLACEHOLDER =
  'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

/* map every known slug to its picture */
const IMAGE_MAP: Record<string, string> = {
  'academic-core':
    'https://images.pexels.com/photos/256520/pexels-photo-256520.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  interdisciplinary:
    'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  sciences:
    'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  humanities:
    'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'social-sciences':
    'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'off-campus-courses':
    'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
};

const MajorCard: React.FC<MajorCardProps> = ({ major, className = '' }) => {
  const imgSrc = IMAGE_MAP[major.slug] ?? PLACEHOLDER;

  return (
    <Link
      to={`/majors/${major.slug}`}
      className={`block rounded-lg overflow-hidden bg-white border border-[#E8E7E4] shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all hover:shadow-md ${className}`}
    >
      {/* fixed height so every card is equal */}
      <div className="h-[140px] overflow-hidden rounded-t-lg">
        <img
          src={imgSrc}
          alt={major.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="py-3 text-center">
        <h3 className="text-[15px] font-medium text-[#1F1F1F]">
          {major.name}
        </h3>
      </div>
    </Link>
  );
};

export default MajorCard;
