import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Post = {
  id: string;
  title: string;
  views: number;
  body: string;
};

export const postAPI = createApi({
  reducerPath: "getPosts",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => `posts`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Posts", id } as const)),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
    }),
    newPost: builder.mutation<Post[],{ title: string; views: number; body: string }>({
      query: (post) => ({ url: `posts`, method: "post", body: post }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }]
    }),
    updatePost: builder.mutation<Post, Partial<Post> & Pick<Post, "id">>({
      query: ({ id, ...post }) => ({
        url: `posts/${id}`,
        method: "patch",
        body: post,
      }),
      invalidatesTags: (_result, _error, {id}) => [{type: 'Posts', id}]
    }),
    deletePost: builder.mutation<Post, string>({
      query: (id) => {
        console.log({ id });
        return { url: `posts/${id}`, method: "delete" };
      },
      invalidatesTags: (_result, _error, id) => [{type: 'Posts', id}]
    }),
  }),
});

export const {
  useGetPostsQuery,
  useNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postAPI;
