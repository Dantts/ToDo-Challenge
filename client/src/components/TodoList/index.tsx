import React, { useEffect, useState } from "react";
import "./styles.scss";
import { ITodoProps } from "../../models/interfaces/category.interface";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { RxPencil2 } from "react-icons/rx";
import { FiTrash } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { todoSchema, todoSchemaProps } from "../../models/schema/todo";
import { useCategoryTodo } from "../../contexts/useCategoryTodo.context";
import { ImCancelCircle } from "react-icons/im";

interface Props {
  todo: ITodoProps;
}

export const TodoList = ({ todo }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<todoSchemaProps>({
    resolver: yupResolver(todoSchema),
  });
  const {
    setTodoAsCompleteByCategory,
    updateTodoByCategory,
    removeTodoByCategory,
  } = useCategoryTodo();
  const [todoId, setTodoId] = useState("");

  const handleUpdateTodo = async (id: string, dataForm: any) => {
    await updateTodoByCategory(id, dataForm);
    setTodoId("");
  };

  const handleToggleTaskCompletion = async (id: string, categoryId: string) => {
    await setTodoAsCompleteByCategory(id, categoryId);
    setTodoId("");
  };

  const handleRemoveTask = async (id: string, categoryId: string) => {
    await removeTodoByCategory(id, categoryId);
  };

  useEffect(() => {
    setValue("title", todo.title);
  }, [todo]);

  return (
    <li>
      <div className={todo.isComplete ? "completed" : ""} data-testid="task">
        <label className="checkbox-container">
          <input
            type="checkbox"
            readOnly
            checked={todo.isComplete}
            onClick={() => handleToggleTaskCompletion(todo.id, todo.categoryId)}
          />
          <span className="checkmark"></span>
        </label>
        <form
          className="form-container-todo"
          onSubmit={handleSubmit((dataForm: todoSchemaProps) =>
            handleUpdateTodo(todo.id, {
              title: dataForm.title,
              category: todo.categoryId,
            })
          )}
        >
          <input readOnly={todo.id != todoId} {...register("title")} />
          {todo.id == todoId && (
            <>
              <button type="submit">
                <AiOutlineCheckCircle size={20} color="green" />
              </button>
              <button
                style={{ marginLeft: "10px" }}
                type="button"
                onClick={() => {
                  setValue("title", todo.title);
                  setTodoId("");
                }}
              >
                <ImCancelCircle size={18} />
              </button>
            </>
          )}
          {errors.title && (
            <p style={{ position: "absolute", marginTop: "50px" }}>
              {errors.title.message}
            </p>
          )}
        </form>
      </div>

      {todo.id != todoId && (
        <div>
          <button type="button" onClick={() => setTodoId(todo.id)}>
            <RxPencil2 size={16} />
          </button>
          <button
            type="button"
            data-testid="remove-task-button"
            onClick={() => handleRemoveTask(todo.id, todo.categoryId)}
          >
            <FiTrash size={16} />
          </button>
        </div>
      )}
    </li>
  );
};
