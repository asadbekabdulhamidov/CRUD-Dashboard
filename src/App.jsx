// react-router-dom
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

// import layouts
import MainLayout from "./layouts/MainLayout";

// pages
import {
  Home,
  LoginPage,
  Products,
  Users,
  Carts,
  FormUsers,
  FormProduct,
} from "./pages";
//components
import { ProtectedRoute } from "./components";

//redux
import { useSelector } from "react-redux";

function App() {
  const { token } = useSelector((state) => state.auth);

  const routes = createBrowserRouter([
    {
      path: "/login",
      element: token ? <Navigate to="/" /> : <LoginPage />,
    },
    {
      path: "*",
      element: token ? <Navigate to="/" /> : <LoginPage />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute token={token}>
          <MainLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          index: true,
          element: <Users />,
        },
        {
          path: "/carts",
          element: <Carts />,
        },
        {
          path: "/formusers/:id?",
          element: <FormUsers />,
        },
        {
          path: "/formproducts/:id?",
          element: <FormProduct />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
