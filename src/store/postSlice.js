import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
  postBySlug: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: (state, action) => {
      console.log("Payload for postAdded:", action.payload);
      if (Array.isArray(action.payload)) {
        state.posts = action.payload;
      } else {
        const existingPost = state.posts.find(post => post.$id === action.payload.$id);
        if (!existingPost) {
          state.posts.push(action.payload);
        }
      }
    },
    postUpdated: (state, action) => {
      const { $id, title, content, featuredImage, status, userId, slug, postId , category} = action.payload;
      const existingPost = state.posts.find(post => post.$id === $id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
        existingPost.featuredImage = featuredImage;
        existingPost.status = status;
        existingPost.userId = userId;
        existingPost.slug = slug;
        existingPost.postId = postId;
        existingPost.category = category
      }
    },
    postFoundBySlug: (state, action) => {
      state.postBySlug = action.payload
      console.log(state.postBySlug);
    },
  },
});

export const selectPostBySlug = (state, slug) => {
  if (Array.isArray(state.posts.posts)) {
    console.log(state.posts.posts)
    return state.posts.posts.find(post => post.$id === slug);
  }
  return null;
};

export const { postAdded, postUpdated, postFoundBySlug } = postSlice.actions;

export default postSlice.reducer;
