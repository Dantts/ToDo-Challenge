import React from "react";
import { TaskList } from "./Pages/TaskList";

// import {
//   createBrowserRouter,
//   RouterProvider,
//   BrowserRouter,
//   Route,
//   Routes,
// } from "react-router-dom";
import "./index.css";
import PrivateRoute from "./privateRoute";
import { Login } from "./Pages/Login";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/todo",
    element: (
      <PrivateRoute>
        <TaskList />
      </PrivateRoute>
    ),
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
