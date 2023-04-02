import React, { useState } from "react";
import { FiCheckSquare } from "react-icons/fi";
import "./styles.scss";
import { NewToDoModal } from "../../components/NewToDoModal";
import { yupResolver } from "@hookform/resolvers/yup";

import { CategoryList } from "../../components/CategoryList";
import { useCategoryTodo } from "../../contexts/useCategoryTodo.context";
import { ICategoryProps } from "../../models/interfaces/category.interface";
import { useForm } from "react-hook-form";
import {
  categorySchema,
  categorySchemaProps,
} from "../../models/schema/category";
import { Header } from "../../components/Header";

export const TaskList = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<categorySchemaProps>({
    resolver: yupResolver(categorySchema),
  });
  const { categories, createCategory } = useCategoryTodo();
  const [categoryId, setCategoryId] = useState("");
  const [isNewToDoOpen, setIsNewToDoOpen] = useState(false);

  const handleCreateNewCategory = async (data: categorySchemaProps) => {
    await createCategory(data);
    reset();
  };

  const handleOpenNewToDoModal = (id: string) => {
    setCategoryId(id);
    setIsNewToDoOpen(true);
  };

  const handleCloseNewToDoModal = () => {
    setCategoryId("");
    setIsNewToDoOpen(false);
  };

  const sortCategoryByName = (list: any[]) => {
    return list.sort((a, b) => a.title.localeCompare(b.title));
  };

  return (
    <>
      <Header />
      <section className="task-list container">
        <header>
          <h2>Minhas tasks</h2>
          <div>
            <form
              onSubmit={handleSubmit(handleCreateNewCategory)}
              className="input-group"
            >
              <input
                type="text"
                placeholder="Adicionar nova categoria"
                {...register("title")}
              />
              <button type="submit" data-testid="add-task-button">
                <FiCheckSquare size={16} color="#fff" />
              </button>
            </form>
            {errors.title && (
              <p style={{ position: "absolute", marginTop: "5px" }}>
                {errors.title.message}
              </p>
            )}
          </div>
        </header>

        <main>
          {categories &&
            sortCategoryByName(categories).map((category: ICategoryProps) => (
              <CategoryList
                data={category}
                key={category.id}
                handleOpenNewToDoModal={handleOpenNewToDoModal}
              />
            ))}
        </main>
        <NewToDoModal
          isOpen={isNewToDoOpen}
          categoryId={categoryId}
          onRequestClose={handleCloseNewToDoModal}
        />
      </section>
    </>
  );
};
