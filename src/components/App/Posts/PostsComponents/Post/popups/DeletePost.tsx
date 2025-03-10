import { Dispatch, SetStateAction } from "react";

import { Dialog } from "../../../../../../context/DialogProvider";

import DialogTrigger from "../../../../../Dialog/DialogTrigger";
import DialogContent from "../../../../../Dialog/DialogContent";
import DialogHeading from "../../../../../Dialog/DialogHeading";
import DialogDescription from "../../../../../Dialog/DialogDescription";
import DialogClose from "../../../../../Dialog/DialogClose";

import DeleteIcon from "../trash-2.svg";

import styles from "./popups.module.css";

type PostActions = "edit" | "publish" | "unpublish" | "delete" | "";

type DeletePostProps = {
  postId: number;
  setCurrentAction: Dispatch<SetStateAction<PostActions>>;
};

function DeletePost({ postId, setCurrentAction }: DeletePostProps) {
  return (
    <Dialog>
      <DialogTrigger
        title="Delete Post"
        onClick={() => setCurrentAction("delete")}
      >
        <img src={DeleteIcon} alt="Delete Post" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeading>Delete Post</DialogHeading>
        <DialogDescription>
          Are you sure that you want to delete this post?
        </DialogDescription>
        <div className={styles.dialogActions}>
          <button>Yes</button>
          <DialogClose>No</DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DeletePost;
