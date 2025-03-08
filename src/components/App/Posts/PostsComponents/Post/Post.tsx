import { formatDistanceToNow } from "date-fns";

import { getDateFromDbString } from "../../../../../utils/dateHelpers";

import PostType from "../../../../../../backendTypes/post";

import Comment from "../Comment/Comment";

import EditIcon from "./pencil.svg";
import DeleteIcon from "./trash-2.svg";
import PublishIcon from "./mail-check.svg";
import UnpublishIcon from "./mail-x.svg";

import styles from "./Post.module.css";
import { useState } from "react";

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

  const postId = id;

  return (
    <>
      {currentAction === "edit" ? (
        <p>ur editing</p>
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
          </div>
          <p className={styles.postTitle}>{title}</p>
          <p className={styles.postedBy}>Posted by</p>
          <p className={styles.postAuthor}>{author.username}</p>
        </div>
        <p className={styles.postContent}>{content}</p>
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
