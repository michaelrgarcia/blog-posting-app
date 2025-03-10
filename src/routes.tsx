import { RouteObject } from "react-router-dom";

import App from "./components/App/App";
import Login from "./pages/Auth/Login/Login";

import ProtectedRoute from "./utils/ProtectedRoute";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Posts from "./components/App/Posts/Posts";
import { AuthProvider } from "./context/auth/AuthProvider";
import NewPost from "./components/App/NewPost/NewPost";

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <AuthProvider>
        <ProtectedRoute>
          <App />
        </ProtectedRoute>
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: "published", element: <Posts postStatus="published" /> },
      { path: "unpublished", element: <Posts postStatus="unpublished" /> },
      { path: "new-post", element: <NewPost /> },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthProvider>
        <Login />
      </AuthProvider>
    ),
  },
];

export default routes;
