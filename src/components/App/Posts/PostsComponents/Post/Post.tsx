import { FormEvent, useState } from "react";
import { formatDistanceToNow } from "date-fns";

import { getDateFromDbString } from "../../../../../utils/dateHelpers";

import PostType from "../../../../../../backendTypes/post";

import { useAuth } from "../../../../../context/auth/AuthProvider";

import Comment from "../Comment/Comment";

import EditIcon from "./pencil.svg";
import DeleteIcon from "./trash-2.svg";
import PublishIcon from "./mail-check.svg";
import UnpublishIcon from "./mail-x.svg";
import SubmitEditIcon from "./check.svg";
import StopEditIcon from "./pencil-off.svg";

import styles from "./Post.module.css";

interface PostProps extends PostType {
  postStatus: "published" | "unpublished";
  updatePosts: () => void;
}

type PostActions = "edit" | "publish" | "unpublish" | "delete" | "";

function Post({
  id,
  title,
  author,
  content,
  uploaded,
  lastModified,
  comments,
  postStatus,
  updatePosts,
}: PostProps) {
  const [currentAction, setCurrentAction] = useState<PostActions>("");
  const [editFields, setEditFields] = useState({
    title,
    content,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { user } = useAuth();

  const postId = id;

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

    if (!changesMade) return setCurrentAction("");

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
          setCurrentAction("");

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
      setCurrentAction("");

      setEditFields({ title, content });
    }
  };

  // for edit action:
  /*
    when currentAction === "editing", hide all other actions

    ^ show "stop editing" and "submit changes" options instead

    make post title and content into inputs
    content should be a textarea
  */

  // for (un)publish action:
  /*
    just show a dialog asking if user wants to (un)publish
  */

  // for delete action:
  /*
    just show a dialog asking if user wants to delete
  */

  return (
    <>
      {currentAction === "edit" ? (
        ""
      ) : currentAction === "publish" ? (
        <p>ur publishing</p>
      ) : currentAction === "unpublish" ? (
        <p>ur unpublishing</p>
      ) : currentAction === "delete" ? (
        <p>ur deleting</p>
      ) : (
        ""
      )}
      {loading && <p className={styles.loadingText}>Updating...</p>}
      <div className={loading ? styles.postBlur : styles.post}>
        <div className={styles.postInfo}>
          <div className={styles.postDatesContainer}>
            <p className={styles.postDates}>
              {error
                ? error
                : `${uploadTimeFromNow} • updated ${editTimeFromNow}`}
            </p>
            {currentAction === "edit" ? (
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
                  className={styles.editPostIcon}
                  title="Edit Post"
                  onClick={() => setCurrentAction("edit")}
                >
                  <img src={EditIcon} alt="Edit Post" />
                </button>
                {postStatus === "published" ? (
                  <button
                    type="button"
                    className={styles.unpublishPostIcon}
                    title="Unpublish Post"
                    onClick={() => setCurrentAction("unpublish")}
                  >
                    <img src={UnpublishIcon} alt="Unpublish Post" />
                  </button>
                ) : (
                  <button
                    type="button"
                    className={styles.publishPostIcon}
                    title="Publish Post"
                    onClick={() => setCurrentAction("publish")}
                  >
                    <img src={PublishIcon} alt="Publish Post" />
                  </button>
                )}
                <button
                  type="button"
                  className={styles.deletePostIcon}
                  title="Delete Post"
                  onClick={() => setCurrentAction("delete")}
                >
                  <img src={DeleteIcon} alt="Delete Post" />
                </button>
              </div>
            )}
          </div>
          {currentAction === "edit" ? (
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
        {currentAction === "edit" ? (
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
