import { Dispatch, SetStateAction, useState } from "react";

import { Dialog } from "../../../../../../context/DialogProvider";

import DialogTrigger from "../../../../../Dialog/DialogTrigger";
import DialogContent from "../../../../../Dialog/DialogContent";
import DialogHeading from "../../../../../Dialog/DialogHeading";
import DialogDescription from "../../../../../Dialog/DialogDescription";
import DialogClose from "../../../../../Dialog/DialogClose";

import DeleteIcon from "../../Post/trash-2.svg";

import { useAuth } from "../../../../../../context/auth/AuthProvider";

import styles from "./popups.module.css";

type DeleteCommentProps = {
  id: number;
  updatePosts: () => void;
  setError: Dispatch<SetStateAction<string>>;
};

function DeleteComment({ id, updatePosts, setError }: DeleteCommentProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useAuth();

  const onConfirmDelete = async () => {
    if (!loading) {
      try {
        setLoading(true);

        const endpoint = import.meta.env.VITE_MY_BLOG_API;

        const res = await fetch(`${endpoint}/comments/${id}/delete`, {
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

        setError("Error. Please try deleting the comment again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger title="Delete Comment">
        <img src={DeleteIcon} alt="Delete Comment" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeading>Delete Comment</DialogHeading>
        <DialogDescription>
          Are you sure that you want to delete this comment?
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

export default DeleteComment;
