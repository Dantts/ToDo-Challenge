import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { ICategoryProps } from "../models/interfaces/category.interface";
import { api } from "../services/api";
import { useAuth } from "./useAuth.context";

interface categoryContextData {
  categories: ICategoryProps[];
  createCategory: (category: any) => Promise<any>;
  updateCategory: (id: string, dataForm: any) => Promise<any>;
  removeCategory: (id: string) => Promise<void>;
  createTodoByCategory: (dataForm: any) => Promise<any>;
  updateTodoByCategory: (id: string, dataForm: any) => Promise<any>;
  setTodoAsCompleteByCategory: (id: string, categoryId: string) => Promise<any>;
  removeTodoByCategory: (id: string, categoryId: string) => Promise<void>;
}

interface categoryProviderProps {
  children: ReactNode;
}

const CategoryTodoContext = createContext<categoryContextData>(
  {} as categoryContextData
);

export const CategoryTodoProvider = ({ children }: categoryProviderProps) => {
  const [categories, setCategories] = useState<ICategoryProps[]>([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token)
      api.get("/category").then(({ data }) => {
        setCategories(data.data);
      });
  }, []);

  const createCategory = async ({ title }: { title: string }) => {
    const { data } = await api.post("/category", { title });
    setCategories((oldState) => [...oldState, data.data]);
  };

  const updateCategory = async (id: string, category: any) => {
    const { data } = await api.patch(`/category/${id}`, category);

    setCategories((oldState) => [
      ...oldState.filter((it) => it.id != id),
      data.data,
    ]);
  };

  const removeCategory = async (id: string) => {
    await api.delete(`/category/${id}`);
    setCategories((oldState) => oldState.filter((it) => it.id != id));
  };

  // --===^^===--
  // ToDo Methods area.;

  const createTodoByCategory = async (dataForm: {
    title: string;
    category: string;
  }) => {
    const { data } = await api.post("/todo", dataForm);

    let categoryOfTodo: any = findCategoryById(dataForm.category);

    categoryOfTodo.todo = [...(categoryOfTodo.todo || []), data.data];

    setCategories((oldState) => [
      ...oldState.filter((it) => it.id != dataForm.category),
      categoryOfTodo,
    ]);
  };

  const updateTodoByCategory = async (
    id: string,
    dataForm: {
      title: string;
      category: string;
    }
  ) => {
    const { data } = await api.put(`/todo/${id}`, { title: dataForm.title });

    let categoryOfTodo: any = findCategoryById(dataForm.category);

    categoryOfTodo.todo = [
      ...categoryOfTodo.todo.filter((it: any) => it.id != id),
      data.data,
    ];

    setCategories((oldState) => [
      ...oldState.filter((it) => it.id != dataForm.category),
      categoryOfTodo,
    ]);
  };

  const setTodoAsCompleteByCategory = async (
    id: string,
    categoryId: string
  ) => {
    const { data } = await api.patch(`/todo/${id}`);

    let categoryOfTodo: any = findCategoryById(categoryId);

    categoryOfTodo.todo = [
      ...categoryOfTodo.todo.filter((it: any) => it.id != id),
      data.data,
    ];

    setCategories((oldState) => [
      ...oldState.filter((it) => it.id != categoryId),
      categoryOfTodo,
    ]);
  };

  const removeTodoByCategory = async (id: string, categoryId: string) => {
    await api.delete(`/todo/${id}`);

    let categoryOfTodo: any = findCategoryById(categoryId);

    categoryOfTodo.todo = categoryOfTodo.todo.filter((it: any) => it.id != id);

    setCategories((oldState) => [
      ...oldState.filter((it) => it.id != categoryId),
      categoryOfTodo,
    ]);
  };

  const findCategoryById = (id: string) => {
    return { ...categories.filter((it: any) => it.id == id)[0] };
  };

  return (
    <CategoryTodoContext.Provider
      value={{
        categories,
        createCategory,
        updateCategory,
        removeCategory,
        createTodoByCategory,
        updateTodoByCategory,
        setTodoAsCompleteByCategory,
        removeTodoByCategory,
      }}
    >
      {children}
    </CategoryTodoContext.Provider>
  );
};

export const useCategoryTodo = () => {
  return useContext(CategoryTodoContext);
};
