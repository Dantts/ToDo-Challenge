import React from "react";
import { Header } from "./components/Header";
import { TaskList } from "./Pages/TaskList";
import { CategoryTodoProvider } from "./contexts/useCategoryTodo.context";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import { Register } from "./Pages/Register";
import { Login } from "./Pages/Login";

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
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
