import { formatDistanceToNow } from "date-fns";

import { getDateFromDbString } from "../../../../../utils/dateHelpers";

import PostType from "../../../../../../backendTypes/post";

import Comment from "../Comment/Comment";

import EditIcon from "./pencil.svg";
import DeleteIcon from "./trash-2.svg";
import PublishIcon from "./mail-check.svg";
import UnpublishIcon from "./mail-x.svg";
import SubmitEditIcon from "./check.svg";
import StopEditIcon from "./pencil-off.svg";

import styles from "./Post.module.css";
import { FormEvent, useState } from "react";

interface PostProps extends PostType {
  postStatus: "published" | "unpublished";
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
}: PostProps) {
  const [currentAction, setCurrentAction] = useState<PostActions>("");
  const [editFields, setEditFields] = useState({
    title,
    content,
  });

  const postId = id;

  const onTitleUpdate = (e: FormEvent<HTMLInputElement>) => {
    setEditFields({ ...editFields, title: e.currentTarget.value });
  };

  const onContentUpdate = (e: FormEvent<HTMLTextAreaElement>) => {
    setEditFields({ ...editFields, content: e.currentTarget.value });
  };

  const onStopEdit = () => {
    setCurrentAction("");

    setEditFields({ title, content });
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
      <div className={styles.post}>
        <div className={styles.postInfo}>
          <div className={styles.postDatesContainer}>
            <p className={styles.postDates}>
              {formatDistanceToNow(getDateFromDbString(uploaded), {
                addSuffix: true,
              })}{" "}
              • updated{" "}
              {/* perhaps check if these two dates are equal. if they are, dont display lastModified date*/}
              {formatDistanceToNow(getDateFromDbString(lastModified), {
                addSuffix: true,
              })}
            </p>
            {currentAction === "edit" ? (
              <div className={styles.postActions}>
                <button
                  type="button"
                  className={styles.submitEditIcon}
                  title="Submit Changes"
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
