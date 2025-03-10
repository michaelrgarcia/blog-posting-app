import { Dialog } from "../../../../../../context/DialogProvider";

import DialogTrigger from "../../../../../Dialog/DialogTrigger";
import DialogContent from "../../../../../Dialog/DialogContent";
import DialogHeading from "../../../../../Dialog/DialogHeading";
import DialogDescription from "../../../../../Dialog/DialogDescription";
import DialogClose from "../../../../../Dialog/DialogClose";

import DeleteIcon from "../trash-2.svg";

import styles from "./popups.module.css";
import { usePostContext } from "../../../../../../context/PostContextProvider";
import { useAuth } from "../../../../../../context/auth/AuthProvider";

function DeletePost() {
  const { postId, loading, setLoading, updatePosts, setError } =
    usePostContext();
  const { user } = useAuth();

  const onConfirmDelete = async () => {
    if (!loading) {
      try {
        setLoading(true);

        const endpoint = import.meta.env.VITE_MY_BLOG_API;

        const res = await fetch(`${endpoint}/delete/${postId}`, {
          method: "delete",
          headers: {
            Authorization: `Bearer ${user}`,
          },
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

        setError("Error. Please try deleting the post again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger title="Delete Post">
        <img src={DeleteIcon} alt="Delete Post" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeading>Delete Post</DialogHeading>
        <DialogDescription>
          Are you sure that you want to delete this post?
        </DialogDescription>
        <div className={styles.dialogActions}>
          <button type="button" onClick={onConfirmDelete}>
            Yes
          </button>
          <DialogClose>No</DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DeletePost;
