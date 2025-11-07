import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import AllModels from "../pages/AllModels/AllModels";
import AddModels from "../pages/AddModels/AddModels";
import Login from "../auth/Login";
import ModelDetails from "../components/ModelDetails";
import UpdateModels from "../pages/UpdateModels/UpdateModels";
import PrivateRoute from "./PraviteRoute";
import Register from "../auth/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () => fetch("http://localhost:3000/latest-models"),
      },
      {
        path: "/all-models",
        element: <AllModels />,
        loader: () => fetch("http://localhost:3000/models"),
      },
      {
        path: "add-model",
        element: (
          <PrivateRoute>
            <AddModels />
          </PrivateRoute>
        ),
      },
      {
        path: "model-details/:id",
        element: (
          <PrivateRoute>
            <ModelDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-models/:id",
        element: (
          <PrivateRoute>
            <UpdateModels />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/models/${params.id}`),
      },
      {
        path: "auth/login",
        element: <Login />,
      },
      {
        path: "auth/register",
        element: <Register />,
      },
    ],
  },
]);
