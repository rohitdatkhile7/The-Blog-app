'use client';
import React, { useEffect, useState } from 'react';
import { Button, Container, PostCard } from '../components';
import { useSelector } from 'react-redux';
import { ThreeDot } from 'react-loading-indicators';
import NewPostCard from '../components/NewPostCard';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GridPattern from '../components/GridPattern';
import { FlipWords } from '../components/FlipWords';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const userposts = useSelector(state => state.posts.posts);
  const [categoryPost, setcategoryPost] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    if (userposts && userposts.length > 0) {
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

  const handleSelectedCategory = (category) => {
    setcategoryPost(category);
  };

  const filterdPosts = categoryPost === 'All' ? posts : posts.filter((post) => post.category === categoryPost);

  const categoryPostCount = (categoryPost) => {
    return categoryPost === 'All' ? posts.length : posts.filter((post) => post.category === categoryPost).length;
  };

  const navigateOnPost = () => {
    navigate('/add-post');
  };
  const navigateOnLogin = () => {
    navigate('/login')
  }
  const navigateOnSignup = () => {
    navigate('/signup')
  }

  const sortedPosts = [...posts].sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));
  const featuredPost = sortedPosts[0];
  const smallPosts = sortedPosts.slice(1, 3);

  if (posts.length === 0) {
    const words = ["better", "cute", "beautiful", "modern"];
    return (
      <div className="relative w-full bg-gradient-to-t from-[#ff2323] via-[#ffb7b7] to-[#ffffff] text-black">
        <GridPattern
          numSquares={50}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className="[mask-image:radial-gradient(500px_circle_at_center,white,transparent)] absolute w-full inset-0 h-screen"
        />

        <Container>
          <div className="flex flex-col min-h-screen gap-1 text-center px-4 sm:px-8">
            <motion.h1
              className="text-7xl sm:text-8xl bg-gradient-to-b bg-clip-text mt-20 mb-4 from-black via-[#361b1b] font-semibold leading-none text-[#361b1b00] shadow-sm"
              initial={{ opacity: 0, y: -150 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              The Art of Blogging
            </motion.h1>
            <motion.p
              className="text-lg sm:text-2xl font-light mb-8 px-4 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Create blogs that are as unique and beautiful as your ideas.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex  flex-row justify-center items-center gap-4"
            >
              <button
                onClick={navigateOnLogin}
                className="px-6 py-3 bg-white focus:ring-white focus:ring-4 text-black shadow-lg font-semibold rounded-full hover:bg-transparent transition duration-300"
              >
                Login
              </button>
              <button
                onClick={navigateOnSignup}
                className="px-6 py-3 focus:ring-white focus:ring-4 bg-transparent border border-white text-black font-semibold rounded-full hover:bg-white hover:text-black transition duration-300"
              >
                Sign Up
              </button>
            </motion.div>
            <motion.div
              className="text-3xl sm:text-5xl absolute bottom-20 left-5 sm:left-10 font-light text-black text-center"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Create
              <FlipWords words={words} className='p-2 text-white font-normal inline-block' /> 
              Blog with The Blog's
            </motion.div>
          </div>
        </Container>
      </div>
    );
  }

  return posts ? (
    <div className='w-full py-4 px-4 sm:px-6 lg:px-8 m-2'>
      <motion.h1
        variants={textVariant}
        initial="hidden"
        animate="visible"
        className='text-3xl sm:text-4xl font-sans font-semibold sm:text-left sm:ml-28 p-1 text-center  '
      >
        Latest Articles
      </motion.h1>

      <div className="w-full min-h-screen mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1  bg-[#f9fafb] shadow-lg rounded-lg p-4 sm:mx-24 gap-6">
          <div className='col-span-1'>
            <NewPostCard post={featuredPost} isFeatured={true} />
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            {smallPosts.map((post) => (
              <NewPostCard key={post.$id} post={post} />
            ))}
          </div>
        </div>
      </div>

      <Container>
        <div className='flex flex-col items-center justify-center gap-4 my-10 px-4 sm:px-8'>
          <motion.h1
            variants={textVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className='text-3xl sm:text-4xl font-bold text-black mb-2'
          >
            Browse by Category
          </motion.h1>
          <motion.p
            variants={textVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className='text-base sm:text-lg font-normal text-gray-500 mb-6'
          >
            Select a category to see more related content
          </motion.p>

          {/* Category Buttons */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
            {['All', 'Technology', 'Lifestyle', 'Travel', 'Health', 'Culture', 'Sports', 'Education', 'Business', 'Science'].map((category) => (
              <button
                key={category}
                className={`text-sm sm:text-lg font-medium px-4 py-2 sm:px-6 sm:py-3 shadow-lg rounded-full hover:text-white hover:bg-black transition duration-300 ${
                  categoryPost === category ? 'text-white bg-black' : 'text-black bg-[#f9fafb]'
                }`}
                onClick={() => handleSelectedCategory(category)}
              >
                {category} ({categoryPostCount(category)})
              </button>
            ))}
          </div>
        </div>

        {/* Filtered Posts Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2 bg-[#f9fafb] rounded-lg'>
          {filterdPosts.map((post) => (
            <div
              key={post.$id}
              className='bg-white rounded-lg transition-transform duration-300 scale-95 hover:scale-100 hover:shadow-2xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500'
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>

      {/* Call to Action Section */}
      <motion.div
        variants={textVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className='flex flex-col items-center justify-center gap-3 w-full  mt-10 py-16 bg-[#ffd2da] rounded-lg '
      >
        <span className='text-sm sm:text-base text-[#ff1c46] font-semibold leading-tight'>
          READY TO GET STARTED?
        </span>
        <h1 className='text-2xl sm:text-4xl font-semibold mb-4 text-black text-center'>
          Start Creating Your Own Blog.
        </h1>
        <Button
          onClick={navigateOnPost}
          className='bg-[#ff1c46] text-white focus:bg-transparent shadow-lg w-auto focus:ring-[#ffd2da] focus:text-[#ff3358] focus:ring-4 rounded-lg p-3 sm:px-6 sm:py-3'
        >
          Create for Free
        </Button>
      </motion.div>
    </div>
  ) : (
    <div className="flex justify-center items-center w-screen h-screen text-2xl sm:text-3xl gap-2 text-black font-bold px-4">
      <span>Loading</span>
      <ThreeDot color="#033149" size="medium" text="" textColor="" />
    </div>
  );
};

export default Home;
