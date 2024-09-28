'use client';
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ toggleSearch}) {
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
  };

  return (
    <div className="fixed inset-0 w-full h-screen bg-[#00000051] backdrop-blur-sm z-[100]">
      <div className="container duration-300 flex items-center justify-center h-full max-w-2xl mx-auto">
        <div className="w-full bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Search</h2>
            <button onClick={toggleSearch}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Search posts, tags, and authors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow rounded-full px-3 py-1  m-1 text-lg font-normal text-black"
              />
              <button className="p-2 rounded-full m-1 text-white bg-[#ff3358]" type="submit">Search</button>
            </div>
          </form>

          {/* Display Search Results */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Posts</h3>
            {filteredPosts.length > 0 ? (
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <div
                    key={post.$id}
                    onClick={() => handlePostClick(post.$id)}
                    className="cursor-pointer"
                  >
                    <h4 className="font-medium">{post.title}</h4>
                    <p
                      className="text-sm text-muted-foreground"
                      dangerouslySetInnerHTML={{
                        __html: post.content.substring(0, 100) + '...',
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No posts found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
