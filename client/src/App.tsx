import React from "react";
import { Header } from "./components/Header";
import { TaskList } from "./Pages/TaskList";
import { CategoryTodoProvider } from "./contexts/useCategoryTodo.context";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import { Register } from "./Pages/Register";
import { Login } from "./Pages/Login";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/registrar",
    element: <Register />,
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

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
