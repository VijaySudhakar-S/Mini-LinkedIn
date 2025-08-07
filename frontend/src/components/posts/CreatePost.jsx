import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../api/api';

const CreatePost = ({ onPostCreated }) => {
  const { token } = useAuth();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await api.createPost(token, content.trim());
      if (response.post) {
        setContent('');
        onPostCreated();
      } else {
        setError(response.message || 'Failed to create post');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4">Create a Post</h3>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          rows="4"
          maxLength="1000"
          required
        />
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-500">
            {content.length}/1000 characters
          </span>
          <button
            type="submit"
            disabled={loading || !content.trim()}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;