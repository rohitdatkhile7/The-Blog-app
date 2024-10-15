'use client';
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ toggleSearch }) {
  const posts = useSelector(state => state.posts.posts);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  // Filter posts based on search query
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Navigate to a post's page
  const handlePostClick = ($id) => {
    navigate(`/post/${$id}`);
    toggleSearch(); // Close search after navigation
  };

  return (
    <div className="fixed inset-0 w-full h-screen bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md sm:max-w-xl  mx-auto bg-white p-6 rounded-lg shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={toggleSearch}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close Search"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold mb-4 text-center">Search</h2>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex">
            <input
              type="text"
              placeholder="Search posts, tags, and authors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow rounded-full border border-gray-300 px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#ff3358]"
            />
            <button
              type="submit"
              className="ml-2 bg-[#ff3358] text-white rounded-full px-4 py-2 text-base font-medium hover:bg-[#e02a4f] focus:outline-none focus:ring-2 focus:ring-[#ff3358]"
            >
              Search
            </button>
          </div>
        </form>

        {/* Display Search Results */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Posts</h3>
          {filteredPosts.length > 0 ? (
            <ul className="space-y-3 max-h-60 overflow-y-auto">
              {filteredPosts.map((post) => (
                <li
                  key={post.$id}
                  onClick={() => handlePostClick(post.$id)}
                  className="p-3 border border-gray-200 rounded-lg hover:bg-gray-100 cursor-pointer transition"
                >
                  <h4 className="text-md font-medium text-[#ff3358]">{post.title}</h4>
                  <p className="text-sm text-gray-600">
                    {post.content.length > 100
                      ? `${post.content.substring(0, 100)}...`
                      : post.content}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No posts found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

