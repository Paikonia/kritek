import { useState } from "react";
import "./App.css";
import {
  Post,
  useDeletePostMutation,
  useGetPostsQuery,
  useNewPostMutation,
  useUpdatePostMutation,
} from "./redux/Posts/posts";
function App() {
  const [post, setPost] = useState<Post>({
    id: "",
    title: "",
    body: "",
    views: 0,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showingPost, setShowingPost] = useState("");
  const { data, error, isLoading } = useGetPostsQuery();
  const handlePostClick = (id: string) => {
    if(id === showingPost) setShowingPost('')
    else setShowingPost(id);
  };
  const [
    newPost,
    {
      isLoading: isPosting,
      isError: postingFailed,
      isSuccess: postSuccess,
      error: postError,
    },
  ] = useNewPostMutation();
  const [
    deletePost,
    {
      isLoading: isDeleting,
      isError: deletingFailed,
      isSuccess: deleteSuccess,
      error: deleteError,
    },
  ] = useDeletePostMutation();
  const [
    updatePost,
    {
      isLoading: isUpdating,
      isError: updatingFailed,
      isSuccess: updateSuccess,
      error: updateError,
    },
  ] = useUpdatePostMutation();
  const postToServer = async () => {
    try {
      const { title, body, views } = post;
      if (isEditing) {
        await updatePost({ id: post.id, title, body, views }).unwrap();
      } else {
        await newPost({ title, body, views }).unwrap();
      }
      setPost({
        id: "",
        title: "",
        body: "",
        views: 0,
      });
      setIsEditing(false); // Reset editing state after successful post
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <h1>New Post</h1>
        <div>
          <input
            type="text"
            value={post.title}
            onChange={(e) => {
              setPost((prev) => ({ ...prev, title: e.target.value }));
            }}
            className="shadow-md w-full outline-none shadow-gray-300 py-1 px-2 my-2 border-1 border-gray-100 rounded-xl"
            placeholder="Blog title"
          />
          <textarea
            value={post.body}
            onChange={(e) => {
              setPost((prev) => ({ ...prev, body: e.target.value }));
            }}
            className="shadow-md w-full outline-none shadow-gray-300 py-1 px-2 rounded-xl my-2 border-1 border-gray-100"
            placeholder="Blog Body"
          />
        </div>

        {isPosting && <p>Creating a new Post</p>}
        {isUpdating && <p>updating Post</p>}

        {updatingFailed && <p>Failed to update Post: {updateError?.error}</p>}
        {postingFailed && <p>Failed to create new Post: {postError?.error}</p>}
        {postSuccess && <p>Successfully created new Post</p>}
        {updateSuccess && <p>Successfully updated post</p>}
        <button
          onClick={postToServer}
          disabled={isPosting}
          className="border-2 rounded-xl py-2 w-full px-3 bg-white m-2"
        >
          Create Post
        </button>
      </div>

      <div>
        <h1 className="text-4xl underline font-bold my-4">Posts</h1>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error : {error?.error}</p>}
        {isDeleting && <p>Deleting</p>}
        {deletingFailed && <p>Deleting Failed: {deleteError?.error}</p>}
        {deleteSuccess && <p>Successfully deleted post</p>}
        {data && (
          <div>
            {data.map((post) => (
              <div
                onClick={() => handlePostClick(post.id)}
                key={post.id}
                className=""
              >
                <div className="flex justify-between my-2">
                  <h1 className="text-2xl capitalize font-bold" key={post.id}>
                    {post.title}
                  </h1>
                  <div className="flex justify-between gap-2">
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        setPost(post);
                      }}
                      className="border-2 rounded-md py-1 px-2 "
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        deletePost(post.id);
                      }}
                      className="border-2 rounded-md py-1 px-2 "
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {post.id === showingPost && <p>{post.body}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
