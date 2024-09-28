import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select} from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postAdded, postUpdated } from "../../store/postSlice";
// import { Select, Option } from "@material-tailwind/react";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
      category: post?.category || "Other",
      author:post?.author || ""
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    try {
      const file = data.featuredImage[0] ? await appwriteService.uploadFile(data.featuredImage[0]) : 
     null
      if (post) {
        if (file) {
          await appwriteService.deleteFile(post.featuredImage);
        }
  
        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : post.featuredImage,
        });
  
        if (dbPost) {
          dispatch(postUpdated(dbPost));
          
          console.log(dbPost);
          navigate(`/post/${dbPost.$id}`);
        }
        
      } else {
        if (file) {
          data.featuredImage = file.$id;
        }
  
        const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
  
        if (dbPost) {
          dispatch(postAdded(dbPost));
          console.log(dbPost)
          navigate(`/post/${dbPost.$id}`);
        } else {
          console.error("Unexpected response structure:", dbPost);
        }
      }
    } catch (error) {
      console.error("Failed to submit post:", error);
    }
  };
  

  const slugTransform = (value) => {
    if (value && typeof value === "string") {
      let slug = value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-") // Replace non-alphanumeric characters
        .replace(/\s+/g, "-"); // Replace spaces with a single dash
  
      // Ensure the slug length is between 20 and 25 characters
      if (slug.length > 25) {
        slug = slug.slice(0, 25);
      } else if (slug.length < 20) {
        slug = slug.padEnd(20, "-"); // Pad with dashes to reach 20 characters
      }
  
      return slug;
    }
    return "";
  };
  
  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
  
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);
  
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
        <Input
          label="Author :"
          className="mb-4"
          value={userData.name}
          onInput={(e) => e.target.value}
          {...register("author", { required: true })}
          
        />

     <div className="w-72">
     Select Category
       <Select 
       options={["Technology", "Lifestyle", "Travel", "Health", "Culture", "Other"]}
          label="Select Category"
          className="mb-4"
          {...register("category", { required: true })}
       />
     </div>
 
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("featuredImage", { required: !post })}
        />

        {post && post.featuredImage && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
