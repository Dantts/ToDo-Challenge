import React, { useEffect, useState } from "react";
import "./styles.scss";

import { AiOutlinePlusCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";
import { ICategoryProps } from "../../models/interfaces/category.interface";
import { useCategoryTodo } from "../../contexts/useCategoryTodo.context";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ImCancelCircle } from "react-icons/im";
import {
  categorySchema,
  categorySchemaProps,
} from "../../models/schema/category";
import { TodoList } from "../TodoList";

interface Props {
  handleOpenNewToDoModal: (id: string) => void;
  data: ICategoryProps;
}

export const CategoryList = ({ data, handleOpenNewToDoModal }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<categorySchemaProps>({
    resolver: yupResolver(categorySchema),
  });
  const { updateCategory, removeCategory } = useCategoryTodo();
  const [categoryId, setCategoryId] = useState("");

  const handleUpdateCategoryName = async (
    id: string,
    dataForm: categorySchemaProps
  ) => {
    setCategoryId("");
    const { data } = await updateCategory(id, dataForm);
    setValue("title", data.data.title);
  };

  const handleRemoveCategory = async (id: string) => {
    await removeCategory(id);
  };

  const sortTodoByNameAndIsComplete = (list: any[]) => {
    return list
      .sort((a, b) => a.title.localeCompare(b.title))
      .sort((a, b) => a.isComplete - b.isComplete);
  };

  useEffect(() => {
    setValue("title", data.title);
  }, [data]);

  return (
    <div className="category" key={data.id}>
      <div className="category-title">
        <section>
          {errors.title && (
            <p style={{ position: "absolute", marginTop: "-22px" }}>
              {errors.title.message}
            </p>
          )}
          <form
            onSubmit={handleSubmit((dataForm: categorySchemaProps) =>
              handleUpdateCategoryName(data.id, dataForm)
            )}
            style={{ display: "flex", alignItems: "center" }}
          >
            <input
              className="title-input"
              readOnly={data.id != categoryId}
              onClick={() => setCategoryId(data.id)}
              {...register("title")}
            />
            {data.id == categoryId && (
              <section className="category-button-container">
                <button type="submit">
                  <AiOutlineCheckCircle size={25} />
                </button>
                <button
                  type="button"
                  data-testid="remove-task-button"
                  onClick={() => handleRemoveCategory(data.id)}
                >
                  <FiTrash size={22} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setValue("title", data.title);
                    setCategoryId("");
                  }}
                >
                  <ImCancelCircle size={22} />
                </button>
              </section>
            )}
          </form>
        </section>

        <button onClick={() => handleOpenNewToDoModal(data.id)}>
          <AiOutlinePlusCircle size={26} color="#3d3d4d" />
        </button>
      </div>

      <ul>
        {data.todo &&
          sortTodoByNameAndIsComplete(data.todo).map((todo) => (
            <TodoList key={todo.id} todo={todo} />
          ))}
      </ul>
    </div>
  );
};
