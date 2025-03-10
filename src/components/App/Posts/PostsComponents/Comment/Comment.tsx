import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

import { getDateFromDbString } from "../../../../../utils/dateHelpers";

import CommentType from "../../../../../../backendTypes/comment";

import styles from "./Comment.module.css";
import DeleteComment from "./popups/DeleteComment";

type CommentProps = CommentType & {
  updatePosts: () => void;
};

function Comment({
  id,
  author,
  content,
  uploaded,
  lastModified,
  updatePosts,
}: CommentProps) {
  const [error, setError] = useState<string>("");

  const uploadTimeFromNow = formatDistanceToNow(getDateFromDbString(uploaded), {
    addSuffix: true,
  });

  const editTimeFromNow = formatDistanceToNow(
    getDateFromDbString(lastModified),
    {
      addSuffix: true,
    }
  );

  const timestamp =
    getDateFromDbString(uploaded).getTime() ===
    getDateFromDbString(lastModified).getTime()
      ? `${uploadTimeFromNow}`
      : `${uploadTimeFromNow} • updated ${editTimeFromNow}`;

  return (
    <div className={styles.comment}>
      <div className={styles.commentAuthorContainer}>
        <div className={styles.commentAuthorAndTimestamp}>
          <p className={styles.commentAuthor}>{author.username}</p>
          <p className={styles.commentTimestamp}>{timestamp}</p>
        </div>
        <DeleteComment
          id={Number(id)}
          updatePosts={updatePosts}
          setError={setError}
        />
      </div>
      <p className={styles.commentContent}>{content}</p>
      {error && <p style={{ color: "red", marginTop: 0 }}>{error}</p>}
    </div>
  );
}

export default Comment;
