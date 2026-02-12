import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    posts: [],
    total: 0,
  },
  reducers: {
    setBlogs: (state, action) => {
      state.posts = action.payload.posts;
      state.total = action.payload.total;
    },
  },
});

export const { setBlogs } = blogSlice.actions;
export default blogSlice.reducer;
