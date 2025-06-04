import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchSubfields, Subfield } from '../lib/supabase';
import SubfieldCard from '../components/ui/SubfieldCard';
import SearchBar from '../components/ui/SearchBar';
import { ChevronRight } from 'lucide-react';

const SubfieldsPage: React.FC = () => {
  const { majorSlug } = useParams<{ majorSlug: string }>();
  const [subfields, setSubfields] = useState<Subfield[]>([]);
  const [filteredSubfields, setFilteredSubfields] = useState<Subfield[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [majorName, setMajorName] = useState('');
  const [isDirectCoursesMajor, setIsDirectCoursesMajor] = useState(false);

  useEffect(() => {
    const loadSubfields = async () => {
      if (!majorSlug) return;
      
      setIsDirectCoursesMajor(majorSlug === 'academic-core' || majorSlug === 'interdisciplinary');
      setLoading(true);
      const data = await fetchSubfields(majorSlug);
      setSubfields(data);
      setFilteredSubfields(data);
      
      if (data.length > 0 && data[0].major) {
        setMajorName(data[0].major.name);
      }
      
      setLoading(false);
    };

    loadSubfields();
  }, [majorSlug]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredSubfields(subfields);
      return;
    }
    
    const filtered = subfields.filter(subfield => 
      subfield.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredSubfields(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center text-sm text-accent mb-4">
        <Link to="/majors" className="hover:underline">Majors</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span>{majorName}</span>
      </div>
      
      <h1 className="text-3xl font-playfair font-bold text-text-dark mb-8">
        Subfields in {majorName}
      </h1>
      
      <div className="max-w-lg mb-8">
        <SearchBar 
          placeholder="Search subfields..." 
          onSearch={handleSearch} 
        />
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-pulse text-text-medium">Loading subfields...</div>
        </div>
      ) : isDirectCoursesMajor ? (
        <div className="text-center py-12">
          <p className="text-text-medium">Loading courses...</p>
        </div>
      ) : filteredSubfields.length > 0 && !isDirectCoursesMajor ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubfields.map(subfield => (
            <SubfieldCard 
              key={subfield.id} 
              subfield={subfield} 
              majorSlug={majorSlug || ''}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-text-medium">No subfields found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default SubfieldsPage;