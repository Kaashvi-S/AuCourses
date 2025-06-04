import React, { useEffect, useState } from 'react';
import { fetchMajors, Major } from '../lib/supabase';
import MajorCard from '../components/ui/MajorCard';
import SearchBar from '../components/ui/SearchBar';

const MajorsPage: React.FC = () => {
  const [majors, setMajors] = useState<Major[]>([]);
  const [filteredMajors, setFilteredMajors] = useState<Major[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadMajors = async () => {
      setLoading(true);
      const data = await fetchMajors();
      setMajors(data);
      setFilteredMajors(data);
      setLoading(false);
    };

    loadMajors();
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredMajors(majors);
      return;
    }
    
    const filtered = majors.filter(major => 
      major.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredMajors(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-playfair font-bold text-text-dark mb-6">Choose a Major</h1>
      <div className="max-w-lg mb-8">
        <SearchBar 
          placeholder="Search majors..." 
          onSearch={handleSearch}
        />
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-pulse text-text-medium">Loading majors...</div>
        </div>
      ) : filteredMajors.length > 0 ? (
        <div className="flex gap-6 overflow-x-auto pb-6 snap-x">
          {filteredMajors.map(major => (
            <MajorCard 
              key={major.id} 
              major={major} 
              className="snap-start flex-shrink-0 w-[280px]"
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-text-medium">No majors found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default MajorsPage;