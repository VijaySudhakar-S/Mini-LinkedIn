import React, { useState, useEffect } from 'react';
import { api } from '../../api/api';
import CreatePost from './CreatePost';
import Post from './Post';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    try {
      const response = await api.getPosts();
      if (response.posts) {
        setPosts(response.posts);
      } else {
        setError('Failed to load posts');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostCreated = () => {
    fetchPosts();
  };

  const handlePostDeleted = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <CreatePost onPostCreated={handlePostCreated} />
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
        {posts.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No posts yet. Be the first to share something!
          </div>
        ) : (
          posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onDelete={handlePostDeleted}
              canDelete={false}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Feed;