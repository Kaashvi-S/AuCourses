import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import MajorsPage from './pages/MajorsPage';
import SubfieldsPage from './pages/SubfieldsPage';
import CoursesPage from './pages/CoursesPage';
import CoursePage from './pages/CoursePage';
import ProfessorsPage from './pages/ProfessorsPage';
import SignInPage from './pages/SignInPage';
import ForumPage from './pages/ForumPage';
import ForumPostPage from './pages/ForumPostPage';
import WriteReviewPage from './pages/WriteReviewPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-primary-bg font-sans">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/majors" element={<MajorsPage />} />
            <Route path="/majors/:majorSlug" element={<SubfieldsPage />} />
            <Route path="/majors/:majorSlug/:subfieldSlug" element={<CoursesPage />} />
            <Route path="/courses/:id" element={<CoursePage />} />
            <Route path="/professors" element={<ProfessorsPage />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/forum/:postId" element={<ForumPostPage />} />
            <Route path="/write-review" element={<WriteReviewPage />} />
            <Route path="/signin" element={<SignInPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;