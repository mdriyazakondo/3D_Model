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
import MyModels from "../pages/MyModels/MyModels";
import MyDownloads from "../pages/MyDownloads/MyDownloads";
import Loading from "../pages/Loading/Loading";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    hydrateFallbackElement: <Loading />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () =>
          fetch("https://3d-model-server-eight.vercel.app/latest-models"),
      },
      {
        path: "/all-models",
        element: <AllModels />,
        loader: () => fetch("https://3d-model-server-eight.vercel.app/models"),
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
          fetch(`https://3d-model-server-eight.vercel.app/models/${params.id}`),
      },
      {
        path: "/my-models",
        element: (
          <PrivateRoute>
            <MyModels />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-downloads",
        element: (
          <PrivateRoute>
            <MyDownloads />
          </PrivateRoute>
        ),
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
