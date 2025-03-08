import { useEffect, useState } from "react";

import { useAuth } from "../../../context/auth/AuthProvider";

import PostType from "../../../../backendTypes/post";

import Post from "./PostsComponents/Post/Post";

import styles from "./Posts.module.css";

type PostsProps = {
  postStatus: "published" | "unpublished";
};

function Posts({ postStatus }: PostsProps) {
  const [posts, setPosts] = useState<PostType[] | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { user } = useAuth();

  useEffect(() => {
    async function request() {
      try {
        setLoading(true);

        const res = await fetch(`http://localhost:3000/posts/${postStatus}`, {
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
  }, [user, postStatus]);

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
              <Post
                id={id}
                title={title}
                author={author}
                content={content}
                uploaded={uploaded}
                lastModified={lastModified}
                comments={comments}
                postStatus={postStatus}
                key={`post-${id}`}
              />
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
