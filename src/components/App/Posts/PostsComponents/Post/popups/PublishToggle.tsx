import { useAuth } from "../../../../../../context/auth/AuthProvider";
import { Dialog } from "../../../../../../context/DialogProvider";

import DialogTrigger from "../../../../../Dialog/DialogTrigger";
import DialogContent from "../../../../../Dialog/DialogContent";
import DialogHeading from "../../../../../Dialog/DialogHeading";
import DialogDescription from "../../../../../Dialog/DialogDescription";
import DialogClose from "../../../../../Dialog/DialogClose";

import PublishIcon from "../mail-check.svg";
import UnpublishIcon from "../mail-x.svg";

import styles from "./popups.module.css";
import { usePostContext } from "../../../../../../context/PostContextProvider";

function PublishToggle() {
  const { postId, postStatus, loading, setLoading, updatePosts, setError } =
    usePostContext();
  const { user } = useAuth();

  const onConfirm = async () => {
    if (!loading) {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:3000/posts/edit", {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user}`,
          },
          body: JSON.stringify({
            postId,
            published: postStatus === "published" ? false : true,
          }),
        });

        const parsed = await res.json();

        const { message } = parsed;

        if (res.ok) {
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

  return (
    <>
      {postStatus === "published" ? (
        <Dialog>
          <DialogTrigger title="Unpublish Post">
            <img src={UnpublishIcon} alt="Unpublish Post" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeading>Unpublish Post</DialogHeading>
            <DialogDescription>
              Are you sure that you want unpublish this post?
            </DialogDescription>
            <div className={styles.dialogActions}>
              <button>Yes</button>
              <DialogClose>No</DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Dialog>
          <DialogTrigger title="Publish Post">
            <img src={PublishIcon} alt="Publish Post" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeading>Publish Post</DialogHeading>
            <DialogDescription>
              Are you sure that you want publish this post?
            </DialogDescription>
            <div className={styles.dialogActions}>
              <button>Yes</button>
              <DialogClose>No</DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default PublishToggle;
