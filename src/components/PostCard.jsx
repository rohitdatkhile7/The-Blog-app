// PostCard.jsx
import React from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';
import parse from "html-react-parser";
import profileImg from "../assets/5034901-200.png"

const CategoryBadge = ({ category }) => {
  const categoryColors = {
    Lifestyle: "text-[#6d28db] bg-[#f6f0fe]",
    Technology: "text-[#2d68f8] bg-[#eff3fe]",
    Travel: "text-[#1a826c] bg-[#eef9f2]",
    Health: "text-[#07a8ae] bg-[#ebf8f8]",
    Culture: "text-[#2280c0] bg-[#ecfbfb]",
    Other: "text-[#ff3358] bg-[#ffd2da]"
  };

  return (
    <span
      className={`${categoryColors[category]}  text-sm font-semibold mr-2 px-3 py-0.5 rounded-full`}
    >
      {category}
    </span>
  );
};

function PostCard({ post }) {
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "....." : text;
  };
  return (
    <div className='w-auto'>
    <Link to={`/post/${post.$id}`} >
      <div className=" flex items-center justify-center ">
        <img
          src={appwriteService.getFilePreview(post.featuredImage)}
          alt={post.title}
          className="w-full h-72 object-cover rounded-lg bg-gradient-to-b from-white to-transparent overflow-hidden  "
        />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
        <p className="text-gray-600  mb-4 line-clamp-3">
          {typeof post.content === 'string'
            ? parse(truncateText(post.content, 80))
            : parse(truncateText(String(post.content), 80))
          }
        </p>
        <div className="flex justify-between mb-4">
          <img
            src={profileImg}
            alt={post.author}
            className="w-5 h-5 rounded-full  "
          />
          <p className="font-semibold">{post.author}</p>
          <span>•</span>
          <span className=' text-gray-500 text-sm'>{(post.$createdAt).slice(0, 10)}</span>
          <span
          >
            <CategoryBadge category={post.category} />
          </span>
        </div>

      </div>
    </Link >
    </div>
  );
}

export default PostCard;
