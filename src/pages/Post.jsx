import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { postFoundBySlug } from "../store/postSlice";
import { ThreeDot } from "react-loading-indicators";
import profileImg from "../assets/5034901-200.png";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const userpost = useSelector((state) => state.posts.posts);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (userpost && slug) {
      const slugPost = userpost.find((post) => post.$id === slug);
      if (slugPost) {
        setPost(slugPost);
        dispatch(postFoundBySlug(slugPost));
      } else {
        navigate("/");
      }
    }
  }, [slug, dispatch, navigate, userpost]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate(0);
        navigate("/");
      }
    });
  };

  const CategoryBadge = ({ category }) => {
    const categoryColors = {
      Lifestyle: "text-[#6d28db] bg-[#f6f0fe]",
      Technology: "text-[#2d68f8] bg-[#eff3fe]",
      Travel: "text-[#1a826c] bg-[#eef9f2]",
      Health: "text-[#07a8ae] bg-[#ebf8f8]",
      Culture: "text-[#2280c0] bg-[#ecfbfb]",
      Other: "text-[#ff3358] bg-[#ffd2da]",
      Sports: "text-[#d92f0f] bg-[#ffeceb]",
      Education: "text-[#eab308] bg-[#fef9e7]",
      Business: "text-[#6366f1] bg-[#eef2ff]",
      Science: "text-[#14b8a6] bg-[#e0f7f5]",
    };

    return (
      <span
        className={`${categoryColors[category]} text-md font-semibold mr-2 px-3 py-0.5 rounded-full`}
      >
        {category}
      </span>
    );
  };

  return post ? (
    <div className="py-10 w-full min-h-screen">
      <Container>
        <div className="flex items-center justify-center">
          <CategoryBadge category={post.category} />
        </div>
        <div className="w-full m-5 text-wrap px-4 md:px-16 lg:px-32">
          <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-sans font-bold">
            {post.title}
          </h1>
        </div>
        <div className="w-full flex justify-center m-4 relative border rounded-xl p-4">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl object-cover w-full md:w-2/3 lg:w-1/2"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-600 shadow-xl hover:bg-green-400" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-600 shadow-xl hover:bg-red-400" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="browser-css px-4 md:px-20 lg:px-44 my-5 text-base md:text-lg text-wrap font-sans font-medium">
            {typeof post.content === "string"
              ? parse(post.content)
              : parse(String(post.content))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center mt-10 md:mt-20 items-center gap-4">
          <div className="flex items-center">
            <img
              src={profileImg}
              alt={post.author}
              className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 mr-3 rounded-full bg-gray-200"
            />
            <span className="text-md text-gray-700">{post.author}</span>
          </div>

          <span className="text-md text-right text-gray-700">
            {new Date(post.$createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </Container>
    </div>
  ) : (
    <div className="flex justify-center items-center w-screen h-screen text-2xl md:text-3xl gap-2 text-black font-bold">
      <span>Loading </span>
      <ThreeDot color="#033149" size="medium" text="" textColor="" />
    </div>
  );
}
