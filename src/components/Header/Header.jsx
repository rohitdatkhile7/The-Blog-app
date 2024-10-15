import React from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SearchBar from '../SearchBar';  


function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus, 
      className: "focus:ring-4 focus:outline-none focus:bg-transparent focus:ring-[#ffd2da] focus:text-[#ff3358]"
    },
    { name: 'Signup', slug: '/signup', active: !authStatus,
      className: "bg-[#ff1c46] text-white shadow-lg focus:bg-transparent focus:ring-[#ffd2da] focus:text-[#ff3358] focus:ring-4"
    },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ];

  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className='py-2 md:py-3 shadow bg-background/60 backdrop-blur top-0 sticky z-50'>
      <Container>
        <nav className='flex items-center'>
          <div className='mr-2 md:mr-4'>
            <Link to='/'>
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <ul className='flex ml-auto sm:space-x-6'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    onClick={() => navigate(item.slug)}
                    className={`hidden sm:flex sm:px-4 sm:py-2 ${item.className} rounded-full hover:bg-[#ffd2da] hover:text-[#ff3358]`}
                  >
                    {item.name}
                  </motion.button>
                </li>
              ) : null
            )}

            {authStatus && (
              <div className='hidden sm:flex justify-center items-center sm:gap-4'>
                <motion.li
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  onClick={toggleSearch} // Open Search Modal on icon click
                >
                  <svg className='fill-current cursor-pointer p-2 shadow-lg bg-[#ffd2da] rounded-full' width='40' height='35' viewBox='0 0 20 20'>
                    {/* Search icon path */}
                    <path d='M19.1875 17.4063L14.0313 13.2188C16.1563 10.3125 15.9375 6.15625 13.2812 3.53125C11.875 2.125 10 1.34375 8 1.34375C6 1.34375 4.125 2.125 2.71875 3.53125C-0.1875 6.4375 -0.1875 11.1875 2.71875 14.0938C4.125 15.5 6 16.2813 8 16.2813C9.90625 16.2813 11.6875 15.5625 13.0938 14.2813L18.3125 18.5C18.4375 18.5938 18.5938 18.6563 18.75 18.6563C18.9688 18.6563 19.1562 18.5625 19.2812 18.4063C19.5312 18.0938 19.5 17.6563 19.1875 17.4063ZM8 14.875C6.375 14.875 4.875 14.25 3.71875 13.0938C1.34375 10.7188 1.34375 6.875 3.71875 4.53125C4.875 3.375 6.375 2.75 8 2.75C9.625 2.75 11.125 3.375 12.2812 4.53125C14.6562 6.90625 14.6562 10.75 12.2812 13.0938C11.1562 14.25 9.625 14.875 8 14.875Z' />
                  </svg>
                </motion.li>
                <li>
                  <LogoutBtn />
                </li>
              </div>
            )}
          </ul>

          {/* Mobile Search + Menu Buttons */}
          <div className='flex sm:hidden ml-auto items-center space-x-4'>
            {/* Search Button for Mobile */}
            {authStatus && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleSearch}
              >
                 <svg className='fill-current cursor-pointer p-2 shadow-lg bg-[#ffd2da] rounded-full' width='35' height='35' viewBox='0 0 20 20'>
                    {/* Search icon path */}
                    <path d='M19.1875 17.4063L14.0313 13.2188C16.1563 10.3125 15.9375 6.15625 13.2812 3.53125C11.875 2.125 10 1.34375 8 1.34375C6 1.34375 4.125 2.125 2.71875 3.53125C-0.1875 6.4375 -0.1875 11.1875 2.71875 14.0938C4.125 15.5 6 16.2813 8 16.2813C9.90625 16.2813 11.6875 15.5625 13.0938 14.2813L18.3125 18.5C18.4375 18.5938 18.5938 18.6563 18.75 18.6563C18.9688 18.6563 19.1562 18.5625 19.2812 18.4063C19.5312 18.0938 19.5 17.6563 19.1875 17.4063ZM8 14.875C6.375 14.875 4.875 14.25 3.71875 13.0938C1.34375 10.7188 1.34375 6.875 3.71875 4.53125C4.875 3.375 6.375 2.75 8 2.75C9.625 2.75 11.125 3.375 12.2812 4.53125C14.6562 6.90625 14.6562 10.75 12.2812 13.0938C11.1562 14.25 9.625 14.875 8 14.875Z' />
                  </svg>
              </motion.button>
            )}

            {/* Mobile Menu Button */}
            <motion.button onClick={toggleMenu} whileTap={{ scale: 0.3 }}>
              {isMenuOpen ? (
                <svg
                  className='w-8 h-8 fill-current text-black '
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M18.36 6.64L17 5.27L12 10.27L7 5.27L5.64 6.64L10.64 11.64L5.64 16.64L7 18.01L12 13.01L17 18.01L18.36 16.64L13.36 11.64L18.36 6.64Z' />
                </svg>
              ) : (
                <svg
                  className='w-8 h-8 fill-current text-black '
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M3 12H21V10H3V12ZM3 6H21V4H3V6ZM3 18H21V16H3V18Z' />
                </svg>
              )}
            </motion.button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.ul
            className='sm:hidden absolute right-0 shadow-xl rounded-xl bg-white p-4 w-[75%] flex flex-col space-y-2 mt-1'
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 90 }}
          >
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      navigate(item.slug);
                      toggleMenu(); // Close the menu after clicking
                    }}
                    className={`block w-full text-left px-4 py-3 mx-2 ${item.className} rounded-lg hover:bg-[#ffd2da] hover:text-[#ff3358]`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li className='mt-5 ml-3'>
                <LogoutBtn />
              </li>
            )}
          </motion.ul>
        )}
      </Container>

      {/* Render SearchBar component, passing toggle function */}
      {isSearchOpen && <SearchBar toggleSearch={toggleSearch} />}
    </header>
  );
}

export default Header;
