import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import type { Subfield } from '../../lib/supabase';

interface SubfieldCardProps {
  subfield: Subfield;
  majorSlug: string;
}

const SubfieldCard: React.FC<SubfieldCardProps> = ({ subfield, majorSlug }) => {
  return (
    <Link 
      to={`/majors/${majorSlug}/${subfield.slug}`}
      className="block p-6 rounded-lg bg-white border border-[#E8E7E4] shadow-sm hover:shadow-md transition-all"
    >
      <h3 className="text-lg font-medium text-[#1F1F1F] text-center">{subfield.name}</h3>
    </Link>
  );
};

export default SubfieldCard;