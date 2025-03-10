/* eslint-disable react-refresh/only-export-components */

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
  PropsWithChildren,
} from "react";

type PostContextType = {
  postId: number;
  postStatus: "published" | "unpublished";
  loading: boolean;
  error: string;
  updatePosts: () => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;
};

const PostContext = createContext<PostContextType>({
  postId: 0,
  postStatus: "unpublished",
  loading: false,
  error: "",
  updatePosts: () => {},
  setLoading: () => {},
  setError: () => {},
});

type PostProviderProps = PropsWithChildren & {
  postId: number;
  postStatus: "published" | "unpublished";
  updatePosts: () => void;
};

export function PostContextProvider({
  children,
  postId,
  postStatus,
  updatePosts,
}: PostProviderProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  return (
    <PostContext.Provider
      value={{
        postId,
        postStatus,
        loading,
        error,
        updatePosts,
        setLoading,
        setError,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export function usePostContext() {
  return useContext(PostContext);
}
