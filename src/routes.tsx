import App from "./components/App/App";
import Login from "./components/Auth/Login/Login";

import ProtectedRoute from "./utils/ProtectedRoute";

const routes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <ProtectedRoute>
        <Login />
      </ProtectedRoute>
    ),
  },
];

export default routes;
