import React from "react";
import ReactDOM from "react-dom/client";

import "./App.scss";

import { CategoryTodoProvider } from "./contexts/useCategoryTodo.context";
import { AuthProvider } from "./contexts/useAuth.context";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <CategoryTodoProvider>
        <App />
      </CategoryTodoProvider>
    </AuthProvider>
  </React.StrictMode>
);
