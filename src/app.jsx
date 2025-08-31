import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Posts from "./pages/posts/Posts";
import Profile from "./pages/profile/Profile";
import Admin from "./pages/admin/Admin";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import useAuth from "../hooks/useAuth";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/posts/:id",
    element: <Posts />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  { path: "/admin", element: <Admin /> },
]);

export default function App() {
  //call custom hook that has functions login logout and states isLoggedIn and user and pass these values inside AuthCOntext.provider value argument
  let value = useAuth();
  return (
    <AuthContext.Provider value={value}>
      <RouterProvider router={router}></RouterProvider>
    </AuthContext.Provider>
  );
}
