import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const BASE_URL =
    "https://13f050e7-980e-4561-a7bc-3da8dc292838-00-1bdkm6skn8y6f.riker.replit.dev"
export const fetchPostsByUser = createAsyncThunk(
    "posts/fetchByUser",
    async (userId) => {
        const response = await axios.get(`${BASE_URL}/posts/${userId}`);

        return response.data;
    }
);

export const savePost = createAsyncThunk(
    "posts/savePost",
    async (postContent) => {
        const token = localStorage.getItem("authToken");
        const decode = jwtDecode(token);
        const userId = decode.id;

        const data = {
            title: "No Title",
            content: postContent,
            user_id: userId,
        };
        const response = await axios.post(`${BASE_URL}/posts`, data);
        return response.data;
    }
);

export const deletePost = createAsyncThunk(
    "posts/deletePost",
    async (id, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("authToken");
            const decode = jwtDecode(token);
            const userId = decode.id;

            await axios.delete(`${BASE_URL}/posts/${id}`, {
                data: { user_id: userId }
            });
            return { id: id };
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
)

export const updatePost = createAsyncThunk(
    "posts/updatePost",
    async (postContent, postId) => {

        const token = localStorage.getItem("authToken");
        const decode = jwtDecode(token);
        const userId = decode.id;

        const data = {
            title: "Updated Post",
            content: postContent,
            user_id: userId
        }
        const response = await axios.update(`${BASE_URL}/posts/${postId}`, data);
        return response.data;
    }
)

const postsSlice = createSlice({
    name: "posts",
    initialState: { posts: [], loading: true },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPostsByUser.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.loading = false
        });
        builder.addCase(savePost.fulfilled, (state, action) => {
            state.posts = [action.payload, ...state.posts];
        })
        builder.addCase(deletePost.fulfilled, (state, action) => {
            state.posts = state.posts.filter(post => post.id !== action.payload.id);
        });
    },
});

export default postsSlice.reducer;
