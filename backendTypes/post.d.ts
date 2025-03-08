import { CommentType } from "./comment";

export default interface PostType {
  id: number;
  title: string;
  author: {
    username: string;
  };
  content: string;
  uploaded: string;
  lastModified: string;
  comments: CommentType[];
}
