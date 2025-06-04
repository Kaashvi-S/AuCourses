import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  title: string;
  imageUrl: string;
  linkTo: string;
  className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, imageUrl, linkTo, className = '' }) => {
  return (
    <Link 
      to={linkTo}
      className={`block rounded-lg overflow-hidden bg-white border border-[#E8E7E4] shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all hover:shadow-md ${className}`}
    >
      <div className="h-[140px] overflow-hidden rounded-t-lg">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="py-3 text-center">
        <h3 className="text-[15px] font-medium text-[#1F1F1F]">{title}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;