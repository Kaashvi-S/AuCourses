import React from 'react';
import SearchBar from '../components/ui/SearchBar';

const ProfessorsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-text-dark mb-8">All Professors</h1>
      <div className="max-w-lg mb-8">
        <SearchBar placeholder="Search professors by name..." />
      </div>
      <p className="text-text-medium">Professor listings will appear here...</p>
    </div>
  );
};

export default ProfessorsPage;