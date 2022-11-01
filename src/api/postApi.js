// Acá importo el archivo desde RTQ
// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

const API = process.env.REACT_APP_API || "http://localhost/API";

// Define a service using a base URL and expected endpoints
// retries para reintentar conn al server


  // INVALIDATIONS - para refecth - providesTags - invalidatesTags


export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: retry(fetchBaseQuery({ baseUrl: API }), {
    maxRetries: 2
  }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getPost: builder.query({
        query: () => "/user?page=1",
        providesTags: ["Posts"],
        headers: {
            'Access-Control-Allow-Origin': '*',            
        },
    }),
    getPostById: builder.query({
        query: (postId) => "/posts/" + postId,
        invalidatesTags: ["Posts"],
    }),
    addNewPost: builder.mutation({
        query: (newPost) => ({
            url: "/posts",
            method: "post",
            body: newPost
        }),
        invalidatesTags: ["Posts"],
        extraOptions: { maxRetries: 0 },
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints - el hook se genera aut. 
export const { useGetPostQuery, useGetPostByIdQuery, useLazyGetPostQuery, useAddNewPostMutation } = postApi;