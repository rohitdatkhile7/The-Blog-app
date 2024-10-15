import parse from "html-react-parser";
import profileImg from "../assets/5034901-200.png"
import appwriteService from "../appwrite/config";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CardBody ,CardItem, CardContainer } from "./AnimatedCard";

function NewPostCard({ post, isFeatured = false }) {

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.slice(0, maxLength) + "....." : text;
      };

      function NewBadge({isFeatured}){
         return isFeatured?(
          <div className=" text-center font-semibold bg-yellow-500 text-white rounded-full flex  px-3 py-1 mb-2 text-xs w-auto">New</div>
        ):''
      }

    return (
      <CardContainer className="w-full h-full inter-var">
      <CardBody className={` p-4 bg-white overflow-hidden rounded-xl sm:px-4 ${isFeatured ? 'md:col-span-2' : ''}`}>
        <Link to={`/post/${post.$id}`} >
          <CardItem translateZ={"100"} >
        <img
          src={appwriteService.getFilePreview(post.featuredImage)}
          alt={post.title}
          className={` object-cover  ${isFeatured? 'h-96' : 'h-52'} w-full  rounded-xl hover:shadow-2xl` }
        />
        </CardItem>
        <div className={`absolute w-auto inset-0  rounded-xl hover:shadow-2xl  bg-opacity-0 bg-gradient-to-t from-[#181818da] via-[#2f2f2f59] to-[#1e1e1e00]  flex flex-col justify-end m-2 sm:m-4 p-4 `}>
          <CardItem translateZ={"50"} as="span" className={`flex gap-2`}>
            <NewBadge isFeatured={isFeatured} />
            <span className={`py-1 mb-2 text-xs text-white px-3 w-auto text-center font-semibold rounded-full ${
            
            post.category === 'Lifestyle' ? "bg-purple-500" :
            post.category === 'Technology' ? 'bg-blue-500' :
            post.category === 'Travel' ? "bg-orange-500" :
            post.category === 'Health' ? "bg-green-500" :
            post.category === 'Culture' ? "bg-[#ff3358]" :
            post.category === 'Other' ? "bg-pink-600" :
            post.category === 'Sports' ? "bg-red-500" : 
            post.category === 'Education' ? "bg-yellow-500" :
            post.category === 'Business' ? "bg-indigo-500" :
            post.category === 'Science' ? "bg-teal-500" :
            'bg-sky-500'

           }`}>{post.category}</span>
          </CardItem>
          <CardItem  translateZ={"50"} as="h2">
          <h2 className={`text-white font-bold mb-2 ${isFeatured ? 'text-3xl' : 'text-xl'}`}>{post.title}</h2>
          </CardItem>
          <CardItem translateZ={"50"} as="p">
          {isFeatured &&<p className="text-gray-100 mb-4 line-clamp-3">
          {typeof post.content === 'string'
            ? parse(truncateText(post.content, 200))
            : parse(truncateText(String(post.content), 200))
          }
        </p>}
        </CardItem>
          <div className="flex ">
            <div className="h-8 w-8 mr-2">
            <img
            src={profileImg}
            alt={post.author}
            className="w-5 h-5 rounded-full bg-gray-200 "
          />
            </div>
            <span className="text-sm text-gray-200">{post.author}</span>
            <span className="text-sm text-gray-300 ml-auto">{new Date(post.$createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
          </div>
        </div>
        </Link>
      </CardBody>
      </CardContainer>
    )
  }
export default NewPostCard;