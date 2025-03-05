export default interface Post {
  id: number;
  title: string;
  author: {
    username: string;
  };
  content: string;
  uploaded: Date;
  lastModified: Date;
  comments: {
    author: {
      username: string;
    };
    content: string;
    uploaded: Date;
    lastModified: Date;
  };
}
