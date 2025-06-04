import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
  course_id: string | null;
  profiles: {
    username: string;
  };
  new_courses?: {
    title: string;
    code: string;
  };
}

interface ForumReply {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles: {
    username: string;
  };
}

const ForumPostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<ForumPost | null>(null);
  const [replies, setReplies] = useState<ForumReply[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyContent, setReplyContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (postId) {
      fetchPost();
      fetchReplies();
    }
  }, [postId]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('forum_posts')
        .select(`
          *,
          profiles:user_id(username),
          new_courses(title, code)
        `)
        .eq('id', postId)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  const fetchReplies = async () => {
    try {
      const { data, error } = await supabase
        .from('forum_replies')
        .select(`
          *,
          profiles:user_id(username)
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setReplies(data || []);
    } catch (error) {
      console.error('Error fetching replies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('forum_replies')
        .insert({
          post_id: postId,
          content: replyContent.trim(),
          user_id: supabase.auth.getUser() // You'll need to handle authentication
        });

      if (error) throw error;
      
      setReplyContent('');
      fetchReplies();
    } catch (error) {
      console.error('Error submitting reply:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center py-12">
          <div className="animate-pulse text-text-medium">Loading discussion...</div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-12">
          <p className="text-text-medium">Discussion not found</p>
          <Link to="/forum" className="text-accent hover:underline mt-4 inline-block">
            Back to forum
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/forum" className="inline-flex items-center text-accent hover:underline mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to forum
      </Link>

      <div className="bg-white rounded-lg border border-[#E8E7E4] overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="font-medium text-text-dark">
                {post.profiles?.username || 'Anonymous'}
              </span>
              <span className="text-sm text-text-medium">
                {new Date(post.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
          
          <p className="text-text-dark mb-4">{post.content}</p>
          
          {post.new_courses && (
            <div className="text-sm text-text-medium">
              Course: {post.new_courses.code} - {post.new_courses.title}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {replies.map(reply => (
          <div key={reply.id} className="bg-white rounded-lg border border-[#E8E7E4] p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-medium text-text-dark">
                {reply.profiles?.username || 'Anonymous'}
              </span>
              <span className="text-sm text-text-medium">
                {new Date(reply.created_at).toLocaleDateString()}
              </span>
            </div>

            <p className="text-text-medium whitespace-pre-wrap">{reply.content}</p>
          </div>
        ))}

        <form onSubmit={handleSubmitReply} className="mt-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write a reply..."
              className="flex-1 h-[50px] px-4 rounded-lg bg-white border border-[#E8E7E4] text-[#1F1F1F] placeholder-[#9A9A9A] focus:outline-none focus:ring-2 focus:ring-[#728775] focus:border-transparent"
            />
            <button
              type="submit"
              disabled={!replyContent.trim() || submitting}
              className="px-6 h-[50px] rounded-lg bg-[#4CAF50] text-white font-medium hover:bg-[#43A047] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="h-5 w-5" />
              <span>{submitting ? 'Posting...' : 'Reply'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForumPostPage;