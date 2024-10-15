import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authService from "./appwrite/auth";
import postService from "./appwrite/config";
import { login, logout } from "./store/authSlice";
import { postAdded } from './store/postSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';
import { OrbitProgress } from 'react-loading-indicators';

function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const userData = await authService.getCurrentUser();  // fetching user data
        if (userData) {
          dispatch(login({ userData }));  // storing in user state
          console.log(userData);
          const posts = await postService.getPosts();  // fetching posts
          dispatch(postAdded(posts));  // storing posts[] state
          console.log(posts);
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        dispatch(logout());  // ensure logout on failure
      } finally {
        setLoading(false);  // stop loading once everything is done
      }
    };
    fetchData();
  }, [dispatch]);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-[#ffffff]">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center w-screen h-screen ">
      <OrbitProgress color="#ff3358" size="large" />
    </div>
  );
}

export default App;
