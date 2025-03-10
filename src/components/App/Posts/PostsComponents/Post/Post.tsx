import { FormEvent, useState } from "react";
import { formatDistanceToNow } from "date-fns";

import { getDateFromDbString } from "../../../../../utils/dateHelpers";

import CommentType from "../../../../../../backendTypes/comment";

import { useAuth } from "../../../../../context/auth/AuthProvider";
import { usePostContext } from "../../../../../context/PostContextProvider";

import PublishToggle from "./popups/PublishToggle";
import DeletePost from "./popups/DeletePost";
import Comment from "../Comment/Comment";

import EditIcon from "./pencil.svg";
import SubmitEditIcon from "./check.svg";
import StopEditIcon from "./pencil-off.svg";

import styles from "./Post.module.css";

interface PostProps {
  title: string;
  author: {
    username: string;
  };
  content: string;
  uploaded: string;
  lastModified: string;
  comments: CommentType[];
}

function Post({
  title,
  author,
  content,
  uploaded,
  lastModified,
  comments,
}: PostProps) {
  const [editing, setEditing] = useState<boolean>(false);
  const [editFields, setEditFields] = useState({
    title,
    content,
  });

  const { postId, loading, setLoading, updatePosts, setError, error } =
    usePostContext();
  const { user } = useAuth();

  const uploadTimeFromNow = formatDistanceToNow(getDateFromDbString(uploaded), {
    addSuffix: true,
  });

  const editTimeFromNow = formatDistanceToNow(
    getDateFromDbString(lastModified),
    {
      addSuffix: true,
    }
  );

  const onTitleUpdate = (e: FormEvent<HTMLInputElement>) => {
    if (!loading) {
      setEditFields({ ...editFields, title: e.currentTarget.value });
    }
  };

  const onContentUpdate = (e: FormEvent<HTMLTextAreaElement>) => {
    if (!loading) {
      setEditFields({ ...editFields, content: e.currentTarget.value });
    }
  };

  const onEditConfirm = async () => {
    const changesMade =
      editFields.title !== title || editFields.content !== content;

    if (!changesMade) return setEditing(false);

    if (!loading) {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:3000/posts/edit", {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user}`,
          },
          body: JSON.stringify({ ...editFields, postId }),
        });

        const parsed = await res.json();

        const { message } = parsed;

        if (res.ok) {
          setEditing(false);

          updatePosts();
        } else {
          setError(message);
        }
      } catch (err: unknown) {
        console.error(err);

        setError("Error. Please confirm your changes again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const onStopEdit = () => {
    if (!loading) {
      setEditing(false);

      setEditFields({ title, content });
    }
  };

  return (
    <>
      {loading && <p className={styles.loadingText}>Updating...</p>}
      <div className={loading ? styles.postBlur : styles.post}>
        <div className={styles.postInfo}>
          <div className={styles.postDatesContainer}>
            <p className={styles.postDates}>
              {error
                ? error
                : `${uploadTimeFromNow} • updated ${editTimeFromNow}`}
            </p>
            {editing ? (
              <div className={styles.postActions}>
                <button
                  type="button"
                  className={styles.submitEditIcon}
                  title="Submit Changes"
                  onClick={onEditConfirm}
                >
                  <img src={SubmitEditIcon} alt="Submit Changes" />
                </button>
                <button
                  type="button"
                  className={styles.stopEditIcon}
                  title="Stop Editing"
                  onClick={onStopEdit}
                >
                  <img src={StopEditIcon} alt="Stop Editing" />
                </button>
              </div>
            ) : (
              <div className={styles.postActions}>
                <button
                  type="button"
                  title="Edit Post"
                  onClick={() => setEditing(true)}
                >
                  <img src={EditIcon} alt="Edit Post" />
                </button>
                <PublishToggle />
                <DeletePost />
              </div>
            )}
          </div>
          {editing ? (
            <input
              type="text"
              name="newTitle"
              id="newTitle"
              className={styles.newTitleInput}
              value={editFields.title}
              onChange={onTitleUpdate}
            />
          ) : (
            <p className={styles.postTitle}>{title}</p>
          )}
          <p className={styles.postedBy}>Posted by</p>
          <p className={styles.postAuthor}>{author.username}</p>
        </div>
        {editing ? (
          <textarea
            name="newContent"
            id="newContent"
            className={styles.newContentTextarea}
            cols={120}
            rows={10}
            value={editFields.content}
            onChange={onContentUpdate}
          ></textarea>
        ) : (
          <p className={styles.postContent}>{content}</p>
        )}
        <div className={styles.postComments}>
          {comments.map(({ id, author, content, uploaded, lastModified }) => (
            <Comment
              author={author}
              content={content}
              uploaded={uploaded}
              lastModified={lastModified}
              key={`post-${postId}-comment-${id}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Post;
