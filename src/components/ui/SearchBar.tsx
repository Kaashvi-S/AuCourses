import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (searchTerm: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Search courses...", 
  onSearch,
  className = ""
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Search as you type
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`w-full ${className}`}
    >
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={20} className="text-[#9A9A9A]" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          className="block w-full h-[60px] pl-10 pr-3 rounded-lg bg-white border border-[#E8E7E4] text-[#1F1F1F] placeholder-[#9A9A9A] focus:outline-none focus:ring-2 focus:ring-[#728775] focus:border-transparent"
          placeholder={placeholder}
        />
      </div>
    </form>
  );
};

export default SearchBar;