import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import { useSelector } from 'react-redux';
import { ThreeDot } from 'react-loading-indicators';
import { motion } from 'framer-motion';


function AllPosts() {
  const [posts, setPosts] = useState([]);
  const userposts = useSelector(state => state.posts.posts); 
  useEffect(() => {
    if (userposts && userposts.length > 0) {
      const ids = userposts.map(post => post.$id);
      const uniqueIds = new Set(ids);
      if (uniqueIds.size !== ids.length) {
        console.warn('Duplicate IDs found in posts:', userposts.filter((post, index) => ids.indexOf(post.$id) !== index));
      }
      setPosts(userposts);
    }
  }, [userposts]);

  const textVariant = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: 'easeInOut',
        staggerChildren: 0.2,
      },
    },
  };
  return posts? (
    <div className='w-full py-8'>
      <motion.h1 
      variants={textVariant}
      initial="hidden"
      animate="visible"
      className='text-4xl font-semibold ml-32 my-4 p-5 border-b-2 border-gray-300'>All Posts</motion.h1>
    <Container>
      <div className='grid grid-cols-1 md:grid-cols-2 min-h-screen lg:grid-cols-3 bg-[#f9fafb] gap-3 p-2 rounded-lg'>
        {posts.map((post) => (
          <div key={post.$id} className='bg-white rounded-lg  transition-transform duration-200 scale-95 hover:scale-100  hover:shadow-2xl overflow-hidden h-fit  focus-within:ring-2 focus-within:ring-blue-500shadow-md'>
          <PostCard post={post} />
        </div>
        ))}
      </div>
    </Container>
  </div>
  ) : ( <div className="flex justify-center items-center w-screen h-screen text-3xl gap-2 text-black font-bold ">
  <span>Loading </span>
   <ThreeDot color="#033149" size="medium" text="" textColor="" />
</div>
  )
}

export default AllPosts;