import { useEffect, useState } from "react";

import { useAuth } from "../../../context/auth/AuthProvider";

import PostType from "../../../../backendTypes/post";

import Post from "./PostsComponents/Post/Post";

import styles from "./Posts.module.css";
import { PostContextProvider } from "../../../context/PostContextProvider";

type PostsProps = {
  postStatus: "published" | "unpublished";
};

function Posts({ postStatus }: PostsProps) {
  const [posts, setPosts] = useState<PostType[] | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);

  const { user } = useAuth();

  const onPostsUpdate = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    async function request() {
      try {
        setPosts(undefined);

        setLoading(true);

        const endpoint = import.meta.env.VITE_MY_BLOG_API;

        const res = await fetch(`${endpoint}/posts/${postStatus}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user}`,
          },
        });

        const parsed = await res.json();

        setPosts(parsed);
      } catch (err: unknown) {
        setError(String(err));
      } finally {
        setLoading(false);
      }
    }

    request();
  }, [user, postStatus, refresh]);

  return (
    <div className={styles.posts}>
      {loading && <p>loading...</p>}
      {error && <p>error getting posts</p>}
      {posts && !loading ? (
        <>
          <h2 className={styles.postsHeader}>
            {postStatus === "published" ? "Published" : "Unpublished"} Posts
          </h2>
          {posts.map(
            ({
              id,
              title,
              author,
              content,
              uploaded,
              lastModified,
              comments,
            }) => (
              <PostContextProvider
                postId={id}
                postStatus={postStatus}
                updatePosts={onPostsUpdate}
                key={`post-${id}`}
              >
                <Post
                  title={title}
                  author={author}
                  content={content}
                  uploaded={uploaded}
                  lastModified={lastModified}
                  comments={comments}
                />
              </PostContextProvider>
            )
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Posts;
