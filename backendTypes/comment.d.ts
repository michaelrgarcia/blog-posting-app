export default interface CommentType {
  id?: string;
  author: {
    username: string;
  };
  content: string;
  uploaded: string;
  lastModified: string;
}
