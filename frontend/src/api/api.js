const API_BASE = 'http://localhost:5000/api';

export const api = {
  createPost: async (token, content) => {
    const response = await fetch(`${API_BASE}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });
    return response.json();
  },

  getPosts: async (page = 1) => {
    const response = await fetch(`${API_BASE}/posts?page=${page}&limit=10`);
    return response.json();
  },

  getUserProfile: async (userId) => {
    const response = await fetch(`${API_BASE}/users/${userId}`);
    return response.json();
  },

  deletePost: async (token, postId) => {
    const response = await fetch(`${API_BASE}/posts/${postId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },
};