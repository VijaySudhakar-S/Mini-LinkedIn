import React, { useState, useEffect } from 'react';
import { User, Edit } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../api/api';
import Post from '../posts/Post';

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
  });
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);

  const fetchUserPosts = async () => {
    if (!user?.id) return;
    
    try {
      const response = await api.getUserProfile(user.id);
      if (response.posts) {
        setUserPosts(response.posts);
      }
    } catch (error) {
      setError('Failed to load your posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError('');

    try {
      const result = await updateUserProfile(formData);
      if (result.success) {
        setEditing(false);
      } else {
        setError(result.message || 'Failed to update profile');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const handlePostDeleted = (postId) => {
    setUserPosts(userPosts.filter(post => post.id !== postId));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Profile Header */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user?.name}</h1>
              <p className="text-gray-600">{user?.email}</p>
              <p className="text-sm text-gray-500 mt-1">
                Member since {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setEditing(!editing);
              setFormData({ name: user?.name || '', bio: user?.bio || '' });
              setError('');
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Edit size={16} />
            <span>{editing ? 'Cancel' : 'Edit Profile'}</span>
          </button>
        </div>

        {editing ? (
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                rows="4"
                maxLength="500"
                placeholder="Tell us about yourself..."
              />
              <p className="text-sm text-gray-500 mt-1">{formData.bio.length}/500 characters</p>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={updating}
                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                {updating ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div>
            <h3 className="font-semibold mb-2">About</h3>
            <p className="text-gray-700">
              {user?.bio || 'No bio available. Click "Edit Profile" to add one!'}
            </p>
          </div>
        )}
      </div>

      {/* User Posts */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">My Posts ({userPosts.length})</h2>
        
        {error && !editing && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {userPosts.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            You haven't posted anything yet. Go to the feed to create your first post!
          </div>
        ) : (
          <div className="space-y-4">
            {userPosts.map((post) => (
              <Post
                key={post.id}
                post={post}
                onDelete={handlePostDeleted}
                canDelete={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;