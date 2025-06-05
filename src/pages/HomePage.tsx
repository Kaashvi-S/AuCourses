import React from 'react';
import SearchBar from '../components/ui/SearchBar';
import Button from '../components/ui/Button';
import CategoryCard from '../components/ui/CategoryCard';

const HomePage: React.FC = () => {
  const handleSearch = (searchTerm: string) => {
    console.log('Searching for:', searchTerm);
    // Implement search functionality
  };

  const categories = [
    {
      title: 'Academic Core',
      imageUrl: 'https://images.pexels.com/photos/256520/pexels-photo-256520.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 
      linkTo: '/majors/academic-core'
    },
    {
      title: 'Sciences',
      imageUrl: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      linkTo: '/majors/sciences'
    },
    {
      title: 'Social Sciences',
      imageUrl: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      linkTo: '/majors/social-sciences'
    },
    {
      title: 'Humanities',
      imageUrl: 'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      linkTo: '/majors/humanities'
    },
    {
      title: 'Interdisciplinary',
      imageUrl: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      linkTo: '/majors/interdisciplinary'
    }
  ];

  return (
    <div>
   {/* Hero Section */}
<section className="pt-4 pb-16 bg-[#F8F7F4]">
  <div className="max-w-[1100px] mx-auto px-6 text-center">
    <h1 className="text-[64px] font-playfair font-bold text-black mb-2">
      AuCourses
    </h1>

    <p className="text-[20px] font-inter font-medium tracking-[0.2px] text-[#1F1F1F] mb-8">
      Reviews by Students
    </p>

    <div className="max-w-[800px] mx-auto flex gap-4 items-center md:flex-row flex-col">
      <div className="flex-1">
        <SearchBar onSearch={handleSearch} />
      </div>

      <Button
        variant="primary"
        href="/write-review"
        className="h-[60px] px-6 rounded-lg bg-[#728775] text-white font-medium hover:bg-[#657769] whitespace-nowrap md:w-auto w-full"
      >
        Write a Review
      </Button>
    </div>
  </div>
</section>


      {/* Course Categories */}
      <section className="bg-[#F8F7F4] pb-16">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
            {categories.map(category => (
              <CategoryCard 
                key={category.title}
                title={category.title} 
                imageUrl={category.imageUrl} 
                linkTo={category.linkTo} 
                className="snap-start flex-shrink-0 w-[200px]"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Community Forum */}
      <section className="pb-16 bg-[#F8F7F4]">
        <div className="max-w-[1100px] mx-auto px-6 text-center">
          <h2 className="text-[36px] font-playfair font-bold text-black mb-2">
            Community Forum
          </h2>
          <p className="text-[17px] text-[#1F1F1F] max-w-2xl mx-auto mb-6 font-sans">
            Ask questions, share advice, and connect with fellow students
          </p>
          
          <Button 
            variant="primary"
            href="/forum"
            className="h-[60px] px-6 rounded-lg bg-[#728775] text-white font-medium hover:bg-[#657769]"
          >
            Explore Forum
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;