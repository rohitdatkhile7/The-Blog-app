import React, { useEffect, useState } from 'react';
import { Container, PostForm } from '../components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThreeDot } from 'react-loading-indicators';

function EditPost() {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const userpost = useSelector((state) => state.posts.postBySlug);

  useEffect(() => {
    if (userpost) {
      setPost(userpost);
    } else {
      navigate('/');
    }
  }, [navigate, userpost]);

  console.log("post editing: ", post);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : (
    <div className="flex justify-center items-center w-full h-screen">
      <ThreeDot color="#033149" size="medium" text="" textColor="" />
    </div>
  );
}

export default EditPost;
