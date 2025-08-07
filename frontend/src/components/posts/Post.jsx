import React, { useState } from 'react';
import { User, Calendar, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../api/api';

const Post = ({ post, onDelete, canDelete = false }) => {
  const { token } = useAuth();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    setDeleting(true);
    try {
      await api.deletePost(token, post.id);
      onDelete(post.id);
    } catch (error) {
      alert('Failed to delete post');
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <User className="text-white" size={20} />
          </div>
          <div>
            <h4 className="font-semibold">{post.author.name}</h4>
            <p className="text-sm text-gray-500 flex items-center">
              <Calendar size={14} className="mr-1" />
              {formatDate(post.createdAt)}
            </p>
          </div>
        </div>
        {canDelete && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-red-500 hover:text-red-700 p-1"
            title="Delete post"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
      <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
    </div>
  );
};

export default Post;