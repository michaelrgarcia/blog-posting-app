import { Dispatch, SetStateAction } from "react";

import { Dialog } from "../../../../../../context/DialogProvider";

import DialogTrigger from "../../../../../Dialog/DialogTrigger";
import DialogContent from "../../../../../Dialog/DialogContent";
import DialogHeading from "../../../../../Dialog/DialogHeading";
import DialogDescription from "../../../../../Dialog/DialogDescription";
import DialogClose from "../../../../../Dialog/DialogClose";

import PublishIcon from "../mail-check.svg";
import UnpublishIcon from "../mail-x.svg";

import styles from "./popups.module.css";

type PostActions = "edit" | "publish" | "unpublish" | "delete" | "";

type PublishToggleProps = {
  postId: number;
  postStatus: "published" | "unpublished";
  setCurrentAction: Dispatch<SetStateAction<PostActions>>;
};

function PublishToggle({
  postId,
  postStatus,
  setCurrentAction,
}: PublishToggleProps) {
  return (
    <>
      {postStatus === "published" ? (
        <Dialog>
          <DialogTrigger
            onClick={() => setCurrentAction("unpublish")}
            title="Unpublish Post"
          >
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
          <DialogTrigger
            onClick={() => setCurrentAction("publish")}
            title="Publish Post"
          >
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
