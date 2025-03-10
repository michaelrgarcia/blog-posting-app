import { FormEvent, useState } from "react";

import { useAuth } from "../../../context/auth/AuthProvider";

import Input from "../../Form/FormComponents/Inputs/Input";
import Textarea from "../../Form/FormComponents/Textarea/Textarea";

import styles from "./NewPost.module.css";

function NewPost() {
  const [postDetails, setPostDetails] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { user } = useAuth();

  const onTitleUpdate = (e: FormEvent<HTMLInputElement>) => {
    setPostDetails({ ...postDetails, title: e.currentTarget.value });
  };

  const onContentUpdate = (e: FormEvent<HTMLTextAreaElement>) => {
    setPostDetails({ ...postDetails, content: e.currentTarget.value });
  };

  const onCreate = async () => {
    if (!postDetails.title && !postDetails.content)
      return setError("A title and content are required.");

    if (!postDetails.title) return setError("A title is required.");

    if (!postDetails.content) return setError("Content is required.");

    if (!loading) {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:3000/posts/create", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user}`,
          },
          body: JSON.stringify({
            ...postDetails,
            authorId: 1,
            published: true,
          }),
        });

        const { message } = await res.json();

        if (res.ok) {
          setPostDetails({
            title: "",
            content: "",
          });

          setLoading(false);
        } else {
          setError(message);
        }
      } catch (err: unknown) {
        console.error(err);

        setError("Error. Please try creating the post again.");
      }
    } else {
      setError("Please wait for the creation of the current post.");
    }
  };

  const onDraft = async () => {
    if (!postDetails.title && !postDetails.content)
      return setError("A title and content are required.");

    if (!postDetails.title) return setError("A title is required.");

    if (!postDetails.content) return setError("Content is required.");

    if (!loading) {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:3000/posts/create", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user}`,
          },
          body: JSON.stringify({
            ...postDetails,
            authorId: 1,
            published: false,
          }),
        });

        const { message } = await res.json();

        if (res.ok) {
          setPostDetails({
            title: "",
            content: "",
          });

          setLoading(false);
        } else {
          setError(message);
        }
      } catch (err: unknown) {
        console.error(err);

        setLoading(false);

        setError("Error. Please try drafting the post again.");
      }
    } else {
      setError("Please wait for the current post to draft.");
    }
  };

  return (
    <>
      <form className={styles.newPostForm}>
        <h2 className={styles.newPostHeader}>New Post</h2>
        {error && <p className={styles.newPostError}>{error}</p>}
        {loading && <p style={{ textAlign: "left" }}>Submitting...</p>}
        <Input
          id="title"
          labelText="Title"
          value={postDetails.title}
          onChange={(e) => onTitleUpdate(e)}
          type="text"
        />
        <Textarea
          id="content"
          labelText="Content"
          value={postDetails.content}
          onChange={(e) => onContentUpdate(e)}
          cols={120}
          rows={10}
        />
        <div className={styles.newPostActions}>
          <button type="button" onClick={onCreate}>
            Create
          </button>
          <button type="button" onClick={onDraft}>
            Draft
          </button>
        </div>
      </form>
    </>
  );
}

export default NewPost;
