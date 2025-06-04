import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Send } from 'lucide-react';
import SearchBar from '../components/ui/SearchBar';
import { supabase } from '../lib/supabase';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
  course_id: string | null;
  reply_count: number;
  profiles: {
    username: string;
  };
  new_courses?: {
    title: string;
    code: string;
  };
  likes: number;
}

const ForumPage: React.FC = () => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [newPost, setNewPost] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('forum_posts')
        .select(`
          *,
          profiles:user_id(username),
          new_courses(title, code),
          reply_count:forum_replies(count)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPost.trim()) return;

    try {
      const { error } = await supabase
        .from('forum_posts')
        .insert({
          title: newPostTitle.trim(),
          content: newPost.trim(),
          user_id: supabase.auth.getUser() // You'll need to handle authentication
        });

      if (error) throw error;
      
      setNewPost('');
      setNewPostTitle('');
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-lg mb-8">
        <SearchBar
          placeholder="Search discussions..."
          onSearch={handleSearch}
        />
      </div>
      <div className="flex items-center gap-2 mb-8">
        <MessageSquare className="h-6 w-6 text-text-dark" />
        <h1 className="text-2xl font-medium text-text-dark">Course Discussions</h1>
      </div>
      
      <form onSubmit={handleSubmitPost} className="mb-8">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            placeholder="Title your discussion..."
            className="h-[50px] px-4 rounded-lg bg-white border border-[#E8E7E4] text-[#1F1F1F] placeholder-[#9A9A9A] focus:outline-none focus:ring-2 focus:ring-[#728775] focus:border-transparent"
          />
          <div className="flex gap-4">
            <input
              type="text"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share your course experience or ask a question..."
              className="flex-1 h-[50px] px-4 rounded-lg bg-white border border-[#E8E7E4] text-[#1F1F1F] placeholder-[#9A9A9A] focus:outline-none focus:ring-2 focus:ring-[#728775] focus:border-transparent"
            />
            <button
              type="submit"
              disabled={!newPost.trim() || !newPostTitle.trim()}
              className="px-6 h-[50px] rounded-lg bg-[#728775] text-white font-medium hover:bg-[#657769] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="h-5 w-5" />
              <span>Post</span>
            </button>
          </div>
        </div>
      </form>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-pulse text-text-medium">Loading discussions...</div>
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="space-y-4">
          {filteredPosts.map(post => (
            <Link
              key={post.id}
              to={`/forum/${post.id}`}
              className="block p-6 bg-white rounded-lg border border-[#E8E7E4] shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-text-dark mb-2">{post.title}</h3>
                  <p className="text-text-medium line-clamp-2 mb-4">{post.content}</p>
                  
                  <div className="flex items-center text-sm text-text-medium">
                    <span>{post.profiles?.username || 'Anonymous'}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    {post.new_courses && (
                      <>
                        <span className="mx-2">•</span>
                        <span className="text-[#728775]">{post.new_courses.code}</span>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-text-medium">
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    <span>{post.reply_count}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-text-medium">No discussions found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
}

export default ForumPage;