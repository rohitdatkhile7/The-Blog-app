import React, { useEffect, useState, useRef } from 'react';
import { Button, Container, PostCard } from '../components';
import { useSelector } from 'react-redux';
import { ThreeDot } from 'react-loading-indicators';
import NewPostCard from '../components/NewPostCard';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GridPattern from '../components/GridPattern';

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
          <div className="flex flex-col min-h-screen gap-1  text-center">
            <motion.h1
            className="text-8xl bg-gradient-to-b bg-clip-text mt-20 from-black via-[#361b1b] font-semibold leading-none text-[#361b1b00] shadow-sm"
              initial={{ opacity: 0, y: -150 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              The Art of Blogging
            </motion.h1>
            <motion.p
              className="text-2xl font-light  mb-8"
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
            >
              <button onClick={navigateOnLogin} className="px-6 py-3 bg-white focus:ring-white focus:ring-4  text-black shadow-lg font-semibold rounded-full hover:bg-transparent transition duration-300 mr-4">
                Login
              </button>
              <button onClick={navigateOnSignup} className="px-6 py-3  focus:ring-white focus:ring-4 bg-transparent border border-transparent text-black font-semibold rounded-full 2 border-white  transition duration-300">
                Sign Up
              </button>
            </motion.div>
          </div>
        </Container>
      </div>
    );
  }

  return posts ? (
    <div className='w-full py-4'>
      {/* Animation triggered on mount */}
      <motion.h1
        variants={textVariant}
        initial="hidden"
        animate="visible"
        className='text-4xl font-sans font-semibold ml-32 mx-28 p-5'>
        Latest Articles
      </motion.h1>

      <div className="w-full min-h-screen mx-auto px-4">
        <div className="grid bg-[#f9fafb] shadow-lg rounded-lg p-4 gap-6 mx-28">
          <div className='grid grid-cols-1'>
            <NewPostCard post={featuredPost} isFeatured={true} />
          </div>
          <div className='grid grid-cols-2'>
            {smallPosts.map((post) => (
              <NewPostCard key={post.$id} post={post} />
            ))}
          </div>
        </div>
      </div>

      <Container>
        <div className='flex m-10 justify-center  flex-col  items-center gap-4'>
          {/* Animation triggered when the section is in view */}
          <motion.h1
            variants={textVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className='text-4xl font-bold text-black'>
            Browse by Category
          </motion.h1>
          <motion.p
            variants={textVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className='text-lg font-normal text-gray-500'>
            Select a category to see more related content
          </motion.p>

          {/* Category buttons */}
          <div className="flex gap-5  justify-center items-center  flex-wrap py-12">
            <button className={`text-lg font-medium px-3  py-3  text-nowrap shadow-lg rounded-full hover:text-white hover:bg-black ${categoryPost === 'All' ? 'text-white bg-black ' : ''} bg-[#f9fafb] duration-300`} onClick={() => handleSelectedCategory('All')}>
              All ({categoryPostCount('All')})
            </button>
            <button className={`text-lg font-medium px-4 py-3 shadow-lg text-nowrap rounded-full hover:text-white hover:bg-black ${categoryPost === 'Technology' ? 'text-white bg-black ' : ''} bg-[#f9fafb] duration-300`} onClick={() => handleSelectedCategory('Technology')}>
              Technology ({categoryPostCount('Technology')})
            </button>
            {/* Add other category buttons */}
            <button className={`text-lg font-medium  px-4 py-3 shadow-lg text-nowrap rounded-full  hover:text-white hover:bg-black ${categoryPost === 'Lifestyle' ? 'text-white bg-black ' : ''} bg-[#f9fafb] duration-300`} onClick={() => handleSelectedCategory('Lifestyle')}>
                Lifestyle ({categoryPostCount('Lifestyle')})
              </button>
              <button className={`text-lg font-medium  px-4 py-3 shadow-lg text-nowrap rounded-full hover:text-white hover:bg-black ${categoryPost === 'Travel' ? 'text-white bg-black ' : ''} bg-[#f9fafb] duration-300`} onClick={() => handleSelectedCategory('Travel')}>
                Travel ({categoryPostCount('Travel')}) 
              </button>
              <button className={`text-lg font-medium  px-4 py-3 shadow-lg text-nowrap rounded-full hover:text-white hover:bg-black ${categoryPost === 'Health' ? 'text-white bg-black ' : ''} bg-[#f9fafb] duration-300`} onClick={() => handleSelectedCategory('Health')}>
                Health ({categoryPostCount('Health')})
              </button>
              <button className={`text-lg font-medium  px-4 py-3 shadow-lg text-nowrap rounded-full  hover:text-white hover:bg-black ${categoryPost === 'Culture' ? 'text-white bg-black ' : ''} bg-[#f9fafb] duration-300`} onClick={() => handleSelectedCategory('Culture')}>
              Culture ({categoryPostCount('Culture')})
              </button>
              <button className={`text-lg font-medium  px-4 py-3 shadow-lg text-nowrap rounded-full  hover:text-white hover:bg-black ${categoryPost === 'Sports' ? 'text-white bg-black ' : ''} bg-[#f9fafb] duration-300`} onClick={() => handleSelectedCategory('Sports')}>
              Sports ({categoryPostCount('Sports')})
              </button>
              <button className={`text-lg font-medium  px-4 py-3 shadow-lg text-nowrap rounded-full  hover:text-white hover:bg-black ${categoryPost === 'Education' ? 'text-white bg-black ' : ''} bg-[#f9fafb] duration-300`} onClick={() => handleSelectedCategory('Education')}>
              Education ({categoryPostCount('Education')})
              </button>
              <button className={`text-lg font-medium  px-4 py-3 shadow-lg text-nowrap rounded-full  hover:text-white hover:bg-black ${categoryPost === 'Business' ? 'text-white bg-black ' : ''} bg-[#f9fafb] duration-300`} onClick={() => handleSelectedCategory('Business')}>
              Business ({categoryPostCount('Business')})
              </button>
              <button className={`text-lg font-medium  px-3 py-3 shadow-lg text-nowrap rounded-full  hover:text-white hover:bg-black ${categoryPost === 'Science' ? 'text-white bg-black ' : ''} bg-[#f9fafb] duration-300`} onClick={() => handleSelectedCategory('Science')}>
              Science ({categoryPostCount('Science')})
              </button>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 min-h-screen lg:grid-cols-3 bg-[#f9fafb] gap-3 p-2 rounded-lg'>
          {filterdPosts.map((post) => (
            <div key={post.$id} className='bg-white rounded-lg transition-transform duration-300 scale-95 hover:scale-100 hover:shadow-2xl overflow-hidden h-fit focus-within:ring-2 focus-within:ring-blue-500'>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>

      {/* Animation for Start Creating Blog */}
      <motion.div
        variants={textVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className='flex flex-col items-center justify-center gap-3 w-full p-4 mt-10 py-32 bg-[#ffd2da]'>
        <span className='text-sm m-1 text-[#ff1c46] font-semibold leading-tight'>
          READY TO GET STARTED?
        </span>
        <h1 className='text-4xl m-2 font-semibold mb-4 text-black'>Start Creating Your Own Blog.</h1>
        <Button
          onClick={navigateOnPost}
          className='bg-[#ff1c46] m-2 text-white focus:bg-transparent shadow-lg w-auto focus:ring-[#ffd2da] focus:text-[#ff3358] focus:ring-4 rounded-lg p-2'>
          Create for free
        </Button>
      </motion.div>
    </div>
  ) : (
    <div className="flex justify-center items-center w-screen h-screen text-3xl gap-2 text-black font-bold">
      <span>Loading</span>
      <ThreeDot color="#033149" size="medium" text="" textColor="" />
    </div>
  );
};

export default Home;
